<template>
  <MainCardContent
    :title="$t('serverConfig.serverConfig')"
    :refresh-callback="loadConfig"
  >
    <ProgressSpinner v-if="loading" />
    <div v-else>
      <vue-json-pretty :data="serverConfig" />
    </div>
  </MainCardContent>
</template>

<script setup lang="ts">
// Imports
import ProgressSpinner from 'primevue/progressspinner';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import VueJsonPretty from 'vue-json-pretty';
import { useToast } from 'vue-toastification';
// Components
import { useConfigStore } from '@/store';
import MainCardContent from '@/components/layout/mainCard/MainCardContent.vue';

const toast = useToast();

const configStore = useConfigStore();
const { loading, serverConfig } = storeToRefs(useConfigStore());

onMounted(async () => {
  loadConfig();
});

const loadConfig = async () => {
  configStore.getServerConfig().catch((err: string) => {
    console.error(err);
    toast.error(`Failure: ${err}`);
  });
};
</script>
