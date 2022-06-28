<template>
  <div class="font-sans font-normal" >
    <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-out duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
      <div v-if="$consent.cookiesMap" class="fixed inset-0 bg-gray-900 bg-opacity-30 transition-opacity" style="z-index: 9999;" aria-hidden="true"></div>
    </transition>
    <transition
        enter-active-class="transition ease-in-out duration-200"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in-out duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
    >
      <div v-if="$consent.cookiesMap" class="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center transform px-4 sm:px-6" style="z-index: 9999;" role="dialog" aria-modal="true">
        <div ref="modalContent" class="bg-white rounded shadow-lg max-w-lg w-full max-h-full">
          <div class="p-5">
            <!-- Modal header -->
            <div v-if="showPolicy">
              <div class="mb-2">
                <div class="flex justify-between items-center">
                  <div class="text-lg font-semibold text-slate-800">{{ consentText.dataPolicy }}</div>
                  <button class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2" @click="showPolicy = false">
                    <div class="sr-only">Close</div>
                    {{ consentText.backToConsent }}
                  </button>
                </div>
              </div>
              <div class="overflow-y-auto max-h-[60vh] py-2">
                <DataPolicy/>
              </div>
            </div>
            <div v-else>
              <div class="mb-2">
                <div class="flex justify-between items-center">
                  <div class="text-lg font-semibold text-slate-800">{{ consentText.headline }}</div>
                  <button class="text-slate-400 hover:text-slate-500" @click="$emit('close')" v-if="$consent.showedConsent">
                    <div class="sr-only">Close</div>
                    <svg class="w-4 h-4 fill-current">
                      <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="text-sm mb-5">
                <div class="space-y-2 text-gray-500">
                  <p>{{ consentText.opener }}</p>
                  <p>{{ consentText.dataPolicyText }} <button class="text-gray-700 hover:underline hover:text-gray-800" @click="showPolicy = true">{{ consentText.dataPolicy }}</button>.</p>
                </div>
              </div>
              <div class="py-2 sm:max-h-[60vh] max-h-72 overflow-y-auto">
                <div v-for="(value, name, index) in $consent.config" :key="index">
                  <CookieCategory @update:category="cookieMap.set(name, $event)" :cookieMap="cookieMap.get(name)" :category-config="value" :category-key="name" />
                </div>
              </div>
              <div class="flex flex-wrap sm:justify-end justify-center sm:space-y-0 space-y-1 sm:space-x-2 mt-2">
                <button class="sm:inline-flex w-full sm:w-auto items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500" @click="declineAll">{{ consentText.decline }}</button>
                <button class="sm:inline-flex w-full sm:w-auto items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500" @click="save">{{ consentText.selection }}</button>
                <button class="sm:inline-flex w-full sm:w-auto items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500" @click="acceptAll">{{ consentText.accept }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
/* eslint-disable */
import CookieCategory from "./CookieCategory";
import DataPolicy from "./DataPolicy";
const defaultTexts = {
  accept: 'Alle akzeptieren',
  selection: 'Auswahl akzeptieren',
  decline: 'Alle ablehnen',
  headline: 'Wir benutzen Cookies 🍪',
  opener: 'Wir möchten Cookies dafür nutzen, unsere Website zu analysieren und sie für dich zu verbessern, sowie für Werbezwecke.',
  dataPolicyText: 'Weitere Informationen finden Sie in unserer',
  dataPolicy: 'Datenschutzerklärung',
  backToConsent: 'Zurück'
}

export default {
  name: "CookieConsent",
  components: {DataPolicy, CookieCategory },
  // props: ['title'],
  emits: ['savedConsent', 'close'],
  props: {
    consentText: {
      type: Object,
      default: defaultTexts
    },
    showConsent: {
      type: Boolean
    }
  },
  data () {
    return {
      cookieMap: new Map(this.$consent.createCookieMap()),
      showPolicy: false
    }
  },
  methods: {
    save() {
      this.$consent.setConsent(this.cookieMap)
      this.$emit('savedConsent')
    },
    acceptAll() {
      this.cookieMap.forEach(acceptAllCookies)
      this.$consent.setConsent(this.cookieMap)
      this.$emit('savedConsent')
    },
    declineAll() {
      this.cookieMap.forEach(declineAllCookies)
      this.$consent.setConsent(this.cookieMap)
      this.$emit('savedConsent')
    }
  },
  watch: {
    showConsentCopy: {
      handler(newValue, oldValue) {
        if (newValue === true) {
          document.getElementsByTagName("body")[0].style.overflow = "hidden"
        } else {
          document.getElementsByTagName("body")[0].style.overflow = null
        }
      },
      immediate: true
    },
    consentSeen: {
      handler(newValue, oldValue) {
        if (newValue === false) {
          document.getElementsByTagName("body")[0].style.overflow = "hidden"
        } else {
          document.getElementsByTagName("body")[0].style.overflow = null
        }
      },
      immediate: true
    }
  },
  computed: {
    mapCategory(name) {
      return this.cookieMap.get(name)
    },
    showConsentCopy() {
      return this.showConsent
    },
    consentSeen() {
      return this.$consent.showedConsent
    }
  }
}

function acceptAllCookies(value, key, map) {
  let category = value
  category.cookies = category.cookies.map(e => {
    return { ...e, hasConsented: true}
  })
  map.set(key, { ...category, hasConsented: true })
}

function declineAllCookies(value, key, map) {
  let category = value
  category.hasConsented = false
  category.cookies = category.cookies.map(e => {
    return { ...e, hasConsented: false}
  })
  map.set(key, { ...category, hasConsented: false })
}
</script>

<style>

::-webkit-scrollbar {
  @apply w-[1px]
}

/* Track */
::-webkit-scrollbar-track {
  @apply bg-gray-100
}

/* Handle */
::-webkit-scrollbar-thumb {
  @apply bg-gray-200 rounded-full
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

</style>
