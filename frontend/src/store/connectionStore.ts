import { API_PATH } from '@/helpers/constants';

import { defineStore } from 'pinia';
import {  ref, Ref } from 'vue';
import { useEndorserServiceApi } from './endorserServiceApi';
import { fetchListFromEndorserAPI } from './utils';

export const useConnectionStore = defineStore('connectionStore', () => {
  // state
  const connections: Ref<any[]> = ref([]);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);

  // getters

  // actions

  // grab the tenant api
  const endorserServiceApi = useEndorserServiceApi();

  async function listConnections() {
    return fetchListFromEndorserAPI(
      endorserServiceApi,
      API_PATH.CONNECTIONS,
      'connections',
      connections,
      error,
      loading
    );
  }

  return {
    connections,
    loading,
    error,
    listConnections,
  };
});

export default {
  useConnectionStore,
};
