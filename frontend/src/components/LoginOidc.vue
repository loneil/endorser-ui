<template>
  <Dropdown
    v-model="selectedLedger"
    :options="ledgers"
    optionLabel="name"
    placeholder="Select Endorser Service"
    class="w-full"
  />

  <Button
    class="w-full mt-5"
    label="Login with IDIR"
    :loading="loading"
    @click="oidcLogin"
  />
  <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
  <div v-if="error">{{ $t('admin.error') }}: {{ error }}</div>
</template>

<script setup lang="ts">
// State
import { ref } from 'vue';
import { useLoginStore } from '@/store';
import { storeToRefs } from 'pinia';
// PrimeVue/etc
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { useToast } from 'vue-toastification';
const toast = useToast();

const loginStore = useLoginStore();
const { loading, error } = storeToRefs(useLoginStore());

// Selector

const selectedLedger = ref();
const ledgers = ref([
    { name: 'bcovrin-test', code: 'NY' },
    { name: 'candy-test', code: 'RM' },
    { name: 'sovrin-test', code: 'LDN' }
]);

// OIDC Login
const oidcLogin = async () => {
  try {
    await loginStore.login(selectedLedger.value.name);
  } catch (error: any) {
    toast.error(`Failure: ${error}`);
  }
};
</script>
