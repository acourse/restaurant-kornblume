<template>
  <div class="bg-white">
    <div class="pt-24 pb-40 md:pt-40">
      <div class="container px-4 mx-auto">
        <div class="flex flex-wrap items-center -mx-4">
          <div class="w-full lg:w-1/2 px-4 mb-24 lg:mb-0">
            <div class="max-w-md mx-auto">
              <h1 class="font-heading text-5xl sm:text-6xl mb-8">Unsere kulinarische Reise</h1>
              <p class="max-w-sm font-light text-xl mb-8">Die Kornblume steht für Treue und Hoffnung. So möchten wir uns mit dem Kristallhotel für Rheindorf bekennen und sind voller Vorfreude mit der Kornblume wieder Leben ins Hotel Kristall und nach Rheindorf zu bringen. </p>
              <p class="font-light text-gray-600 mb-20">Zudem stammt die tolle Blüte aus dem Balkan, ähnlich wie unsere Vorbesitzer.</p>
              <a class="inline-block w-full sm:w-auto px-7 py-4 text-center font-medium bg-primary-500 hover:bg-primary-600 text-white transition duration-250" href="#">Jetzt reservieren</a>
            </div>
          </div>
          <div class="w-full lg:w-1/2 px-4">
            <div class="max-w-md mx-auto relative">
              <img class="block mx-auto pb-12" src="/img/restaurant/diningroom_1.jpg" alt="">
              <img class="absolute bottom-0 left-0 md:-ml-8 -mb-32 h-48" src="/img/restaurant/bar_1.jpg" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="mx-auto max-w-7xl pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <TabGroup :defaultIndex="1" as="div" class="h-full">
          <TabList as="nav" class="grid sm:grid-cols-3 grid-cols-2 items-center justify-center border-b-2 border-gray-200">
            <Tab
                v-for="category in categories"
                as="template"
                :key="category"
                v-slot="{ selected }"
                class="-mb-px"
            >
              <button :class="[selected ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-700 hover:gray-900 hover:border-gray-300', 'py-4 px-1 text-center border-b-2 font-medium text-sm outline-none']">{{ category.name }}</button>
            </Tab>
          </TabList>
          <TabPanels class="lg:min-h-[20rem]">
            <TabPanel
                v-for="category in categories"
                :key="category"
            >
              <ul class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 py-4">
                <li
                    v-for="item in category.featured"
                    :key="item.id"
                    :class="item.headline ? 'lg:col-span-3 sm:col-span-2 col-span-1 pt-4 px-4' : 'p-4', 'relative'"
                >
                  <h1 v-if="item.headline" class="text-xl text-primary-500 font-berringer">{{ item.header }}</h1>
                  <div v-else class="cursor-pointer flex flex-row items-start justify-between space-x-4">
                    <div class="">
                      <h1 class="font-bold text-gray-700 font-berringer">{{ item.title }}</h1>
                      <p class="text-gray-500 text-sm font-berringer">{{ item.description }}</p>
                    </div>
                    <div class="flex items-end ">
                      <h1 class="text-primary-800 text-sm font-berringer">{{ item.price }}</h1>
                    </div>
                  </div>
                </li>
              </ul>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { ref } from 'vue'
