<template>
  <div v-if="!sideBarLoading" class="w-full h-full flex overflow-hidden gap-x-2">
    <SideBar v-model="movies" v-model:loading="loading" v-model:list="data" />
    <div class="flex-1 flex flex-col gap-y-2">
      <div class="flex gap-x-2 self-end">
        <Search v-model="movies" v-model:loading="loading" />
        <modeToggle />
      </div>
      <videoList v-if="!loading" v-model="movies" />
      <div v-else class="relative flex-1">
        <Loading class="absolute top-1/2 left-1/2 -translate-1/2" />
      </div>
    </div>
  </div>
  <Loading v-else class="absolute top-1/2 left-1/2 -translate-1/2" />
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Search from '@/components/comp/search.vue'
import SideBar from '@/components/comp/sideBar.vue'
import videoList from '@/components/comp/videoList.vue'
import modeToggle from '@/components/comp/modeToggle.vue'
import Loading from '@/components/comp/loading.vue'
import { getDetail, getSideBarList } from '@/api/get'

const movies = ref({ total: 0 })
const data = ref<Array<{ type_id: string; type_name: string }>>([])

const loading = ref(false)
const sideBarLoading = ref(false)

async function getList() {
  try {
    sideBarLoading.value = true
    const res = await getSideBarList()
    const resp = await getDetail()
    res.class.unshift({ type_id: 'all', type_name: '首页' })
    data.value = res.class
    movies.value = resp
  } finally {
    sideBarLoading.value = false
  }
}
onMounted(() => {
  getList()
})
</script>
