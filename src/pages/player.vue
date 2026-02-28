<template>
  <div class="w-full h-full overflow-hidden p-2 box-border flex flex-col" v-if="!loading">
    <div class="flex justify-between mb-2">
      <Icon
        icon="mingcute:back-line"
        width="22"
        height="22"
        class="cursor-pointer"
        @click="router.push({ name: 'Index' })"
      />
      <ModeToggle />
    </div>
    <div class="overflow-y-auto scroll-container-show">
      <div v-if="btnList.length" class="w-9/10 mx-auto">
        <Video v-if="active" class="mb-4" v-model:url="active" :episodeList="btnList" />
      </div>
      <Card class="rounded-md py-3" v-if="btnList.length">
        <CardContent class="px-3">
          <div class="flex flex-col gap-y-2">
            <div v-for="(i, idx) in showDetail" :key="idx" class="flex items-center">
              <div class="w-12 text-sm self-start">{{ i.name || '未知' }}：</div>
              <div class="flex-1 text-sm">
                <span v-if="i.key === 'vod_content'" v-html="detail[i.key].replace(/\s/g, '')" />

                <span v-else>
                  {{ detail[i.key] || '未知' }}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div
        class="mt-2 grid grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-9 gap-x-4 gap-y-2"
      >
        <template v-for="(i, idx) in btnList" :key="idx">
          <Badge
            class="w-full cursor-pointer hover:bg-[#171717] hover:text-[#f5f5f5] dark:hover:bg-[#f5f5f5] dark:hover:text-[#171717]"
            :variant="i.url === active ? 'default' : 'secondary'"
            @click="play(i)"
            >{{ i.name }}</Badge
          >
        </template>
      </div>
    </div>
  </div>
  <Loading v-else class="absolute left-1/2 top-1/2 -translate-1/2" />
</template>
<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import Video from '@/components/comp/video.vue'
import ModeToggle from '@/components/comp/modeToggle.vue'
import { getVideoDetail } from '@/api/get'
import Loading from '@/components/comp/loading.vue'

const route = useRoute()
const router = useRouter()

const active = ref('')
const detail = ref<any>({})
const loading = ref(false)

const btnList = ref<Array<{ name: string; url: string }>>([])

const showDetail = ref([
  { name: '导演', key: 'vod_director' },
  { name: '主演', key: 'vod_actor' },
  { name: '更新', key: 'vod_time' },
  { name: '集数', key: 'vod_remarks' },
  { name: '剧情', key: 'vod_content' },
])

function play(e: { name: string; url: string }) {
  active.value = e.url
}

async function getDetail() {
  try {
    loading.value = true
    const res = await getVideoDetail(route.params.id as string)
    detail.value = res.list[0]
    const arr = [],
      d = detail.value.vod_play_url.split('#')
    for (const str of d) {
      arr.push({ name: str.split('$')[0], url: str.split('$')[1] })
    }
    if (arr.length > 0) {
      active.value = arr[0]!.url
      btnList.value = arr
      nextTick(() => {
        play(btnList.value[0]!)
      })
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getDetail()
})
</script>
