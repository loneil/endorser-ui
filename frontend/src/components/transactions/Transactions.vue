<template>
  <MainCardContent
    :title="$t('transactions.transactions')"
    :refresh-callback="loadTable"
  >
    <DataTable
      v-model:expandedRows="expandedRows"
      v-model:filters="filter"
      :loading="loading"
      :value="formattedTransactions"
      :paginator="true"
      :rows="TABLE_OPT.ROWS_DEFAULT"
      :rows-per-page-options="TABLE_OPT.ROWS_OPTIONS"
      selection-mode="single"
      data-key="transaction_id"
      sort-field="created_at"
      :sort-order="-1"
      filter-display="menu"
    >
      <template #header>
        <div class="flex justify-content-between">
          <div class="flex justify-content-start"></div>
          <div class="flex justify-content-end">
            <div class="container">
              <span class="p-input-icon-left container-item">
                <i class="pi pi-search ml-0" />
                <InputText
                  v-model="filter.global.value"
                  :placeholder="$t('tenants.search')"
                />
              </span>
            </div>
          </div>
        </div>
      </template>
      <template #empty>{{ $t('common.noRecordsFound') }}</template>
      <template #loading>{{ $t('common.loading') }}</template>
      <Column :expander="true" header-style="width: 3rem" />
      <Column header="Actions" class="action-col">
        <template #body="{ data }">
          <Button
            v-if="data.state === 'request_received'"
            title="Endorse Transaction"
            icon="pi pi-check-circle"
            class="p-button-rounded p-button-icon-only p-button-text text-green-500"
            :class="{ accepted: data.state === 'credential_acked' }"
            @click="accept($event, data.connection_id)"
          />
          <Button
            v-if="data.state === 'request_received'"
            title="Reject Transaction"
            icon="pi pi-times"
            class="p-button-rounded p-button-icon-only p-button-text text-red-500"
            @click="reject($event, data.connection_id)"
          />
          <EditTransaction
            :transaction-id="data.transaction_id"/>
        </template>
      </Column>
      <Column :sortable="true" field="author_did" header="Author DID" />
      <Column :sortable="true" field="state" header="State">
        <template #body="{ data }">
          <StatusChip :status="data.state" />
        </template>
      </Column>
      <Column :sortable="true" field="transaction_type" header="Type" />
      <Column
        :sortable="true"
        field="created"
        :header="$t('common.createdAt')"
        filter-field="created"
        :show-filter-match-modes="false"
      >
        <template #body="{ data }">
          {{ data.created }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            :placeholder="$t('common.searchByCreated')"
            @input="filterCallback()"
          />
        </template>
      </Column>
      <Column
        :sortable="true"
        field="deleted"
        :header="$t('common.deletedAt')"
        filter-field="deleted"
        :show-filter-match-modes="false"
        :hidden="!showDeleted"
      >
        <template #body="{ data }">
          {{ data.deleted_at }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            :placeholder="$t('common.searchByDeleted')"
            @input="filterCallback()"
          />
        </template>
      </Column>
      <template #expansion="{ data }">
        <RowExpandData :id="data.transaction_id" :url="API_PATH.ENDORSE_TRANSACTION" />
      </template>
    </DataTable>
  </MainCardContent>
</template>

<script setup lang="ts">
import { FilterMatchMode } from 'primevue/api';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import { computed, onMounted, ref } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'vue-toastification';

// State
import { useTransactionStore } from '@/store';
import { storeToRefs } from 'pinia';
// Other components
import { TABLE_OPT, API_PATH } from '@/helpers/constants';
import { formatTransactions } from '@/helpers/tableFormatters';
import StatusChip from '@/components/common/StatusChip.vue';
import RowExpandData from '@/components/common/RowExpandData.vue';
import MainCardContent from '@/components/layout/mainCard/MainCardContent.vue';
import EditTransaction from './editTransaction/EditTransaction.vue';
const confirm = useConfirm();
const toast = useToast();

const transactionStore = useTransactionStore();
const showDeleted = ref(false);

// Populating the Table
const { loading, transactions } = storeToRefs(useTransactionStore());
const loadTable = () => {
  transactionStore.listTransactions().catch((err: string) => {
    console.error(err);
    toast.error(`Failure: ${err}`);
  });
};

// Formatting the Transactions table row
const formattedTransactions = computed(() => formatTransactions(transactions));

onMounted(() => {
  loadTable();
});

// Actions for a row
const accept = (event: any, connectionId: string) => {
  confirm.require({
    target: event.currentTarget,
    message: 'Are you sure you want to accept this transaction?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      doAccept(connectionId);
    },
  });
};
const doAccept = (connectionId: string) => {
  // transactionStore
  //   .acceptTransaction(connectionId)
  //   .then(() => {
  //     toast.success(`Transaction successfully accepted`);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     toast.error(`Failure: ${err}`);
  //   });
};

const reject = (event: any, connectionId: string) => {
  confirm.require({
    target: event.currentTarget,
    message: 'Are you sure you want to reject this transaction?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      doReject(connectionId);
    },
  });
};
const doReject = (connectionId: string) => {
  // transactionStore
  //   .rejectTransaction(connectionId)
  //   .then(() => {
  //     toast.success(`Transaction successfully rejected`);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     toast.error(`Failure: ${err}`);
  //   });
};



// Filter for search
const filter = ref({
  global: {
    value: null,
    matchMode: FilterMatchMode.CONTAINS,
  },
  tenant_name: {
    value: null,
    matchMode: FilterMatchMode.CONTAINS,
  },
  created: {
    value: null,
    matchMode: FilterMatchMode.CONTAINS,
  },
  deleted: {
    value: null,
    matchMode: FilterMatchMode.CONTAINS,
  },
  curr_ledger_id: {
    value: null,
    matchMode: FilterMatchMode.CONTAINS,
  },
});

// necessary for expanding rows, we don't do anything with this
const expandedRows = ref([]);
</script>

<style scoped>
.container {
  display: flex;
}
.container-item {
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.deleted-btn {
  height: 2.625rem;
  background-color: #ef4444;
  border: 1px solid #ef4444;
  color: white;
  border-radius: 10px;
  width: 50%;
  font-weight: 600;
}
</style>
