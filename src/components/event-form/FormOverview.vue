<template>
    <div>
        <h1 class="font-berringer text-3xl text-primary-700 text-center mb-3">Übersicht</h1>
        <h2 class="text-xl text-gray-600 text-center">
            Auf Basis dieser Daten werden wir Ihnen ein passendes Angebot erstellen!
        </h2>
        <div class="summary bg-white p-6 mt-6 shadow-lg mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="col-span-1">
                <div>
                    <h1 class="font-berringer text-primary-700">Kontaktdaten</h1>
                    <div class="space-y-1">
                        <p>{{ wizardData.name }}</p>
                        <p v-if="wizardData.company">{{ wizardData.company }}</p>
                        <p>{{ wizardData.street }}</p>
                        <p>{{ wizardData.plz }} {{ wizardData.city }}</p>
                        <p>{{ wizardData.email }}</p>
                        <p>{{ wizardData.phone }}</p>
                    </div>
                </div>
            </div>
            <div class="col-span-1">
                <h1 class="font-berringer text-primary-700 text-xl font-semibold mb-1">Raum</h1>
                <div class="flex flex-col">
                    <p>{{ wizardData.typename }}</p>
                    <p>{{ wizardData.typepax }} Personen</p>
                </div>
            </div>
            <div class="col-span-1">
                <h1 class="font-berringer text-primary-700 text-xl font-semibold mb-1">Datum & Uhrzeit</h1>
                <div class="">
                    <p>{{ wizardData.startdate }} Uhr - {{ wizardData.enddate }} Uhr</p>
                </div>
            </div>
            <!--
            <div class="col-span-1">
                <h1 class="font-berringer text-primary-700 text-xl font-semibold mb-1">Pausenverpflegung</h1>
                <div class="flex flex-col">
                    <p>{{ wizardData.breakout }}</p>
                </div>
            </div>

            <div class="col-span-1">
                <h1 class="font-berringer text-primary-700 text-xl font-semibold mb-1">Getränke</h1>
                <div class="flex flex-col">
                    <p>{{ wizardData.drinks }}</p>
                </div>
            </div>-->
            <div class="col-span-1">
                <h1 class="font-berringer text-primary-700 text-xl font-semibold mb-1">Essen</h1>
                <div class="flex flex-col">
                    <p>{{ wizardData.food }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FormOverview',
    props: {
        wizardData: {
            type: Object,
            required: true
        },
    },
    methods: {
        submit() {
            return Promise.resolve({})
        }
    }
}
</script>

<style scoped>

</style>
