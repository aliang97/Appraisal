<script setup lang="ts">
import { ref, onMounted } from 'vue';
// import { useAPI } from '@/stores/api';
// import { storeToRefs } from 'pinia';
import { doit } from '@/api/parseDeckExport';

// const { api } = storeToRefs(useAPI());
const textContent = ref('');
onMounted(async () => {
  // const cardData = await doit();

  textContent.value = JSON.stringify(cardData);
});
</script>

<template>
  <main>
    <div>hello world</div>
    <div>{{ textContent }}</div>
  </main>
</template>
