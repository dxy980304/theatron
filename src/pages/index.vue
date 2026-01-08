<template>
  <div v-if="!sideBarLoading" class="w-full h-full flex overflow-hidden gap-x-2">
    <SideBar v-model="movies" v-model:loading="loading" v-model:list="data" />
    <div class="flex-1 flex flex-col gap-y-2">
      <div class="flex gap-x-2 self-end">
        <Search @search="search(true)" />
        <modeToggle />
      </div>
      <template v-if="!loading">
        <videoList v-model="movies" />
      </template>
      <div v-else class="relative flex-1">
        <Loading class="absolute top-1/2 left-1/2 -translate-1/2" />
      </div>
      <Pagination
        ref="paginationRef"
        :total="movies.total"
        :items-per-page="movies.limit"
        @search="search"
      />
    </div>
  </div>
  <Loading v-else class="absolute top-1/2 left-1/2 -translate-1/2" />
</template>
<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import Search from '@/components/comp/search.vue'
import SideBar from '@/components/comp/sideBar.vue'
import videoList from '@/components/comp/videoList.vue'
import Pagination from '@/components/comp/pagination.vue'
import modeToggle from '@/components/comp/modeToggle.vue'
import Loading from '@/components/comp/loading.vue'
import { useStore } from '@/store/useStore'
import { getDetail, getSideBarList } from '@/api/get'

const s = useStore()

const paginationRef = useTemplateRef('paginationRef')

const movies = ref({ total: 0, limit: 20 })
const data = ref<Array<{ type_id: string; type_name: string }>>([])

const loading = ref(false)
const sideBarLoading = ref(false)

async function search(flag = false) {
  try {
    if (flag) {
      paginationRef.value!.currentPage = 1
    }
    loading.value = true
    const res = await getDetail({ pg: paginationRef.value!.currentPage, wd: s.wd })
    movies.value = res
  } finally {
    loading.value = false
  }
}

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
