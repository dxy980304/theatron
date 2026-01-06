<template>
  <div class="relative w-24 min-w-18 flex flex-col overflow-y-auto scroll-container">
    <div
      v-for="i in data"
      :key="i.type_id"
      class="py-2 box-border cursor-pointer text-base hover:text-[#f54a15]"
      :class="{ 'text-[#f54a15]': i.type_id === s.t }"
      @click="getCategory(i.type_id)"
    >
      {{ i.type_name }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { getCategoryList } from '@/api/get'
import { useStore } from '@/store/useStore'

const data = defineModel<Array<{ type_id: string; type_name: string }>>('list')
const movies = defineModel()
const loading = defineModel('loading')

const s = useStore()

async function getCategory(t: string) {
  try {
    loading.value = true
    movies.value = []
    s.setTypeId(t)
    const res = await getCategoryList(t)
    movies.value = res
  } finally {
    loading.value = false
  }
}
</script>
