<template>
  <Menu as="nav" class="bg-white shadow sticky top-0 w-full z-20">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex justify-between h-20">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <button
            class="text-gray-400 p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:hidden"
            @click="sidebarOpen = true">
            <span class="sr-only">Open sidebar</span>
            <MenuAlt1Icon class="h-6 w-6" aria-hidden="true"/>
          </button>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/">
              <img class="block lg:hidden h-12 w-auto" src="svg/flower.svg" alt="Kornblume"/>
            </router-link>
            <router-link to="/">
              <img class="hidden lg:block h-8 w-auto" src="svg/logo.svg" alt="Kornblume"/>
            </router-link>
          </div>
          <ul class="hidden sm:ml-6 sm:flex sm:space-x-4 lg:space-x-8 nav-links">
            <li v-for="item in navigation" :key="item.name" :class="[item.active ? 'border-primary-500 text-gray-700': 'border-transparent', 'border-b-2 hover:border-primary-500 hover:text-gray-700 text-gray-500 inline-flex items-center px-1 pt-1 text-sm font-medium']" class="">
              <router-link :to="'/#' + item.href">
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </div>
        <div
          class="absolute space-x-4 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <a class="my-auto mx-1 md:block hidden" href="https://www.instagram.com/kristallhotelfettehenne/">
            <div
              class="h-8 w-8 bg-gray-300 shadow-xl flex justify-center items-center rounded insta-hover transition transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-instagram" width="30"
                   height="30" viewBox="0 0 24 24" stroke-width="0.75" stroke="#0F0F0F" fill="white"
                   stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <rect x="4" y="4" width="16" height="16" rx="4"></rect>
                <circle cx="12" cy="12" r="3"></circle>
                <line x1="16.5" y1="7.5" x2="16.5" y2="7.501"></line>
              </svg>
            </div>
          </a>
          <a class="my-auto mx-1 md:block hidden" href="https://www.facebook.com/kristallhotelfettehenne">
            <div
              class="h-8 w-8 bg-gray-300 shadow-xl flex justify-center items-center rounded fb-hover transition transition duration-300">
              <svg class="h-6 w-auto" xmlns="http://www.w3.org/2000/svg" width="20" height="32" viewBox="0 0 20 32"
                   fill="white">
                <path
                  d="M0.666664 12.6667V19.3334H5.66666V31.0001H12.3333V19.3334H17.3333L19 12.6667H12.3333V9.33339C12.3333 8.89137 12.5089 8.46744 12.8215 8.15488C13.134 7.84232 13.558 7.66673 14 7.66673H19V1.00006H14C11.7899 1.00006 9.67024 1.87803 8.10744 3.44084C6.54464 5.00364 5.66666 7.12326 5.66666 9.33339V12.6667H0.666664Z"
                  stroke="#0F0F0F" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog v-slot="{ close }" as="div" static class="fixed inset-0 flex z-[120] lg:hidden" @close="sidebarOpen = false" :open="sidebarOpen">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
                         enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                         leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75"/>
        </TransitionChild>
        <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                         enter-from="-translate-x-full" enter-to="translate-x-0"
                         leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                         leave-to="-translate-x-full">
          <div class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                             enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100"
                             leave-to="opacity-0">
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  class="ml-1 flex items-center justify-center h-10 w-10 rounded-full outline-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  @click="sidebarOpen = false">
                  <span class="sr-only">Close sidebar</span>
                  <XIcon class="h-6 w-6 text-white" aria-hidden="true"/>
                </button>
              </div>
            </TransitionChild>
            <div class="flex-shrink-0 flex items-center px-4 mt-6">
              <router-link @click="setSidebar(false)" to="/">
                <img class="h-12 w-auto" src="svg/logo.svg" alt="Kornblume"/>
              </router-link>
            </div>
            <nav class="mt-5 flex-shrink-0 h-full divide-gray-500 divide-solid overflow-y-auto font-primary"
                 aria-label="Sidebar">
              <ul class="px-2 space-y-1 nav-links">
                <li @click="setSidebar(false)" v-for="item in navigation" :key="item.name"
                    class="group text-base font-medium rounded-md text-gray-500 hover:text-gray-700 hover:bg-primary-50">
                  <router-link class="flex items-center px-2 py-2" @click="sidebarOpen = false" :to="'/#' + item.href">
                    <component :is="item.icon" class="mr-4 flex-shrink-0 h-6 w-6 text-primary-500"
                               aria-hidden="true"/>
                    {{ item.name }}
                  </router-link>
                </li>
              </ul>
              <div class="mt-2 pt-2">
                <div class="px-2 space-y-1">
                  <a href="tel:+49210413830"
                     class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-500 hover:text-gray-700 hover:bg-primary-50">
                    <PhoneIcon class="mr-4 flex-shrink-0 h-6 w-6 text-primary-500" aria-hidden="true"/>
                    <p>+49 2104 13830</p>
                  </a>
                  <a href="mailto:fha@fettehennehotels.de"
                     class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-500 hover:text-gray-700 hover:bg-primary-50">
                    <MailIcon class="mr-4 flex-shrink-0 h-6 w-6 text-primary-500" aria-hidden="true"/>
                    <p>fha@fettehennehotels.de</p>
                  </a>
                  <a href="https://www.instagram.com/wearefettehenne/"
                     class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-500 hover:text-gray-700 hover:bg-primary-50">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         class="mr-4 flex-shrink-0 h-6 w-6  stroke-current text-primary-500" width="44"
                         height="44" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke-linecap="round"
                         stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z"/>
                      <rect x="4" y="4" width="16" height="16" rx="4"/>
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M16.5 7.5v.001"/>
                    </svg>
                    <p>Instagram</p>
                  </a>
                  <a href="https://www.facebook.com/GartenhotelFettehenne"
                     class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-500 hover:text-gray-700 hover:bg-primary-50">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         class="mr-4 flex-shrink-0 h-6 w-6 stroke-current text-primary-500" width="44" height="44"
                         viewBox="0 0 24 24" stroke-width="2" fill="none" stroke-linecap="round"
                         stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"/>
                    </svg>
                    <p>Facebook</p>
                  </a>
                </div>
              </div>
              <div class="px-2 mt-8 space-y-4 text-center">
                <router-link @click="setSidebar(false)" to="/#reservation"
                   class="uppercase block text-center w-full px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400">
                  Reservieren
                </router-link>
              </div>
            </nav>
          </div>
        </TransitionChild>
        <div class="flex-shrink-0 w-14" aria-hidden="true"></div>
      </Dialog>
    </TransitionRoot>
  </Menu>
</template>

<script setup>
import { ref, defineComponent, h } from 'vue'
import {
  Dialog,
  DialogOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'

import {
  MenuIcon,
  XIcon,
  BellIcon,
  MenuAlt1Icon,
  PhoneIcon,
  MailIcon,
  InformationCircleIcon
} from '@heroicons/vue/outline'

const props = defineProps(['navigation'])
const sidebarOpen = ref(false)
const setSidebar = (value) => {
  sidebarOpen.value = value
}

</script>

<style>

.insta-hover:hover {
  background: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d);
}

.fb-hover:hover {
  background-color: #3b5998;
}

</style>
