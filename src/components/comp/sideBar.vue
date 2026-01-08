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
import { useStore } from '@/store/useStore'

const emit = defineEmits(['search'])
const data = defineModel<Array<{ type_id: string; type_name: string }>>('list')

const s = useStore()

async function getCategory(t: string) {
  s.setTypeId(t)
  s.setKeyWords('')
  emit('search')
}
</script>
