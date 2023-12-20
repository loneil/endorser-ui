<template>
  <MainCardContent title="Configuration Files">
    <div class="mb-3">
      <RadioButton
        v-model="ingredient"
        inputId="ingredient1"
        name="pizza"
        value="Cheese"
      />
      <label for="ingredient1" class="ml-2">Append Configuration</label>
    </div>

    <div>
      <RadioButton
        v-model="ingredient"
        inputId="ingredient1"
        name="pizza"
        value="Cheese"
      />
      <label for="ingredient1" class="ml-2">Set Configuration</label>
    </div>

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
import RadioButton from 'primevue/radiobutton';
// Components
import MainCardContent from '@/components/layout/mainCard/MainCardContent.vue';
</script>
