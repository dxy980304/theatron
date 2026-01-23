<template>
  <Pagination v-slot="{ page }" :items-per-page="props.itemsPerPage" :sibling-count="siblingCount" :total="props.total"
    v-model:page="currentPage" @update:page="emit('search')">
    <PaginationContent v-slot="{ items }">
      <PaginationFirst class="hidden sm:block" />
      <PaginationPrevious />
      <template v-for="(item, index) in items" :key="index">
        <PaginationItem v-if="item.type === 'page'" :value="item.value" :is-active="item.value === page">
          {{ item.value }}
        </PaginationItem>
      </template>
      <PaginationNext />
      <PaginationLast class="hidden sm:block" />
    </PaginationContent>
  </Pagination>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useBreakpoints } from "@vueuse/core";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
} from '@/components/ui/pagination'

const emit = defineEmits<{
  (e: 'search'): void
}>()
const props = defineProps(['total', 'itemsPerPage'])

const currentPage = ref(1)
const siblingCount = ref(1)

const breakpoints = useBreakpoints({
  sm: 640,
})
watch(
  breakpoints.greaterOrEqual('sm'),
  (flag) => {
    siblingCount.value = flag ? 2 : 1
  }
)
defineExpose({
  currentPage,
})
</script>
