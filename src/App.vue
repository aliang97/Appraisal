<script setup lang="ts">
import { RouterView } from 'vue-router';
import { Scryfall } from './api/scryfall';
import { useAPI } from './stores/api';

const apiStore = useAPI();
apiStore.api = Scryfall;
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
