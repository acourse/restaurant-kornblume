<script setup>
import {onMounted} from "vue";
import Navbar from './layout/Navbar.vue'
import BaseFooter from './layout/BaseFooter.vue'

onMounted(() => {
  AOS.init({
    once: true,
    duration: 500,
    easing: 'ease-out-sine',
  })
})


</script>

<template>
  <div>
    <Navbar/>
    <div>
      <router-view></router-view>
    </div>
    <BaseFooter/>
  </div>
</template>

<style>

</style>
