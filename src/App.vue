<script setup lang="ts">
const tracks = [
  'Track 1',
  'Track 2',
  'Track 3',
  'Track 4',
  'Track 5',
  'Track 6',
  'Track 7',
  'Track 8',
  'Track 9',
  'Track 10'
]
</script>

<template>
  <div class="player">
    <div class="cover"></div>
    <div class="right">
      <div class="tracks">
        <div class="track" v-for="track in tracks" :key="track">
          {{ track }}
        </div>
      </div>
      <div class="controls">
        <div class="button">S</div>
        <div class="button">P</div>
        <div class="seekbar"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.player {
  display: flex;
  height: 160px;
}
.cover {
  width: 160px;
  height: 160px;
  border: 1px solid var(--orange);
}
.right {
  width: 400px;
  display: flex;
  flex-direction: column;
}
.tracks {
  flex-grow: 1;
  border: 1px solid var(--orange);
  border-left: 0;
  padding-left: 10px;
  overflow-x: hidden;
}
.track {
  user-select: none;
  cursor: pointer;
}
.controls {
  display: flex;
  border: 1px solid var(--orange);
  border-top: 0;
  border-left: 0;
}
.button {
  border-right: 1px solid var(--orange);
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.seekbar {
  flex-grow: 1;
}
</style>
