import axios from 'axios';
import { defineStore, storeToRefs } from 'pinia';
import { Ref, computed, ref } from 'vue';
import { useConfigStore } from './configStore';
import { UserManager, UserManagerSettings } from 'oidc-client-ts';
import { API_PATH } from '@/helpers/constants';
import { useTokenStore } from './tokenStore';
import router from '../router/index';

export const useLoginStore = defineStore('loginStore', () => {
  // other stores
  const { config } = storeToRefs(useConfigStore());
  const { token } = storeToRefs(useTokenStore());

  // private (move to other file maybe?)
  const _settings: UserManagerSettings = {
    authority: config.value.frontend.oidc.authority,
    client_id: config.value.frontend.oidc.client,
    redirect_uri: `${window.location.origin}/`,
    response_type: 'code',
    automaticSilentRenew: false, // don't need to renew for our needs at this point
    post_logout_redirect_uri: `${window.location.origin}/`,
    loadUserInfo: true,
    extraQueryParams: { kc_idp_hint: 'idir' },
  };
  const _userManager: UserManager = new UserManager(_settings);

  _userManager
    .signinRedirectCallback()
    .then((usr) => {
      loading.value = true;
      ledger.value = usr.state as string;
      console.log(`OIDC signed in, selected ${usr.state}`, usr);
    })
    .catch((err) => {
      console.error(err);
    });

  _userManager.events.addUserLoaded(async () => {
    try {
      // Get the logged in user from the OIDC library
      const usr = await _userManager.getUser();
      user.value = usr;

      // Use the user's access token JWT from the OIDC provider to call the innkeeper API
      // and get an innkeeper token
      const loginCfg = {
        headers: { Authorization: `Bearer ${usr?.access_token}` },
      };
      const response: any = await axios.get(
        API_PATH.OIDC_ENDORSER_LOGIN(ledger.value),
        loginCfg
      );
      token.value = response.data.access_token;
      if (token.value)
        localStorage.setItem('token-endorser-service', token.value);

      // strip the oidc return params
      window.history.pushState({}, document.title, '/');
      // push the router to the home page
      // @ts-ignore
      router.push('/home');
    } catch (err: any) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  });

  // state
  const cardExpanded = ref(false);
  const error: any = ref(null);
  const ledger: Ref<string> = ref('');
  const loading: any = ref(false);
  const sidebarOpen: Ref<boolean | null> = ref(null);
  const user: any = ref(null);

  // getters
  const isLoggedIn = computed(() => {
    return token.value != null;
  });

  const sidebarOpenClass = computed(() => {
    if (sidebarOpen.value === null) {
      // Use media queries
      return null;
    } else if (sidebarOpen.value) {
      // Default width
      return 'open';
    } else {
      return 'closed'; // Mobile width
    }
  });

  // actions
  async function login(ledgerId: string) {
    loading.value = true;
    return _userManager.signinRedirect({
      state: ledgerId,
    });
  }

  return {
    cardExpanded,
    error,
    isLoggedIn,
    ledger,
    loading,
    sidebarOpen,
    sidebarOpenClass,
    user,
    login,
  };
});

export default {
  useLoginStore,
};
