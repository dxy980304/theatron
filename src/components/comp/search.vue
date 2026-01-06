<template>
  <InputGroup>
    <InputGroupInput placeholder="搜你想看的" v-model="keywords" />
    <InputGroupAddon align="inline-end">
      <InputGroupButton
        variant="secondary"
        class="cursor-pointer hover:text-green-400"
        @click="search"
      >
        <SearchIcon />
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { SearchIcon } from 'lucide-vue-next'
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from '@/components/ui/input-group'
import { getKeyWordsList } from '@/api/get'
import { useStore } from '@/store/useStore'

const { setKeyWords, setTypeId } = useStore()

const data = defineModel()

const keywords = ref('')

async function search() {
  data.value = {}
  if (!keywords.value) {
    setTypeId('all')
  } else {
    setTypeId('')
  }
  setKeyWords(keywords.value)
  const res = await getKeyWordsList(keywords.value)
  data.value = res
}
</script>
