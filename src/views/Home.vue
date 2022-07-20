<template>
  <div>
    <div>
      <section id="home">
        <Hero/>
      </section>
      <section id="restaurant">
        <Services/>
        <Overview/>
      </section>
      <section id="menu">
        <Menu/>
      </section>
      <section id="events">
        <Events/>
      </section>
      <section id="reservation">
        <Reservation/>
        <Contact/>
      </section>
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
import { inject, onMounted } from "vue";

const navigation = inject('navigation')
onMounted(() => {
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 4) {
        current = section.getAttribute("id");
      }
    });
    navigation.forEach((link) => {
      link.active = false
      if (link.href === current) {
        link.active = true
      }
    })
  })
})

</script>

<style scoped>

</style>
