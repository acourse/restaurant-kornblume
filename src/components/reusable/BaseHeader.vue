<template>
  <div class="max-w-3xl mx-auto text-center pb-12 md:pb-16">
    <h1 class="text-5xl font-berringer text-primary-700 mb-4">{{ title }}</h1>
    <p class="text-xl text-gray-500">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'BaseHeader',
  props: {
    title: {
      type: String,
      default: 'Kristallhotel Fettehenne'
    },
    description: {
      type: String,
      default: 'Fettehenne Lifestyle'
    }
  }
}
</script>

<style scoped>

</style>
