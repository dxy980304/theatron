<template>
  <div
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 overflow-y-auto scroll-container-show"
  >
    <template v-if="data.list?.length">
      <div
        class="relative w-full h-full cursor-pointer flex flex-col gap-y-2"
        v-for="(i, idx) in data.list"
        :key="idx"
        @click="goDetail(i)"
      >
        <NImage
          class="flex-1 rounded"
          width="100%"
          height="100%"
          object-fit="cover"
          :src="i.vod_pic"
          preview-disabled
        />
        <div class="flex flex-col">
          <span class="line-clamp-1 text-sm" :title="i.vod_name">{{ i.vod_name }}</span>
          <span
            class="text-xs line-clamp-1 text-gray-500 dark:text-white/50"
            :title="i.vod_remarks"
          >
            {{ i.vod_remarks }}
          </span>
        </div>
      </div>
    </template>
    <NEmpty v-else description="暂无影片~" class="absolute top-1/2 left-1/2 -translate-1/2" />
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { NEmpty, NImage } from 'naive-ui'
const router = useRouter()

const data = defineModel<any>()

function goDetail(e: any) {
  router.push({ name: 'Player', params: { id: e.vod_id } })
}
</script>