const categories = ref([
  {
    name: "Vorspeise",
    featured: [
      {
        id: 1,
        headline: false,
        header: "",
        title: "Zwiebelsuppe",
        description: "Mit Käse überbacken und Croutons",
        price: "5.40"
      },
      {
        id: 2,
        headline: false,
        header: "",
        title: "Tomatencreme Suppe",
        description: "mit Tomate, Knoblauch und Olivenöl",
        price: "5.40"
      },
      {
        id: 3,
        headline: false,
        header: "",
        title: "Ziegenkäse",
        description: "überbacken mit Honigmarinade und Pinienkernen ",
        price: "10.50"
      },
      {
        id: 4,
        headline: false,
        header: "",
        title: "Chili Garnelen",
        description: "in Chili-Sahne-Kräuter-Sauce",
        price: "13.80"
      },
      {
        id: 5,
        headline: false,
        header: "",
        title: "Knoblauch Garnelen",
        description: "",
        price: "13.80"
      },
      {
        id: 6,
        headline: false,
        header: "",
        title: "Bruschetta Romana",
        description: "mit Tomate, Knoblauch und Olivenöl",
        price: "13.50"
      }
    ]
  },
  {
    name: "Hauptgerichte",
    featured: [
      {
        id: 7,
        headline: false,
        header: "",
        title: "FETTEHENNE Tellerer (2 PAX))",
        description: "Kleines Hacksteak, Rumpsteak, Schweinemedaillons, Hähnchen und Speck dazu Pommes, Gemüsereis und Salat",
        price: "19.50/32.00"
      },
      {
        id: 8,
        headline: false,
        header: "",
        title: "Schnitzel Wiener Art",
        description: "dazu Pommes und Salat",
        price: "13.50"
      },
      {
        id: 9,
        headline: false,
        header: "",
        title: "Pfefferschnitzel",
        description: "mit Pfeffersauce dazu Pommes und Salat",
        price: "14.80"
      },
      {
        id: 10,
        headline: false,
        header: "",
        title: "Hackbraten",
        description: "mit Bratkartoffeln und Salat",
        price: "13.80"
      },
      {
        id: 11,
        headline: false,
        header: "",
        title: "Fettuccine mit Lachs",
        description: "Frische Fettuccine in einer Hummer-Sahne-Sauce und Lachswürfeln ",
        price: "13.80"
      },
      {
        id: 12,
        headline: false,
        header: "",
        title: "Rumpsteak",
        description: "mit Pfefferrahmsauce, dazu Bratkartoffeln und Salat",
        price: "28.50"
      },
      {
        id: 13,
        headline: false,
        header: "",
        title: "Rotbarschfilet",
        description: "mit einer Senf-Sahne-Sauce, dazu Salzkartoffeln und Salat ",
        price: "18.50"
      },
      {
        id: 14,
        headline: false,
        header: "",
        title: "Kalbsleber",
        description: "mit Bratkartoffeln, Röstzwiebeln und Salat",
        price: "17.50"
      },
      {
        id: 15,
        headline: false,
        header: "",
        title: "Schweinemedaillons",
        description: "mit Pfeffersauce oder Champignonsauce, dazu Kroketten und Salat",
        price: "17.80"
      },
      {
        id: 16,
        headline: false,
        header: "",
        title: "Cordon Bleu",
        description: "gefüllt mit Käse und Schinken, dazu Pommes und Salat",
        price: "17.80"
      },
      {
        id: 17,
        headline: false,
        header: "",
        title: "Hähnchenbrustfilet",
        description: "Mit Pfirsich und Käse überbacken, dazu Kroketten und Salat",
        price: "15.50"
      },
      {
        id: 18,
        headline: false,
        header: "",
        title: "Fettuccine Kristall",
        description: "Mit Garnelen in einer Knoblauch-Sahne-Sauce, mit Kräutern und Käse überbacken ",
        price: "15.80"
      },
      {
        id: 19,
        headline: false,
        header: "",
        title: "Lachsfilet vom Grill",
        description: "mit Salzkartoffeln, Brokkoli und Zitronen-Hollandaise, dazu Salat ",
        price: "21.50"
      },
      {
        id: 20,
        headline: false,
        header: "",
        title: "Pfefferspieß",
        description: "mit Bratkartoffeln und Salat",
        price: "21.50"
      }
    ]
  },
  {
    name: "Dessert",
    featured: [
      {
        id: 21,
        headline: true,
        header: "Dessert Kiste 7€",
        title: "",
        description: "",
        price: ""
      },
      {
        id: 22,
        headline: false,
        header: "",
        title: "Schokomousse",
        description: "mit Butterkeksen und einer Rumkirsche",
        price: ""
      },
      {
        id: 23,
        headline: false,
        header: "",
        title: "Lukkulusbecher",
        description: "mit Preiselbeeren und Schokostäbchen",
        price: ""
      },
      {
        id: 24,
        headline: false,
        header: "",
        title: "Eisselektion",
        description: "mit Sahne und Schokostäbchen",
        price: ""
      }
    ]
  }
])

</script>

<style scoped>

</style>
