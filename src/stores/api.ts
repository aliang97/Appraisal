import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { CardDataAPI } from '@/api/types';

const useAPI = defineStore('api', () => {
  const api = ref<CardDataAPI>();

  return { api };
});

export { useAPI };
