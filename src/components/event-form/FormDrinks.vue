<template>
    <div>
        <h1 class="font-urw text-3xl text-indigo-700 text-center mb-3">Möchten Sie mit Getränken verpflegt werden?</h1>
        <h2 class="text-xl text-gray-600 text-center">Wir bieten eine Auswahl von Pauschalen</h2>

        <div class="plans py-8 mb-8 flex md:flex-row flex-col md:space-y-0 space-y-4 md:space-x-4">
            <div
                v-for="drink in drinks"
                :key="drink.id"
                @click="pickBreakouts(drink)"
                :class="{'active-selection': selectedDrink.includes(drink)}"
                class="selection-hover w-full bg-white relative shadow-md flex justify-center items-center cursor-pointer transition-all duration-300"
            >
                <div class="description p-4 items-center text-center">
                  <span class="title text-gray-900 block font-semibold mb-1 text-xl">
                      {{ drink.name }}
                  </span>
                    <span class="description text-base text-gray-500 leading-6">
                    {{drink.description}}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import useVuelidate from '@vuelidate/core'

export default {
  name: 'FormDrinks',
    setup() {
        return {
            v$: useVuelidate()
        }
    },
    data() {
        return {
            drinks: [
                {
                    price: 50.00,
                    name: 'Getränkepauschale Fettehenne (6 Stunden) ',
                    description: 'Wasser, Standard Softdrinks (Coca-Cola und Schweppes Produkte), Kaffee, Tee, Radeberger Pils vom Fass, weitere Bier Sorten auch alkoholfrei, je ein Weißwein, Rose und Rotwein zur Auswahl',
                    id: 0
                },
                {
                    price: 80.00,
                    name: 'Getränkepauschale ‚Blaue‘-Schaf (6 Stunden) ',
                    description: 'Wasser, Standard Softdrinks (Coca-Cola und Schweppes Produkte), Kaffee, Tee, Radeberger Pils vom Fass, weitere Bier Sorten auch alkoholfrei, je ein Weißwein, Rose und Rotwein zur Auswahl \n' +
                        '+ 3 Longdrinks, 2 Cocktails, 1 Virgin Cocktail (z.B. Mojito, Esspressotini & Ipanema)\n',
                    id: 1
                }
            ],
            selectedDrink: []
        }
    },
    computed: {
        drinksArray () {
            if (this.selectedDrink !== null) { return this.selectedDrink.map((item) => item.name).toString() } else { return null }
        }
    },
    methods: {
        pickBreakouts (drink) {
            if (this.selectedDrink.includes(drink)) {
                const index = this.selectedDrink.indexOf(drink)
                this.selectedDrink.splice(index, 1)
            } else {
                this.selectedDrink.push(drink)
            }
        },
        submit() {
            this.v$.$touch()
            return new Promise((resolve, reject) => {
                if (!this.v$.$invalid) {
                    resolve({
                        drinks: this.drinksArray
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
