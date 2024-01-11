<template>
  <MainCardContent title="Configuration Files">
    <div class="mb-3">
      <RadioButton
        v-model="ingredient"
        inputId="ingredient1"
        name="pizza"
        value="123"
      />
      <label for="ingredient1" class="ml-2">Append Configuration</label>
    </div>

    <div>
      <RadioButton
        v-model="ingredient"
        inputId="ingredient1"
        name="pizza"
        value="abc"
      />
      <label for="ingredient1" class="ml-2">Set Configuration</label>
    </div>

    <Message v-if="ingredient === 'abc'" severity="warn" class="my-6">
      WARNING: Submitting config files will overwrite any existing allowances.
    </Message>

    <h4>Registered DIDs</h4>
    <FileUpload
      name="demo[]"
      url="/api/upload"
      @upload="onAdvancedUpload($event)"
      :multiple="false"
      accept="image/*"
      :maxFileSize="1000000"
      :showUploadButton="false"
    >
      <template #empty>
        <p>Drag and drop file here</p>
      </template>
    </FileUpload>

    <h4>Schemas</h4>
    <FileUpload
      name="demo[]"
      url="/api/upload"
      @upload="onAdvancedUpload($event)"
      :multiple="false"
      accept="image/*"
      :maxFileSize="1000000"
      :showUploadButton="false"
    >
      <template #empty>
        <p>Drag and drop file here</p>
      </template>
    </FileUpload>

    <h4>Credential Definitions</h4>
    <FileUpload
      name="demo[]"
      url="/api/upload"
      @upload="onAdvancedUpload($event)"
      :multiple="false"
      accept="image/*"
      :maxFileSize="1000000"
      :showUploadButton="false"
    >
      <template #empty>
        <p>Drag and drop file here</p>
      </template>
    </FileUpload>

    <Button class="mt-4" label="Submit" />
  </MainCardContent>
</template>

<script setup lang="ts">
// Imports
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';
import Message from 'primevue/message';
import RadioButton from 'primevue/radiobutton';
// Components
import MainCardContent from '@/components/layout/mainCard/MainCardContent.vue';
import { ref } from 'vue';

const ingredient = ref('123');
</script>
