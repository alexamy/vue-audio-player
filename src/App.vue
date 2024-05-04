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
  <div class="center">
    <div class="player">
      <div class="cover"></div>
      <div class="right">
        <div class="tracks">
          <div class="track" v-for="track in tracks" :key="track">
            {{ track }}
          </div>
        </div>
        <div class="controls">
          <button class="button">⏵</button>
          <button class="button">⏸</button>
          <button class="button">⏮</button>
          <button class="button">⏭</button>
          <div class="seekbar"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.center {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 40px;
}
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
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border: 1px solid var(--orange);
  border-left: 0;
  overflow-x: hidden;
  overflow-y: overlay;
  scrollbar-color: var(--orange) transparent;
}
.track {
  user-select: none;
  cursor: pointer;
  background-color: var(--dark-1);
  padding: 0 0 0;
  padding: 4px;
  padding-right: 0;
}
.track:hover {
  background-color: var(--orange);
}
.controls {
  display: flex;
  border: 1px solid var(--orange);
  border-top: 0;
  border-left: 0;
}
.button {
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-right: 1px solid var(--orange);
  background-color: transparent;
  color: var(--white);
  line-height: 1.5;
  cursor: pointer;
  user-select: none;
}
.button:hover {
  background-color: var(--orange);
}
.seekbar {
  flex-grow: 1;
  cursor: pointer;
}
</style>
