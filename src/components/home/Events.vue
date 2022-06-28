<template>
  <section class="relative pb-24 md:pb-52 overflow-hidden">
    <div class="h-16">
      <div class="absolute top-0 left-1/2">
        <div class="w-px h-16 bg-gray-900"></div>
        <div class="w-px h-20 bg-gray-800"></div>
      </div>
    </div>
    <div class="container px-4 mx-auto">
      <div class="max-w-4xl mx-auto pt-24 sm:pt-40 text-center">
        <h1 class="font-heading text-4xl sm:text-6xl lg:text-7xl mb-10">
          <span class="block leading-none">Events</span>
          <span class="block leading-none">Im Restaurant Kornblume</span>
        </h1>
        <div>
          <span class="inline-flex mb-20 items-center text-black">
            Lorem Ipsum
          </span>
        </div>
      </div>
    </div>
    <FormWizard/>
  </section>
</template>

<script setup>
import FormWizard from "../event-form/FormWizard.vue";

</script>

<style scoped>

</style>
