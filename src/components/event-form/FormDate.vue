<template>
    <div>
        <h1 class="font-berringer text-3xl text-gray-900 text-center mb-3">An welchem Datum soll die Feier stattfinden?</h1>
        <h2 class="text-xl text-gray-600 text-center">
            Wir sind durchgehend geöffnet und bieten flexible Zeiten der Buchung an!
        </h2>
        <div class="py-12 mb-8 flex justify-center items-center md:space-y-0 space-y-4 md:space-x-4">
            <v-date-picker class="datepicker" v-model="range" mode="dateTime" :timezone="timezone" is24hr isRange color="blue"/>
        </div>
        <div v-if="v$.range.$error" class="error">Bitte ein Datum wählen!</div>
    </div>
</template>

<script>

import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';

export default {
    name: 'FormDate',
    components: {
        Calendar,
        DatePicker
    },
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
            range: {
                start: new Date(),
                end: new Date(),
            },
            timezone: '',
            options: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
        }
    },
    computed: {
        startToString() {
            return this.range.start.toLocaleDateString('de-DE', this.options)
        },
        endToString() {
            return this.range.end.toLocaleDateString('de-DE', this.options)
        }
    },
    validations: {
        range: {
            start: { required },
            end: { required }
        }
    },
    methods: {
        submit() {
            this.v$.$touch()
            return new Promise((resolve, reject) => {
                if (!this.v$.$invalid) {
                    resolve({
                        startdate: this.startToString,
                        enddate: this.endToString
                    })
                } else {
                    reject(new Error('Bitte mindestens eine Option wählen!'))
                }
            })
        }
    }
}
</script>

<style>
.vc-select {
    position: relative;
}

.vc-select select {
    flex-grow: 1;
    display: block;
    appearance: none;
    width: 60px;
    height: 30px;
    padding: 0 -8px 0 8px;
    cursor: pointer;
    -moz-padding-start: 3px;
}

.vc-select-arrow {
    display: none;
    align-items: center;
    pointer-events: none;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    padding: 0 4px 0 0;
    color: var(--gray-500)
}
.vc-select-arrow svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
}

</style>
