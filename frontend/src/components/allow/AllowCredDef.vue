<template>
  <MainCardContent
    :title="$t('allow.credDef.allow')"
    :refresh-callback="loadTable"
  >
    <DataTable
      v-model:expandedRows="expandedRows"
      v-model:filters="filter"
      :loading="loading"
      :value="formattedCredDefs"
      :paginator="true"
      :rows="TABLE_OPT.ROWS_DEFAULT"
      :rows-per-page-options="TABLE_OPT.ROWS_OPTIONS"
      selection-mode="single"
      data-key="allowed_cred_def_id"
      sort-field="created_at"
      :sort-order="-1"
      filter-display="menu"
    >
      <template #header>
        <div class="flex justify-content-between">
          <div class="flex justify-content-start">
            <AddDid @success="loadTable" />
          </div>
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
          <DeleteCredDef :record-id="data.allowed_cred_def_id" />
        </template>
      </Column>
      <Column :sortable="true" field="tag" header="Tag" />
      <Column :sortable="true" field="schema_name" header="Schema Name" />
      <Column :sortable="true" field="version" header="Version" />
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
    </DataTable>
  </MainCardContent>
</template>

<script setup lang="ts">
// Imports
import { computed, onMounted, ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import { FilterMatchMode } from 'primevue/api';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';
// Components
import AddDid from './add/AddDid.vue';
import DeleteCredDef from './delete/DeleteCredDef.vue';
import MainCardContent from '@/components/layout/mainCard/MainCardContent.vue';
import { TABLE_OPT, API_PATH } from '@/helpers/constants';
import { formatCredDefs } from '@/helpers/tableFormatters';
import { useAllowanceStore } from '@/store';
const toast = useToast();

const allowanceStore = useAllowanceStore();

// Populating the Table
const { loading, credDefs } = storeToRefs(useAllowanceStore());
const loadTable = () => {
  allowanceStore.listCredDefs().catch((err: string) => {
    console.error(err);
    toast.error(`Failure: ${err}`);
  });
};

// Formatting the cred def table row
const formattedCredDefs = computed(() => formatCredDefs(credDefs));

onMounted(() => {
  loadTable();
});

// Filter for search
const filter = ref({
  global: {
    value: null,
    matchMode: FilterMatchMode.CONTAINS,
  },
  created: {
    value: null,
    matchMode: FilterMatchMode.CONTAINS,
  },
});

const expandedRows = ref([]);
</script>
