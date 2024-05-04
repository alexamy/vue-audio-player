<script setup lang="ts">
import { computed, ref } from 'vue'
import { tracks } from './files'

const currentIndex = ref(0)
const currentTrack = computed(() => tracks[currentIndex.value])
const names = computed(() => tracks.map((track) => track.name))

const player = ref<HTMLAudioElement | null>(null)

function play() {
  player.value!.src = currentTrack.value.path
  player.value!.addEventListener(
    'canplay',
    () => {
      player.value!.play()
    },
    { once: true }
  )
}

function pause() {
  player.value?.pause()
}

function nextTrack() {
  currentIndex.value = (currentIndex.value + 1) % tracks.length
  play()
}

function prevTrack() {
  currentIndex.value = (currentIndex.value - 1 + tracks.length) % tracks.length
  play()
}

/* TODO
 x Play/Pause
 x Next/Previous
 * Seek track on seekbar click
 * Play track on double click
 * Play next track automatically after track ends
 * Add loading spinner when track is loading
 * Cover animation
 * Volume bar
 * Shuffle tracks
 * Repeat track / playlist
 * Play first track when no track is selected
 * Scroll to selected track (when switching from first to last)
 */
</script>

<template>
  <div class="center">
    <audio ref="player" :src="currentTrack.path"></audio>
    <div class="player">
      <div class="cover"></div>
      <div class="sidebar">
        <ul class="tracks">
          <li
            v-for="(name, index) in names"
            :key="index"
            class="track"
            :class="{ selected: currentIndex === index }"
          >
            {{ name }}
          </li>
        </ul>
        <div class="controls">
          <button class="button" @click="play">⏵</button>
          <button class="button" @click="pause">⏸</button>
          <button class="button" @click="prevTrack">⏮</button>
          <button class="button" @click="nextTrack">⏭</button>
          <progress class="seekbar" max="100" value="50"></progress>
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
.sidebar {
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
  list-style: none;
  padding: 0;
  margin: 0;
}
.tracks::-webkit-scrollbar {
  width: 10px;
  background-color: transparent;
}
.tracks::-webkit-scrollbar-thumb {
  background-color: var(--orange);
}
.track {
  user-select: none;
  cursor: pointer;
  background-color: var(--dark-1);
  padding: 0 0 0;
  padding: 4px;
  padding-right: 0;
}
.track:hover,
.track.selected {
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
  outline: 0;
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
.button:active,
.button:focus {
  outline: 0;
}
.seekbar {
  appearance: none;
  height: 100%;
  flex-grow: 1;
  cursor: pointer;
}
.seekbar[value]::-webkit-progress-bar {
  background-color: transparent;
}
.seekbar[value]::-webkit-progress-value {
  background-color: var(--orange);
}
</style>
