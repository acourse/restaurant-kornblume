<template>
  <transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-300"
              leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
    <div id="pagetop" class="fixed right-3 bottom-3 z-50" v-show="posY > 300" @click="toTop">
      <div class="flex items-center justify-center h-12 w-12 rounded-full bg-fettehenne-yellow text-white shadow-xl cursor-pointer">
        <ChevronUpIcon class="h-8 w-8 fill-current text-white"/>
      </div>
    </div>
  </transition>
</template>

<script>

import { ChevronUpIcon } from '@heroicons/vue/solid'

export default {
  name: 'ToTopButton',
  components: {
    ChevronUpIcon
  },
  data () {
    return {
      posTimer: 0,
      posY: 0,
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll: function () {
      if (this.posTimer) return
      this.posTimer = setTimeout(() => {
        this.posY = window.scrollY
        clearTimeout(this.posTimer)
        this.posTimer = 0
      }, 100)
    },
    toTop: function () {
      this.$smoothScroll({
        scrollTo: 0,
        updateHistory: false,
        duration: 1000,
      })
    },
  },
}
</script>

<style scoped>

</style>
