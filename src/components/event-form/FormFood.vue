<template>
    <div>
        <h1 class="font-berringer text-3xl text-gray-900 text-center mb-3">Möchten Sie Mittagessen oder Dinner haben?</h1>
        <h2 class="text-xl text-gray-600 text-center">Wir haben für Sie eine Reihe von Pauschalen!</h2>

        <div class="plans py-8 mb-8 flex flex-wrap justify-center max-w-4xl mx-auto">
            <div
                v-for="food in foods"
                :key="food.id"
                @click="pickBreakouts(food)"
                :class="{'active-selection': selectedFood.includes(food)}"
                class="selection-hover w-full bg-white relative shadow-md flex justify-center items-center cursor-pointer transition-all duration-300 w-96 m-2"
            >
                <div class="description p-4 items-center text-center">
                  <span class="title text-gray-900 block font-semibold mb-1 text-xl">
                      {{ food.name }}
                  </span>
                    <span class="description text-base text-gray-500 leading-6">
                        {{food.description}}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'

export default {
  name: 'FormFood',
    setup() {
        return {
            v$: useVuelidate()
        }
    },
    data() {
        return {
            foods: [
                {
                    price: '',
                    name: 'Menükarte A (bis 25 Personen)',
                    description: 'Brot und Butter //\n' +
                        '\n' +
                        'Suppe & Salat //\n' +
                        '\n' +
                        '1x warmes Gericht //\n' +
                        '\n' +
                        '2x Beilagen //\n' +
                        '\n' +
                        '1x Dessert',
                    id: 0
                },
                {
                    price: '',
                    name: 'Menükarte B (30-40 Personen)',
                    description: 'Brot und Butter //\n' +
                        '\n' +
                        'Suppe & Salat //\n' +
                        '\n' +
                        '1x Finger Food //\n' +
                        '\n' +
                        '2x warme Gerichte //\n' +
                        '\n' +
                        '2x Beilagen //\n' +
                        '\n' +
                        '2x Dessert',
                    id: 1
                },
                {
                    price: '',
                    name: 'Menükarte C (40-50 Personen)',
                    description: 'Brot und Butter & Dip //\n' +
                        '\n' +
                        'Suppe & Salat //\n' +
                        '\n' +
                        '2x Finger Foods //\n' +
                        '\n' +
                        '3x warme Gerichte //\n' +
                        '\n' +
                        '3x Beilagen //\n' +
                        '\n' +
                        '2x Dessert',
                    id: 2
                },
                {
                    price: '',
                    name: 'Menükarte D (50+ Personen)',
                    description: '1 Amuse //\n' +
                        '\n' +
                        'Brot und Butter //\n' +
                        '\n' +
                        'Suppe & Salat //\n' +
                        '\n' +
                        '2x Finger Food //\n' +
                        '\n' +
                        '2x warme Gerichte //\n' +
                        '\n' +
                        '2x Beilagen //\n' +
                        '\n' +
                        '2x Dessert',
                    id: 3
                },
                {
                    price: '',
                    name: 'BBQ Buffet (20-30 Personen)',
                    description: '3x frisch vom Grill //\n' +
                        '\n' +
                        '4x verschiedene Beilagen //\n' +
                        '\n' +
                        '1x Dessert //\n' +
                        '\n' +
                        '+ Ketchup // Senf // Mayonnaise // Pickles // Röstzwiebeln',
                    id: 4
                },
                {
                    price: '',
                    name: 'BBQ Buffet (40-50 Personen)',
                    description: '4x frisch vom Grill //\n' +
                        '\n' +
                        '5x verschiedene Beilagen //\n' +
                        '\n' +
                        '2x Dessert //\n' +
                        '\n' +
                        '+ Ketchup // Senf // Mayonnaise // Pickles // Röstzwiebeln',
                    id: 5
                },
                {
                    price: '',
                    name: 'Brunch Buffet',
                    description: '4x kaltes Buffet //\n' +
                        '\n' +
                        '4x warmes Buffet //\n' +
                        '\n' +
                        '2x Dessert\n',
                    id: 6
                }
            ],
            selectedFood: []
        }
    },
    computed: {
        foodArray () {
            if (this.selectedFood !== null) { return this.selectedFood.map((item) => item.name).toString() } else { return null }
        }
    },
    methods: {
        pickBreakouts (food) {
            if (this.selectedFood.includes(food)) {
                const index = this.selectedFood.indexOf(food)
                this.selectedFood.splice(index, 1)
            } else {
                this.selectedFood.push(food)
            }
        },
        submit() {
            this.v$.$touch()
            return new Promise((resolve, reject) => {
                if (!this.v$.$invalid) {
                    resolve({
                        food: this.foodArray
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
