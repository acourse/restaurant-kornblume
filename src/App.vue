<script>
import {defineComponent, h, onMounted, provide, ref, reactive} from "vue";
import Navbar from './layout/Navbar.vue'
import BaseFooter from './layout/BaseFooter.vue'
import AOS from 'aos'
import {CalendarIcon, HomeIcon, InformationCircleIcon, UserGroupIcon} from "@heroicons/vue/outline";
import { loadTheFork } from './components/cookie-consent/cookie-script-loader'
import CookieConsent from "./components/cookie-consent/CookieConsent.vue";
import CookieManager from "./components/cookie-consent/cookie-manager";


export default {
  name: "App",
  components: {CookieConsent, CalendarIcon, HomeIcon, InformationCircleIcon, UserGroupIcon, Navbar, BaseFooter},
  setup() {
    const navigation = ref([
      {
        name: 'Home',
        href: 'home',
        icon: HomeIcon,
        active: false
      },
      {
        name: 'Restaurant',
        href: 'restaurant',
        icon: UserGroupIcon,
        active: false
      },
      {
        name: 'Menü',
        href: 'menu',
        icon: defineComponent({
          render: () =>
              h('svg', {
                fill: 'currentColor',
                viewBox: '0 0 512.002 512.002'
              }, [
                h('path', {
                  d: 'M0 385.44h512.002v54.437H0zM421.034 195.21c-36.232-36.232-82.281-59.07-132.146-66.061a37.756 37.756 0 005.12-19.016c0-20.957-17.05-38.008-38.008-38.008s-38.008 17.05-38.008 38.008a37.766 37.766 0 005.12 19.016c-49.866 6.991-95.915 29.829-132.146 66.061-42.85 42.849-66.971 99.432-68.288 159.818h466.644c-1.317-60.387-25.438-116.969-68.288-159.818z'
                })
              ])
        }),
        active: false
      },
      {
        name: 'Events',
        href: 'events',
        icon: CalendarIcon,
        active: false
      },
      {
        name: 'Kontakt',
        href: 'reservation',
        icon: InformationCircleIcon,
        active: false
      }
    ])
    const proxy = reactive({
      cookieManager: new CookieManager()
    })
    const showConsent = ref(false)
    const toggleShowConsent = () => {
      showConsent.value = !showConsent.value
    }
    provide('toggleShowConsent', toggleShowConsent)
    provide('navigation', navigation.value)

    onMounted(() => {
      AOS.init({
        once: true,
        duration: 500,
        easing: 'ease-out-sine',
      })
    })
    return {
      navigation,
      proxy,
      showConsent,
      toggleShowConsent
    }
  },
  computed: {
    functionalCookie() {
      return this.$consent.hasConsent('functional')
    },
  },
  watch: {
    functionalCookie: {
      handler(newValue, oldValue) {
        if (newValue === true) {
          loadTheFork()
        } else {
          return null
        }
      },
      immediate: true
    }
  }
}


</script>

<template>
  <div>
    <CookieConsent v-show="!$consent.showedConsent || showConsent" @savedConsent="showConsent = false" @close="showConsent = false" :showConsent="showConsent"/>
    <Navbar :navigation="navigation"/>
    <div>
      <router-view></router-view>
    </div>
    <BaseFooter/>
  </div>
</template>

<style>

</style>
