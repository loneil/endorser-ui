<template>
  <div v-if="loading" class="flex justify-content-center">
    <ProgressSpinner />
  </div>
  <form v-else @submit.prevent="handleSubmit(!v$.$invalid)">
    <!-- Author Status -->
    <div class="field">
      <label
        for="selectedAuthorStatus"
        :class="{ 'p-error': v$.selectedAuthorStatus.$invalid && submitted }"
      >
        Author Status *
      </label>
      <Dropdown
        v-model="v$.selectedAuthorStatus.$model"
        id="selectedAuthorStatus"
        :options="authorStatuses"
        placeholder="Select Author Status"
        class="w-full"
      />
      <small
        v-if="v$.selectedAuthorStatus.$invalid && submitted"
        class="p-error"
      >
        {{ v$.selectedAuthorStatus.required.$message }}
      </small>
    </div>

    <!-- Endorse Status -->
    <div class="field">
      <label
        for="selectedEndorseStatus"
        :class="{ 'p-error': v$.selectedEndorseStatus.$invalid && submitted }"
      >
        Endorse Status *
      </label>
      <Dropdown
        v-model="v$.selectedEndorseStatus.$model"
        id="selectedEndorseStatus"
        :options="endorseStatuses"
        placeholder="Select Endorse Status"
        class="w-full"
      />
      <small
        v-if="v$.selectedEndorseStatus.$invalid && submitted"
        class="p-error"
      >
        {{ v$.selectedEndorseStatus.required.$message }}
      </small>
    </div>

    <Button type="submit" label="Submit" class="mt-3 w-full" />

    <div v-if="item" class="flex justify-content-end mb-0 mt-3">
      <small>
        {{ $t('connect.edit.lastUpdated', [formatDateLong(item.updated_at)]) }}
      </small>
    </div>
  </form>
</template>

<script setup lang="ts">
// Vue
import { onMounted, reactive, ref, PropType } from 'vue';
// State/etc
// import { useConnectionStore } from '@/store';
import useGetItem from '@/composables/useGetItem';
import { formatDateLong } from '@/helpers';
import { API_PATH } from '@/helpers/constants';
// PrimeVue / Validation
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { useToast } from 'vue-toastification';

// Props
const props = defineProps({
  connectionId: {
    type: String as PropType<string>,
    required: true,
  },
});

// const connectionStore = useConnectionStore();
const emit = defineEmits(['closed', 'success']);
const toast = useToast();

// Dropdown options
const authorStatuses = ref([ 'Active', 'Suspended' ]);
const endorseStatuses = ref([ 'AutoEndorse', 'ManualEndorse', 'AutoReject' ]);

// Validation
const formFields = reactive({
  selectedAuthorStatus: '',
  selectedEndorseStatus: '',
});
const rules = {
  selectedAuthorStatus: { required },
  selectedEndorseStatus: { required },
};
const v$ = useVuelidate(rules, formFields);

// Form submission
const submitted = ref(false);
const handleSubmit = async (isFormValid: boolean) => {
  submitted.value = true;
  if (!isFormValid) {
    return;
  }

  try {
    // await connectionStore.updateConnection(
    //   props.connectionId,
    //   formFields.alias
    // );
    emit('success');
    // close up on success
    emit('closed');
    toast.info('Connection Updated');
  } catch (error) {
    toast.error(`Failure: ${error}`);
  } finally {
    submitted.value = false;
  }
};

// Get the latest details about this connection when opening
const { loading, item, fetchItem } = useGetItem(API_PATH.CONNECTION);
onMounted(async () => {
  try {
    await fetchItem(props.connectionId);
    formFields.selectedAuthorStatus = item.value.author_status;
    formFields.selectedEndorseStatus = item.value.endorse_status;
  } catch (error: any) {
    toast.error(`Failure: ${error}`);
  }
});
</script>
