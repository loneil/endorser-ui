<template>
  <div class="traction-sidebar innkeeper-sidebar">
    <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
    <h1 class="sidebar-app-title">{{ ledger }}</h1>
    <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
    <h1 class="sidebar-app-title small">E</h1>
    <PanelMenu :model="items" class="mt-5">
      <template #item="{ item }">
        <PanelMenuItemLink :item="item" />
      </template>
    </PanelMenu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PanelMenu from 'primevue/panelmenu';
import { useI18n } from 'vue-i18n';
import PanelMenuItemLink from '@/components/common/PanelMenuItemLink.vue';
import { storeToRefs } from 'pinia';
import { useLoginStore } from '@/store';

const loginStore = useLoginStore();
const { ledger } = storeToRefs(useLoginStore());

const { t } = useI18n();

const ROOT = '/';
const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    route: '/home',
  },
  {
    label: t('connections.connections'),
    icon: 'pi pi-fw pi-users',
    route: ROOT + 'connections',
  },
  {
    label: t('transactions.transactions'),
    icon: 'pi pi-fw pi-dollar',
    route: ROOT + 'transactions',
  },
  {
    label: t('allow.allow'),
    icon: 'pi pi-fw pi-check-square',
    items: [
      {
        // Icons are manadatory for mobile layout
        label: t('allow.did.did'),
        icon: 'pi pi-fw pi-globe',
        route: ROOT + 'allow/did',
      },
      {
        label: t('allow.schema.schema'),
        icon: 'pi pi-fw pi-sitemap',
        route: ROOT + 'allow/schema',
      },
      {
        label: t('allow.credDef.credDef'),
        icon: 'pi pi-fw pi-id-card',
        route: ROOT + 'allow/credDef',
      },
      {
        label: t('allow.config.config'),
        icon: 'pi pi-fw pi-file-edit',
        route: ROOT + 'allow/config',
      },
    ],
  },
  {
    label: t('serverConfig.serverConfig'),
    icon: 'pi pi-fw pi-wrench',
    route: ROOT + 'server',
  },
  // {
  //   label: t('about.about'),
  //   icon: 'pi pi-fw pi-question-circle',
  //   route: ROOT + 'about',
  // },
]);
</script>
<style scoped lang="scss">
.sidebar-app-title.small {
  position: relative;
  left: -0.5rem;
  width: 3.2rem;
  padding-left: 1.4rem;
  padding-right: 1.4rem;
}
</style>
