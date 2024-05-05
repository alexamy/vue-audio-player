<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

interface Track {
  name: string
  path: string
}

const tracks: Track[] = await fetch('tracks.json').then((res) => res.json())

const currentIndex = ref(0)
const progress = ref(0)

const isLoaded = ref(false)
const isPlaying = ref(false)
const isRepeatOne = ref(false)

const player = ref<HTMLAudioElement | null>(null)
const trackRefs = ref<HTMLElement[]>([])

const names = computed(() => tracks.map((track) => track.name))
const currentTrack = computed(() => tracks[currentIndex.value])
const currentTrackRef = computed(() => trackRefs.value[currentIndex.value])

watch(currentTrack, () => {
  isLoaded.value = false
  isPlaying.value = false

  player.value!.src = currentTrack.value.path
  player.value!.addEventListener(
    'canplay',
    () => {
      isLoaded.value = true
      play()
    },
    { once: true }
  )
})

async function play() {
  player.value!.play()
  isPlaying.value = true
}

function pause() {
  player.value?.pause()
  isPlaying.value = false
}

function playAgain() {
  player.value!.currentTime = 0
  play()
}

function nextTrack() {
  currentIndex.value = (currentIndex.value + 1) % tracks.length
  currentTrackRef.value.scrollIntoView({ block: 'center' })
  play()
}

function prevTrack() {
  currentIndex.value = (currentIndex.value - 1 + tracks.length) % tracks.length
  currentTrackRef.value.scrollIntoView({ block: 'center' })
  play()
}

function onTrackEnd() {
  if (isRepeatOne.value) {
    playAgain()
  } else {
    nextTrack()
  }
}

function selectTrack(index: number) {
  currentIndex.value = index
  play()
}

function seek(event: MouseEvent) {
  const rect = (event.target as HTMLElement).getBoundingClientRect()
  const x = event.clientX - rect.left
  const amount = x / rect.width
  player.value!.currentTime = player.value!.duration * amount
}

function onProgressUpdate() {
  const amount = (player.value!.currentTime / player.value!.duration) * 100
  progress.value = isNaN(amount) ? 0 : amount
}

function repeatOne() {
  isRepeatOne.value = !isRepeatOne.value
}

onMounted(() => {
  player.value!.addEventListener('timeupdate', onProgressUpdate)
  player.value!.addEventListener('ended', onTrackEnd)
})

onUnmounted(() => {
  player.value!.removeEventListener('timeupdate', onProgressUpdate)
  player.value!.removeEventListener('ended', onTrackEnd)
})

/* TODO
 x Play/Pause
 x Next/Previous
 x Add progress visualisation
 x Seek track on seekbar click
 x Play track on double click
 x Play next track automatically after track ends
 x Cover animation
 x Repeat one track
 x Add button tooltips
 x Scroll to selected track (when switching from first to last)
 x Use async JSON for tracks
 x Add mobile version
 x Add svg icons for controls
 * Fix mobile version layout on build
 * Extract headless player
 *
 * Merge play and pause into one button
 * Dont select track on page load
 * Play first track when no track is selected on play click
 * Scale vinyl cover
 *
 * Save / restore state on page reload
 * Shuffle tracks
 * Volume bar
 * Missing track indicator
 * Add loading spinner when track is loading
 */
</script>

<template>
  <div class="center">
    <audio ref="player" :src="currentTrack.path"></audio>
    <div class="player">
      <div class="cover">
        <div class="vinyl" :class="{ rotating: isPlaying }"></div>
      </div>
      <div class="sidebar">
        <ul class="tracks">
          <li
            ref="trackRefs"
            v-for="(name, index) in names"
            :key="index"
            class="track"
            :class="{ selected: currentIndex === index }"
            @click="selectTrack(index)"
          >
            {{ index + 1 }}. {{ name }}
          </li>
        </ul>
        <div class="controls">
          <button class="button left" @click="play">
            <v-icon scale="0.7" name="io-play-sharp"></v-icon>
          </button>
          <button class="button left" @click="pause">
            <v-icon scale="0.7" name="io-pause-sharp"></v-icon>
          </button>
          <button class="button left" @click="prevTrack">
            <v-icon scale="0.7" name="io-play-back-sharp"></v-icon>
          </button>
          <button class="button left" @click="nextTrack">
            <v-icon scale="0.7" name="io-play-forward-sharp"></v-icon>
          </button>
          <progress class="seekbar" max="100" :value="progress" @click="seek"></progress>
          <button
            class="button right"
            :class="{ toggled: isRepeatOne }"
            title="Repeat current track"
            @click="repeatOne"
          >
            <v-icon name="md-repeatone-sharp"></v-icon>
          </button>
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
  border: 1px solid var(--orange);
}
.vinyl {
  width: 144px;
  height: 144px;
  background: url('/brothers1.png') no-repeat;
  mask-image: url('/vinyl.png');
  animation: rotate 16s linear infinite;
  animation-play-state: paused;
}
.rotating {
  animation-play-state: running;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.sidebar {
  min-width: 450px;
  display: flex;
  flex-direction: column;
}
.tracks {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border: 1px solid var(--orange);
  border-left-width: 0;
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
  white-space: nowrap;
  overflow: hidden;
}
@media (hover: hover) {
  .track:hover {
    background-color: var(--dark-2);
  }
}
.track.selected {
  background-color: var(--orange);
}
.controls {
  display: flex;
  border: 1px solid var(--orange);
  border-top-width: 0;
  border-left-width: 0;
}
.button {
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 0;
  border: none;
  border: 0 solid var(--orange);
  background-color: transparent;
  color: var(--white);
  line-height: 1.5;
  cursor: pointer;
  user-select: none;
}
.button.left {
  border-right-width: 1px;
}
.button.right {
  border-left-width: 1px;
}
@media (hover: hover) {
  .button:hover {
    background-color: var(--dark-2);
  }
}
.button.toggled {
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

@media only screen and (max-width: 900px) {
  .center {
    display: block;
    padding-left: 10px;
    padding-right: 10px;
  }
  .cover {
    display: none;
  }
  .sidebar {
    min-width: 350px;
    width: 100%;
  }
  .tracks,
  .controls {
    border-left-width: 1px;
  }
}
</style>
