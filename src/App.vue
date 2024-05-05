<script setup lang="ts">
import Player from './AudioPlayer.vue'
</script>

<template>
  <Suspense>
    <Player />
    <template #fallback>Loading...</template>
  </Suspense>
</template>
