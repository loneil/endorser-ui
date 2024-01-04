<template>
  <div class="px-4 pb-8 text-center">
    <h1 class="mb-8">Endorser Service UI</h1>
    <h3 class="mb-8"><strong>Endorser:</strong> {{ ledger }}</h3>
  </div>
</template>

<script setup lang="ts">
import { useLoginStore } from '@/store';
import { storeToRefs } from 'pinia';

const { ledger } = storeToRefs(useLoginStore());
</script>

<style>
.center-boxed {
  display: flex;
  align-items: center;
  justify-content: center;
}

.img-holder {
  width: 300px;
  height: 300px;
}
</style>
