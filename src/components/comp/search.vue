<template>
  <InputGroup>
    <InputGroupInput
      placeholder="搜你想看的"
      v-model="keywords"
      :disabled="loading"
      @keydown.enter="search"
    />
    <InputGroupAddon align="inline-end">
      <InputGroupButton
        variant="secondary"
        class="cursor-pointer hover:text-green-400"
        :disabled="loading"
        @click="search"
      >
        <SearchIcon />
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { SearchIcon } from 'lucide-vue-next'
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from '@/components/ui/input-group'
import { useStore } from '@/store/useStore'

const s = useStore()

const emit = defineEmits<{ (e: 'search'): void }>()
const data = defineModel()
const loading = defineModel('loading')

const keywords = ref('')

async function search() {
  try {
    data.value = {}
    if (!keywords.value) {
      s.setTypeId('all')
    } else {
      s.setTypeId('')
    }
    s.setKeyWords(keywords.value)
    emit('search')
  } finally {
    loading.value = false
  }
}
watch(
  () => s.wd,
  () => {
    keywords.value = s.wd
  },
  { deep: true },
)
</script>
