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
import { useInnkeeperTenantsStore } from '@/store';
import MainCardContent from '../../layout/mainCard/MainCardContent.vue';

const toast = useToast();

const innkeeperTenantsStore = useInnkeeperTenantsStore();
const { loading, serverConfig } = storeToRefs(useInnkeeperTenantsStore());

onMounted(async () => {
  loadConfig();
});

const loadConfig = async () => {
  innkeeperTenantsStore.getServerConfig().catch((err: string) => {
    console.error(err);
    toast.error(`Failure: ${err}`);
  });
};
</script>
