<template>
  <MainCardContent
    :title="$t('connect.connections.connections')"
    :refresh-callback="loadTable"
  >
    <DataTable
      v-model:expandedRows="expandedRows"
      v-model:filters="filter"
      :loading="loading"
      :value="formattedConnections"
      :paginator="true"
      :rows="TABLE_OPT.ROWS_DEFAULT"
      :rows-per-page-options="TABLE_OPT.ROWS_OPTIONS"
      selection-mode="single"
      data-key="connection_id"
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
            v-if="data.state === 'request'"
            title="Accept Connection Request"
            icon="pi pi-check-circle"
            class="p-button-rounded p-button-icon-only p-button-text text-green-500"
            :class="{ accepted: data.state === 'credential_acked' }"
            @click="accept($event, data.connection_id)"
          />
          <Button
            v-if="data.state === 'request'"
            title="Reject Connection Request"
            icon="pi pi-times"
            class="p-button-rounded p-button-icon-only p-button-text text-red-500"
            @click="reject($event, data.connection_id)"
          />
          <EditConnection
            v-if="data.state !== 'request'"
            :connection-id="data.connection_id"
          />
          <ConfigConnection
            v-if="data.state !== 'request'"
            :connection-id="data.connection_id"
          />
        </template>
      </Column>
      <Column :sortable="true" field="their_label" header="Their Label" />
      <Column :sortable="true" field="state" header="State">
        <template #body="{ data }">
          <StatusChip :status="data.state" />
        </template>
      </Column>
      <Column :sortable="true" field="author_status" header="Author Status" />
      <Column :sortable="true" field="endorse_status" header="Endorse Status" />
      <Column :sortable="true" field="created" header="Created At" />
      <template #expansion="{ data }">
        <RowExpandData :id="data.connection_id" :url="API_PATH.ENDORSER_CONNECTION" />
      </template>
    </DataTable>
  </MainCardContent>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'vue-toastification';

// State
import { useInnkeeperTenantsStore } from '@/store';
import { storeToRefs } from 'pinia';
// Other components
import { TABLE_OPT, API_PATH } from '@/helpers/constants';
import { formatConnections } from '@/helpers/tableFormatters';
import ConfigConnection from './editConnection/ConfigureConnection.vue';
import EditConnection from './editConnection/EditConnection.vue';
import StatusChip from '@/components/common/StatusChip.vue';
import RowExpandData from '@/components/common/RowExpandData.vue';
import MainCardContent from '@/components/layout/mainCard/MainCardContent.vue';
const confirm = useConfirm();
const toast = useToast();

const innkeeperTenantsStore = useInnkeeperTenantsStore();
const showDeleted = ref(false);

// Populating the Table
const { loading, connections } = storeToRefs(useInnkeeperTenantsStore());
const loadTable = () => {
  innkeeperTenantsStore.listConnections().catch((err: string) => {
    console.error(err);
    toast.error(`Failure: ${err}`);
  });
};

// Formatting the Connection table row
const formattedConnections = computed(() => formatConnections(connections));

onMounted(() => {
  loadTable();
});

// Actions for a connection row
const accept = (event: any, connection_id: string) => {
  confirm.require({
    target: event.currentTarget,
    message: 'Are you sure you want to accept this connection?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      doAccept(connection_id);
    },
  });
};
const doAccept = (connectionId: string) => {
  // innkeeperTenantsStore
  //   .acceptConnection(connectionId)
  //   .then(() => {
  //     toast.success(`Connection successfully accepted`);
  //   })
  //   .catch((err: string) => {
  //     console.error(err);
  //     toast.error(`Failure: ${err}`);
  //   });
};

const reject = (event: any, connection_id: string) => {
  confirm.require({
    target: event.currentTarget,
    message: 'Are you sure you want to reject this connection?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      doReject(connection_id);
    },
  });
};
const doReject = (connectionId: string) => {
  // innkeeperTenantsStore
  //   .rejectConnection(connectionId)
  //   .then(() => {
  //     toast.success(`Connection successfully rejected`);
  //   })
  //   .catch((err: string) => {
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
