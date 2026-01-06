<template>
  <div class="flex items-center cursor-pointer">
    <Icon
      v-if="mode === 'light'"
      icon="line-md:moon"
      width="22"
      height="22"
      @click="mode = 'dark'"
    />
    <Icon
      v-if="mode === 'dark'"
      icon="line-md:sunny"
      width="22"
      height="22"
      @click="mode = 'light'"
    />
  </div>
</template>
<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { Icon } from '@iconify/vue'
const mode = useColorMode()
</script>
