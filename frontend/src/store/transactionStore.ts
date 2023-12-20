import { API_PATH } from '@/helpers/constants';

import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';
import { useEndorserServiceApi } from './endorserServiceApi';
import { fetchListFromEndorserAPI } from './utils';

export const useTransactionStore = defineStore('transactionStore', () => {
  // state
  const transactions: Ref<any[]> = ref([]);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);

  // getters

  // actions

  // grab the tenant api
  const endorserServiceApi = useEndorserServiceApi();

  async function listTransactions() {
    return fetchListFromEndorserAPI(
      endorserServiceApi,
      API_PATH.ENDORSE_TRANSACTIONS,
      'transactions',
      transactions,
      error,
      loading
    );
  }

  return {
    transactions,
    loading,
    error,
    listTransactions,
  };
});

export default {
  useTransactionStore,
};
