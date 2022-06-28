<template>
    <div>
        <h1 class="font-berringer text-3xl text-gray-900 text-center mb-3">Wie dürfen wir Sie empfangen?</h1>
        <h2 class="text-xl text-gray-600 text-center">
            Wir bieten eine Auswahl an Getränken und Snacks für Sie an!
        </h2>

        <div class="plans py-8 mb-8 flex flex-wrap justify-center max-w-4xl mx-auto">
            <div
                v-for="breakout in breakouts"
                :key="breakout.id"
                @click="pickBreakout(breakout)"
                :class="{'active-selection': selectedBreakout.includes(breakout)}"
                class="selection-hover w-full bg-white relative shadow-md flex justify-center items-center cursor-pointer transition-all duration-300 w-72 m-2"
            >
                <div class="description p-4 items-center text-center">
                  <span class="title text-gray-900 block font-semibold mb-1 text-xl">
                      {{ breakout.name }}
                  </span>
                    <span class="description text-base text-gray-500 leading-6">
                    {{breakout.description}}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import useVuelidate from '@vuelidate/core'

export default {
    name: 'FormBreakout',
    setup() {
        return {
            v$: useVuelidate()
        }
    },
    data() {
        return {
            breakouts: [
                {
                    price: 7.50,
                    name: 'Sektempfang',
                    description: 'inkl. Orangensaft, Mineralwasser, alkoholfreie Aperitifs z.B Hugo 0,0%',
                    id: 0
                },
                {
                    price: 11,
                    name: 'Sektempfang mit Canapeés',
                    description: 'inkl. Orangensaft, Mineralwasser, alkoholfreie Aperitifs z.B Hugo 0,0%, Canapeés nach Absprache',
                    id: 1
                },
                {
                    price: 7.50,
                    name: 'Glühwein Empfang ',
                    description: 'Hausgemachter Glühwein bzw. Kinderpunsch',
                    id: 2
                },
                {
                    price: 6.50,
                    name: 'Heißer Empfang',
                    description: 'Saisonale Suppe zum Selbstbedienen dazu Brot, Butter und Dip',
                    id: 3
                },
                {
                    price: 4.50,
                    name: 'Don’t Call it Tapas – Buffet',
                    description: 'Vorspeisenvariation als Buffet aus der aktuellen Karte dazu Brot, Butter und Dip',
                    id: 4
                },
                {
                    price: 4.50,
                    name: 'Flying Buffet',
                    description: 'Buffet nach Absprache',
                    id: 5
                }
            ],
            selectedBreakout: []
        }
    },
    computed: {
        breakoutArray () {
            if (this.selectedBreakout !== null) { return this.selectedBreakout.map((item) => item.name).toString() } else { return null }
        }
    },
    methods: {
        pickBreakout (breakout) {
            if (this.selectedBreakout.includes(breakout)) {
                const index = this.selectedBreakout.indexOf(breakout)
                this.selectedBreakout.splice(index, 1)
            } else {
                this.selectedBreakout.push(breakout)
            }
        },
        submit() {
            this.v$.$touch()
            return new Promise((resolve, reject) => {
                if (!this.v$.$invalid) {
                    resolve({
                        breakout: this.breakoutArray
                    })
                } else {
                    reject(new Error('Bitte mindestens eine Option wählen!'))
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
