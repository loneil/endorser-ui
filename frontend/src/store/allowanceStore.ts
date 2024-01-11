import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';
import { fetchListFromEndorserAPI } from './utils';
import { API_PATH } from '@/helpers/constants';
import { useEndorserServiceApi } from './endorserServiceApi';

export const useAllowanceStore = defineStore('allowance', () => {
  const endorserServiceApi = useEndorserServiceApi();

  // state
  const credDefs: Ref<any[]> = ref([]);
  const dids: Ref<any[]> = ref([]);
  const error: Ref<string | null> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const schemas: Ref<any[]> = ref([]);

  // getters

  // actions
  async function createDid(did: string) {
    console.log('> connectionStore.createDid');
    error.value = null;
    loading.value = true;

    try {
      await endorserServiceApi.postHttp(
        `${API_PATH.ALLOW_PUBLISH_DID}/${did}`,
        {}
      );
    } catch (err: any) {
      error.value = err;
    } finally {
      loading.value = false;
    }

    if (error.value != null) {
      throw error.value;
    }
  }

  async function deleteDid(did: string) {
    console.log('> connectionStore.deleteDid');
    error.value = null;
    loading.value = true;

    try {
      await endorserServiceApi.deleteHttp(
        `${API_PATH.ALLOW_PUBLISH_DID}/${did}`
      );
      listDids();
    } catch (err: any) {
      error.value = err;
    } finally {
      loading.value = false;
    }

    if (error.value != null) {
      throw error.value;
    }
  }

  async function listCredDefs() {
    return fetchListFromEndorserAPI<any>(
      endorserServiceApi,
      API_PATH.ALLOW_CREDENTIAL_DEFINITION,
      'connections',
      credDefs,
      error,
      loading
    );
  }
  async function listDids() {
    return fetchListFromEndorserAPI<any>(
      endorserServiceApi,
      API_PATH.ALLOW_PUBLISH_DID,
      'connections',
      dids,
      error,
      loading
    );
  }
  async function listSchemas() {
    return fetchListFromEndorserAPI<any>(
      endorserServiceApi,
      API_PATH.ALLOW_SCHEMA,
      'connections',
      schemas,
      error,
      loading
    );
  }

  return {
    credDefs,
    dids,
    error,
    loading,
    schemas,
    createDid,
    deleteDid,
    listCredDefs,
    listDids,
    listSchemas,
  };
});

export default {
  useAllowanceStore,
};
