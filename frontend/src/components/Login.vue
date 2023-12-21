<template>
  <div class="traction-login grid w-screen flex-grow-1 mt-0">
    <div class="col-12 md:col-6 xl:col-4">
      <div class="px-8">
        <div class="pt-4 pb-6">
          <img src="/img/bc/bc_logo.png" class="logo-bc" />

          <h1 class="text-center">Endorser Service UI</h1>
        </div>
        <!-- <form>
  <div class="field">
    <label for="username">Username</label>
    <InputText id="username"  aria-describedby="username-help" />
    <small id="username-help"
      >Enter your username to reset your password.</small
    >
  </div></form> -->

        <div class="py-8">
          <LoginOidc class="mt-0" />
        </div>
      </div>
    </div>

    <div class="cover-image hidden md:block col-0 md:col-6 xl:col-8 p-0">
    </div>
  </div>
  <SessionTimeoutModal />
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import LoginOidc from './LoginOidc.vue';
import SessionTimeoutModal from '@/components/common/SessionTimeoutModal.vue';
</script>

<style scoped lang="scss">
// See layout.scss for generalized common login layout stuff
// Set the image specific to this component here though
.cover-image {
  background-image: url('/img/innkeeper/_ba9d6ae6-0249-4f64-b2e6-93abd378080f.jpg');
}
</style>
