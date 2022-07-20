<template>
  <div class="relative pb-24 md:pb-36 overflow-hidden">
    <div class="h-16">
      <div class="absolute top-0 left-1/2">
        <div class="w-px h-16 bg-gray-900"></div>
        <div class="w-px h-20 bg-gray-800"></div>
      </div>
    </div>
    <div class="container px-4 mx-auto text-gray-700">
      <div class="max-w-4xl mx-auto pt-24 sm:pt-40 text-center">
        <BaseHeader title="Events im Restaurant Kornblume" description="Hochzeit, Geburtstag, Trauerfeier oder privates Event geplant? In unserem Restaurant veranstalten wir gerne jede Art von Event und verpflegen mit leckeren Speisen, Snacks und Getränken. Gerne unterstützen wir Dich bei der Planung Deiner Veranstaltung mit den richtigen Ideen für Gestaltung und Technik sowie Vorschlägen für Menüs und den Snack zwischendurch. Oder Ihr bereitet Eure Verpflegung selbst zu, mit einem unserer Gasgrills für einen tollen Barbecue Abend mit Freunden in unserem Außenbereich. "/>
      </div>
    </div>
    <FormWizard/>
  </div>
</template>

<script setup>
import FormWizard from "../event-form/FormWizard.vue";
import BaseHeader from "../reusable/BaseHeader.vue";

</script>

<style scoped>

</style>
