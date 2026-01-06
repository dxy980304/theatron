import { defineStore } from 'pinia'

export const useStore = defineStore('s', {
  state: () => {
    return {
      t: 'all', //类型
      wd: '', //关键字,
    }
  },
  actions: {
    setTypeId(t: string) {
      this.t = t
    },
    setKeyWords(wd: string) {
      this.wd = wd
    },
  },
})
