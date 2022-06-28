<template>
  <div class="relative flex items-start py-1">
    <div class="flex items-center h-5">
      <input class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded disabled:border-slate-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed" type="checkbox" :checked="!!isRequired || !!checked" :disabled="isRequired" @change="$emit('update:cookie', $event.target.checked)" />
    </div>
    <div class="ml-3 text-sm text-gray-500">
      <label class="font-medium text-gray-700">{{ cookie.name }}</label>
      <p :class="[showDescription ? 'w-5/6' : '']">{{ cookie.short_desc }} {{ showDescription ? cookie.long_desc : '' }}</p>
      <button class="text-gray-700 hover:underline hover:text-gray-800" v-if="cookie.long_desc" @click="showDescription = !showDescription">{{ showDescription ? 'Weniger anzeigen' : 'Mehr erfahren' }} <span aria-hidden="true">{{ showDescription ? '&larr;' : '&rarr;' }}</span></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CookieInput",
  data () {
    return {
      showDescription: false
    }
  },
  props: {
    cookieKey: {
      type: String,
      required: true
    },
    cookie: {
      type: Object,
      required: true
    },
    checked: {
      type: Boolean
    },
    isRequired: {
      type: Boolean
    }
  }
}
</script>
