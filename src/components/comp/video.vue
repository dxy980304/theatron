<template>
  <div class="aspect-video">
    <div id="mse" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Player from 'xgplayer'
import HlsPlugin from 'xgplayer-hls'
import 'xgplayer/dist/index.min.css'

const props = defineProps(['url'])

const player = ref<Player | null>(null)

function initPlayer() {
  player.value = new Player({
    id: 'mse',
    width: '100%',
    height: '100%',
    url: props.url,
    volume: 1,
    plugins: [HlsPlugin],
  })
}
onMounted(() => {
  initPlayer()
})

watch(
  () => props,
  () => {
    player.value?.playNext({
      url: props.url,
    })
  },
  { deep: true },
)

defineExpose({
  player,
})
</script>
