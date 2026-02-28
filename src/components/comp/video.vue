<template>
  <div class="aspect-video">
    <div id="mse" />
  </div>
</template>
<script setup lang="ts">
import 'xgplayer/dist/index.min.css'
import { onMounted, ref, watch } from 'vue'
import Player from 'xgplayer'
import HlsPlugin from 'xgplayer-hls'
import EpisodeListPlugin from '@/plugins/EpisodeList'

const url = defineModel<string>('url')
const props = defineProps(['episodeList'])

const player = ref<Player | null>(null)

function initPlayer() {
  player.value = new Player({
    id: 'mse',
    width: '100%',
    height: '100%',
    url: url.value,
    volume: 1,
    plugins: [HlsPlugin, EpisodeListPlugin],
    episodeList: {
      episodes: props.episodeList,
      currentIndex: 0,
    },
  })

  player.value.on('episodeChange', ({ episode }) => {
    url.value = episode.url
  })
}
onMounted(() => {
  initPlayer()
})

watch(
  () => props,
  () => {
    player.value?.playNext({
      url: url.value,
      autoplay: true,
    })
  },
  { deep: true },
)

defineExpose({
  player,
})
</script>
