<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAPI } from '@/stores/api';
import { storeToRefs } from 'pinia';

const { api } = storeToRefs(useAPI());
const textContent = ref('');
onMounted(async () => {
  const cardData = await api.value?.getCardByCollectorNumber(api.value, 'SCD', 71);

  textContent.value = JSON.stringify(cardData);
});
</script>

<template>
  <main>
    <div>hello world</div>
    <div>{{ textContent }}</div>
  </main>
</template>
