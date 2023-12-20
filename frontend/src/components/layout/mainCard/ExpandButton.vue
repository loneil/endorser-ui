<template>
  <div class="flex justify-content-end">
    <Button
      :icon="cardExpanded ? 'pi pi-window-minimize' : 'pi pi-window-maximize'"
      :title="$t('common.toggleCardExpand')"
      text
      rounded
      @click="cardExpanded = !cardExpanded"
    />
  </div>
</template>

<script setup lang="ts">
// View
import Button from 'primevue/button';
//State
import { useLoginStore } from '@/store/loginStore';
import { storeToRefs } from 'pinia';
const { cardExpanded } = storeToRefs(useLoginStore());
</script>
