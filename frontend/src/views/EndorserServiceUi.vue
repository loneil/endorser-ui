<template>
  <div class="alert-container">
    <Alert class="z-2" />
    <AppLayout v-if="isLoggedIn" />
    <Login v-else />
  </div>
</template>

<script setup lang="ts">
import Alert from '@/components/notifications/Alert.vue';
import AppLayout from '@/components/layout/AppLayout.vue';
import Login from '@/components/Login.vue';
import { storeToRefs } from 'pinia';
import { useLoginStore } from '@/store';

const { isLoggedIn } = storeToRefs(useLoginStore());
</script>

<style scoped lang="scss">
// This is the info banner alert that is shown on all pages
.p-message {
  margin: 0;
  border-radius: 0;
}
</style>
