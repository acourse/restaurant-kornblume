<template>
  <div class="relative pb-12 overflow-hidden pt-12">
    <div class="bg-white h-16 mb-32 sm:mb-52">
      <div class="absolute top-0 left-1/2">
        <div class="w-px h-16 bg-gray-900"></div>
        <div class="w-px h-24 bg-gray-900"></div>
      </div>
    </div>
    <div class="container px-4 mx-auto">
      <div class="max-w-4xl mx-auto text-center mb-32">
        <BaseHeader title="Reservierung" description="Sie können direkt online Ihren Tisch bei uns reservieren!"/>
      </div>
      <div v-if="$consent.hasConsent('functional.theFork')" align="center"><iframe src="https://module.lafourchette.com/de_DE/module/722634-53187" style="width: 100%; min-height:600px; border:none; scrolling:yes;"></iframe></div>
    </div>
  </div>
</template>

<script setup>
import {inject} from "vue";
import BaseHeader from "../reusable/BaseHeader.vue";

const showConsent = inject('toggleShowConsent')

</script>

<style scoped>

</style>
