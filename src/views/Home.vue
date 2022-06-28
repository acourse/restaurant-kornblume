<template>
  <div>
    <div>
      <Hero/>
      <Services/>
      <Overview/>
      <Menu/>
      <Events/>
      <Team/>
      <Reservation/>
      <Contact/>
    </div>
  </div>
</template>

<script setup>
import Hero from "../components/home/Hero.vue";
import Services from "../components/home/Services.vue";
import Overview from "../components/home/Overview.vue";
import Reservation from "../components/home/Reservation.vue";
import Contact from "../components/home/Contact.vue";
import Menu from "../components/home/Menu.vue";
import Team from "../components/home/Team.vue";
import Events from "../components/home/Events.vue";
</script>

<style scoped>

</style>
