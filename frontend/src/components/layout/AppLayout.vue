<template>
  <Suspense>
    <!-- the suspense tag is so we can await any of these components-->
    <div class="layout-container innkeeper-layout">
      <nav class="layout-sidebar" :class="sidebarOpenClass">
        <Sidebar />
      </nav>
      <div class="layout-page">
        <header class="layout-header">
          <Header />
        </header>
        <main class="layout-content">
          <MainCard>
            <router-view />
          </MainCard>
        </main>
      </div>
    </div>
  </Suspense>
</template>

<script setup lang="ts">
import Header from './Header.vue';
import MainCard from './mainCard/MainCard.vue';
import Sidebar from './Sidebar.vue';

// State
import { storeToRefs } from 'pinia';
import { useLoginStore } from '@/store/loginStore';

const { sidebarOpenClass } = storeToRefs(useLoginStore());
</script>
