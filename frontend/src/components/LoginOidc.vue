<template>
  <Dropdown
    v-model="selectedLedger"
    :options="ledgers"
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
  <Message v-if="error" severity="error">
    You do not have access to this Endorser Service.
  </Message>
</template>

<script setup lang="ts">
// State
import { ref } from 'vue';
import { useConfigStore, useLoginStore } from '@/store';
import { storeToRefs } from 'pinia';
// PrimeVue/etc
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Message from 'primevue/message';
import { useToast } from 'vue-toastification';
const toast = useToast();

const loginStore = useLoginStore();
const { loading, error } = storeToRefs(useLoginStore());
const { config } = storeToRefs(useConfigStore());

// Selector
const selectedLedger = ref();
const ledgers = ref(config.value.server.endorsersIds);

// OIDC Login
const oidcLogin = async () => {
  try {
    await loginStore.login(selectedLedger.value);
  } catch (error: any) {
    toast.error(`Failure: ${error}`);
  }
};
</script>
