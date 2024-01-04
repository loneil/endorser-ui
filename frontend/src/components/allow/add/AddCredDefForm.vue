<template>
  <div>
    <form @submit.prevent="handleSubmit(!v$.$invalid)">
      <!-- Issuer DID -->
      <div class="field">
        <label
          for="issuerDid"
          :class="{ 'p-error': v$.issuerDid.$invalid && submitted }"
        >
          {{ $t('allow.credDef.issuerDid') }}
        </label>
        <InputText
          v-model="v$.issuerDid.$model"
          class="w-full"
          :class="{ 'p-invalid': v$.issuerDid.$invalid && submitted }"
          type="text"
          name="issuerDid"
          autofocus
        />
        <small v-if="v$.did.$invalid && submitted" class="p-error">
          {{ v$.did.required.$message }}
        </small>
      </div>

      <!-- Author DID -->
      <div class="field">
        <label for="did" :class="{ 'p-error': v$.did.$invalid && submitted }">
          {{ $t('allow.credDef.did') }}
        </label>
        <InputText
          v-model="v$.did.$model"
          class="w-full"
          :class="{ 'p-invalid': v$.did.$invalid && submitted }"
          type="text"
          name="did"
          autofocus
        />
        <small v-if="v$.did.$invalid && submitted" class="p-error">
          {{ v$.did.required.$message }}
        </small>
      </div>

      <!-- Schema Name -->
      <div class="field">
        <label for="name" :class="{ 'p-error': v$.name.$invalid && submitted }">
          {{ $t('allow.credDef.name') }}
        </label>
        <InputText
          v-model="v$.name.$model"
          class="w-full"
          :class="{ 'p-invalid': v$.name.$invalid && submitted }"
          type="text"
          name="name"
          autofocus
        />
        <small v-if="v$.name.$invalid && submitted" class="p-error">
          {{ v$.name.required.$message }}
        </small>
      </div>

      <!-- Version -->
      <div class="field">
        <label
          for="version"
          :class="{ 'p-error': v$.version.$invalid && submitted }"
        >
          {{ $t('allow.credDef.version') }}
        </label>
        <InputText
          v-model="v$.version.$model"
          class="w-full"
          :class="{ 'p-invalid': v$.version.$invalid && submitted }"
          type="text"
          name="version"
          autofocus
        />
        <small v-if="v$.version.$invalid && submitted" class="p-error">
          {{ v$.version.required.$message }}
        </small>
      </div>

      <!-- Tag -->
      <div class="field">
        <label for="tag" :class="{ 'p-error': v$.tag.$invalid && submitted }">
          {{ $t('allow.credDef.tag') }}
        </label>
        <InputText
          v-model="v$.tag.$model"
          class="w-full"
          :class="{ 'p-invalid': v$.tag.$invalid && submitted }"
          type="text"
          name="tag"
          autofocus
        />
        <small v-if="v$.tag.$invalid && submitted" class="p-error">
          {{ v$.tag.required.$message }}
        </small>
      </div>

      <!-- Revocation Registry Definition -->
      <div>
        <label for="revRegDefinition">
          {{ $t('allow.credDef.revRegDefinition') }}
        </label>
      </div>
      <InputSwitch id="revRegDefinition" v-model="v$.revRegDef.$model" />

      <!-- Revocation Registry Entry -->
      <div class="mt-3">
        <label for="revRegEntry">
          {{ $t('allow.credDef.revRegEntry') }}
        </label>
      </div>
      <InputSwitch id="revRegEntry" v-model="v$.revRegEntry.$model" />

      <Button
        type="submit"
        label="Add Credential Definition Allowance"
        class="mt-5 w-full"
        :disabled="loading"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
// Vue
import { reactive, ref } from 'vue';
// PrimeVue / Validation / etc
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputSwitch from 'primevue/inputswitch';
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { useToast } from 'vue-toastification';
// State
import { storeToRefs } from 'pinia';
import { useAllowanceStore } from '@/store';

const toast = useToast();

const { loading } = storeToRefs(useAllowanceStore());

const emit = defineEmits(['closed', 'success']);

// Form and Validation
const formFields = reactive({
  did: '',
  issuerDid: '',
  name: '',
  revRegDef: true,
  revRegEntry: true,
  tag: '',
  version: '',
});
const rules = {
  did: { required },
  issuerDid: { required },
  name: { required },
  revRegDef: { required },
  revRegEntry: { required },
  tag: { required },
  version: { required },
};
const v$ = useVuelidate(rules, formFields);

// Form submission
const submitted = ref(false);
const handleSubmit = async (isFormValid: boolean) => {
  submitted.value = true;

  if (!isFormValid) {
    return;
  }
  try {
    // const payload = {
    //   content: formFields.msgContent,
    // };

    // // call store
    // const conn_id = formFields.selectedConnection.value;
    // await messageStore.sendMessage(conn_id, payload);
    toast.info('Message Sent');
    emit('success');
    // close up on success
    emit('closed');
  } catch (error) {
    toast.error(`Failure: ${error}`);
  } finally {
    submitted.value = false;
  }
};
</script>
