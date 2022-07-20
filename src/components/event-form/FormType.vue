<template>
    <div>
        <h1 class="font-berringer text-3xl text-primary-700 text-center mb-3">Was möchten Sie gerne bei uns feiern?</h1>
        <h2 class="text-xl text-gray-500 text-center">
            Wie viele Personen sind Sie?
        </h2>
        <div class="plans py-12 mb-8 flex flex-col max-w-sm mx-auto space-y-4">
            <div
                v-for="(type, index) in types"
                :key="index"
                class=""
            >
                <div @click="pickType(type)" :class="{'active-selection': selectedType === type}"
                     class="selection-hover bg-white w-auto relative shadow-md flex justify-center items-center cursor-pointer transition-all duration-300">
                    <div class="description p-4 items-center text-center space-y-2">
                        <div class="text-gray-900 block font-semibold font-primary text-3xl">{{ type.name }}</div>
                        <div class="description text-base text-gray-500 leading-6">{{ type.description }}</div>
                    </div>
                </div>
                <div class="pt-0.5 relative" v-if="selectedType === type">
                    <div class="relative">
                        <input v-model="selectedType.pax" type="number" placeholder="Anzahl" min="0"
                               class="block w-full text-base text-gray-700 shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-primary-300 focus:border-primary-300 border-gray-300 pl-24">
                        <div class="absolute inset-0 right-auto flex items-center pointer-events-none">
                            <span class="text-base text-gray-500 font-medium px-3">Personen</span>
                        </div>
                    </div>
                    <div
                        v-for="error in v$.selectedType.pax.$errors"
                        :key="error.$uid"
                        class="error"
                    >
                        {{ error.$message }}
                    </div>
                </div>
            </div>
        </div>
        <div v-if="v$.selectedType.$error" class="error">Bitte mindestens eine Option wählen!</div>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import {required, helpers, minValue, maxValue} from '@vuelidate/validators'

export default {
    name: 'FormType',
    props: {
        wizardData: {
            type: Object,
            required: true
        }
    },
    setup() {
        return {
            v$: useVuelidate()
        }
    },
    data() {
        return {
            types: [
                {
                    name: 'Hochzeit',
                    pax: '',
                    description: ''
                },
                {
                    name: 'Party',
                    pax: '',
                    description: ''
                },
                {
                    name: 'Geburtstag',
                    pax: '',
                    description: ''
                },
                {
                    name: 'Beerdigung',
                    pax: '',
                    description: ''
                },
                {
                    name: 'Sonstiger Anlass',
                    pax: '',
                    description: ''
                }
            ],
            selectedType: []
        }
    },
    validations() {
        return {
            selectedType: {
                required,
                pax: {
                    required: helpers.withMessage('Bitte eine Anzahl von Teilnehmern angeben!', required),
                    minValue: helpers.withMessage('Bitte eine Anzahl mit mehr als einer Person angeben!', minValue(1)),
                    maxValue: helpers.withMessage('Maximal 100 Leute passen in diese Räume!', maxValue(100))
                }
            }
        }
    },
    methods: {
        pickType(type) {
            this.selectedType = type
        },
        submit() {
            this.v$.$touch()
            return new Promise((resolve, reject) => {
                if (!this.v$.$invalid) {
                    resolve({
                        typename: this.selectedType.name,
                        typepax: this.selectedType.pax
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
