import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';
import { fetchItem, fetchListFromEndorserAPI } from './utils';
import { API_PATH } from '@/helpers/constants';
import { useAcapyApi } from './acapyApi';

export const useAllowanceStore = defineStore('allowance', () => {
  const acapyApi = useAcapyApi();

  // state
  const credDefs: Ref<any[]> = ref([]);
  const dids: Ref<any[]> = ref([]);
  const error: Ref<string | null> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const schemas: Ref<any[]> = ref([]);

  // getters

  // actions
  async function listCredDefs() {
    return fetchListFromEndorserAPI<any>(
      acapyApi,
      API_PATH.ALLOW_CREDENTIAL_DEFINITION,
      'connections',
      credDefs,
      error,
      loading
    );
  }
  async function listDids() {
    return fetchListFromEndorserAPI<any>(
      acapyApi,
      API_PATH.ALLOW_PUBLISH_DID,
      'connections',
      credDefs,
      error,
      loading
    );
  }
  async function listSchemas() {
    return fetchListFromEndorserAPI<any>(
      acapyApi,
      API_PATH.ALLOW_SCHEMA,
      'connections',
      credDefs,
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
    listCredDefs,
    listDids,
    listSchemas,
  };
});

export default {
  useAllowanceStore,
};
