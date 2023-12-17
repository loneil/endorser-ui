import axios from 'axios';
import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useConfigStore } from '../configStore';
import { UserManager, UserManagerSettings } from 'oidc-client-ts';
import { API_PATH } from '@/helpers/constants';
import { useTokenStore } from '../tokenStore';

export const useInnkeeperOidcStore = defineStore('innkeeperOidcStore', () => {
  // other stores
  const { config } = storeToRefs(useConfigStore());
  const { token } = storeToRefs(useTokenStore());

  // private (move to other file maybe?)
  const _settings: UserManagerSettings = {
    authority: config.value.frontend.oidc.authority,
    client_id: config.value.frontend.oidc.client,
    redirect_uri: `${window.location.origin}/innkeeper`,
    response_type: 'code',
    automaticSilentRenew: false, // don't need to renew for our needs at this point
    post_logout_redirect_uri: `${window.location.origin}/innkeeper`,
    loadUserInfo: true,
    extraQueryParams: { kc_idp_hint: 'idir' },
  };
  const _userManager: UserManager = new UserManager(_settings);

  _userManager
    .signinRedirectCallback()
    .then((usr) => {
      loading.value = true;
      console.log('signed in', usr);
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
        API_PATH.OIDC_ENDORSER_LOGIN,
        loginCfg
      );
      token.value = response.data.access_token;
      if (token.value) localStorage.setItem('token-innkeeper', token.value);

      // strip the oidc return params
      window.history.pushState({}, document.title, '/innkeeper');
    } catch (err: any) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  });

  // state
  const loading: any = ref(false);
  const error: any = ref(null);
  const user: any = ref(null);

  // getters

  // actions
  async function login() {
    loading.value = true;
    return _userManager.signinRedirect();
  }

  return {
    loading,
    error,
    login,
    user,
  };
});

export default {
  useInnkeeperOidcStore,
};
