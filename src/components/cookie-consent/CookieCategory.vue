<template>
  <div>
    <div class="flex flex-row justify-between items-center overflow-x-hidden">
      <div class="relative flex items-start py-1 w-5/6">
        <div class="flex items-center h-5 ml-1">
          <input class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded disabled:border-slate-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed" type="checkbox" :checked="!!categoryConfig.required || !!cookieMap.hasConsented" :disabled="categoryConfig.required" @change="updateCategory($event)" />
        </div>
        <div class="ml-3 text-sm text-gray-500">
          <label class="font-medium text-gray-700">{{ categoryConfig.name }}</label>
          <p :class="[showDescription ? 'w-5/6' : '']">{{ categoryConfig.short_desc }} {{ showDescription ? categoryConfig.long_desc : '' }}</p>
          <button class="text-gray-700 hover:underline hover:text-gray-800" v-if="categoryConfig.long_desc" @click="showDescription = !showDescription">{{ showDescription ? 'Weniger anzeigen' : 'Mehr erfahren' }} <span aria-hidden="true">{{ showDescription ? '&larr;' : '&rarr;' }}</span></button>
        </div>
      </div>
        <div class="w-1/6 flex justify-end items-center">
            <svg @click.prevent="toggleAccordion(accordionOpen)" v-if="categoryConfig.cookies" class="w-3 h-3 fill-current text-gray-700 flex-shrink-0 mr-8 -ml-12 cursor-pointer z-10" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <rect y="7" width="16" height="2" rx="1" class="transform origin-center transition duration-200 ease-out" :class="{'rotate-180': accordionOpen}" />
                <rect y="7" width="16" height="2" rx="1" class="transform origin-center rotate-90 transition duration-200 ease-out" :class="{'rotate-180 opacity-0': accordionOpen}" />
            </svg>
        </div>
    </div>
    <transition
        name="expand"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
    >
      <div
          class="pl-8 overflow-hidden"
          v-if="categoryConfig.cookies && accordionOpen"
      >
          <CookieInput v-for="(value, index) in categoryConfig.cookies" :checked="cookieMap?.cookies[index]?.hasConsented" :is-required="categoryConfig.required" @update:cookie="updateCookie(value.key, $event)" :cookie-key="`${categoryKey}.${value.key}`" :cookie="value" :key="index"/>
      </div>
    </transition>
  </div>
</template>

<script>
import CookieInput from "./CookieInput.vue";

export default {
  name: "CookieCategory",
  components: {
    CookieInput
  },
  data () {
    return {
      showDescription: false,
      categoryObject: null,
      accordionOpen: false
    }
  },
  props: {
    categoryKey: {
      type: String,
      required: true
    },
    categoryConfig: {
      type: Object,
      required: true
    },
    cookieMap: {
      type: Object
    }
  },
  methods: {
    updateCategory (event) {

      let newCookieArray = this.cookieMap.cookies.map(e => {
        return { ...e, hasConsented: !!event.target.checked }
      })

      this.$emit('update:category', { ...this.cookieMap, cookies: newCookieArray, hasConsented: !!event.target.checked })
    },

    updateCookie (key, event) {
      const newCookies = this.cookieMap.cookies
      const index = this.cookieMap.cookies.findIndex(e => e.key === key)
      newCookies[index].hasConsented = !!event

      this.$emit('update:category', { ...this.cookieMap, cookies: newCookies })
    },
    toggleAccordion (value) {
      this.accordionOpen = !value;
    },
    enter(element) {
      const width = getComputedStyle(element).width;

      element.style.width = width;
      element.style.position = 'absolute';
      element.style.visibility = 'hidden';
      element.style.height = 'auto';

      const height = getComputedStyle(element).height;

      element.style.width = null;
      element.style.position = null;
      element.style.visibility = null;
      element.style.height = 0;

      getComputedStyle(element).height;

      requestAnimationFrame(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = 'auto';
    },
    leave(element) {
      const height = getComputedStyle(element).height;

      element.style.height = height;

      getComputedStyle(element).height;

      requestAnimationFrame(() => {
        element.style.height = 0;
      });
    }
  }
}
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: height 0.3s ease-in-out;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  height: 0;
}


</style>
