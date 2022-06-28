<template>
  <div>
      <h1 class="font-berringer text-3xl text-gray-900 text-center mb-3">Ihre Kontaktdaten</h1>
      <h2 class="text-xl text-gray-600 text-center">
          Wir senden Ihnen ein passendes Angebot!
      </h2>
    <div class="py-12 px-4 sm:px-6 lg:col-span-3 lg:px-8 xl:pl-12">
      <div class="max-w-lg mx-auto lg:max-w-none bg-white rounded-md p-8 shadow-lg">
        <form class="grid sm:grid-cols-2 gap-y-6 gap-x-4">
          <div class="sm:col-span-2">
            <label class="block font-berringer font-medium text-gray-500" for="street">Straße</label>
            <input v-model="v$.form.street.$model" type="text" placeholder="Schildsheider Straße 47" autocomplete="street-address" class="py-3 px-4 block w-full shadow-sm focus:ring-accent-500 focus:border-accent-500 border-gray-300" id="street">
            <div v-for="error of v$.form.street.$errors" :key="error.$uid" class="error">{{ error.$message }}</div>
          </div>
          <div class="">
            <label class="block font-berringer font-medium text-gray-500" for="postalcode">PLZ</label>
            <input v-model="v$.form.plz.$model" type="number" autocomplete="postal-code" placeholder="40699" class="py-3 px-4 block w-full shadow-sm focus:ring-accent-500 focus:border-accent-500 border-gray-300" id="postalcode">
            <div v-for="error of v$.form.plz.$errors" :key="error.$uid" class="error">{{ error.$message }}</div>
          </div>
          <div class="">
            <label class="block font-berringer font-medium text-gray-500" for="city">Stadt</label>
            <input type="text" v-model="v$.form.city.$model" placeholder="Erkrath" autocomplete="street-address" class="py-3 px-4 block w-full shadow-sm focus:ring-accent-500 focus:border-accent-500 border-gray-300" id="city">
            <div v-for="error of v$.form.city.$errors" :key="error.$uid" class="error">{{ error.$message }}</div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, maxLength, minLength, helpers } from '@vuelidate/validators'

export default {
  name: 'FormUserAddress',
  props: {
    wizardData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      form: {
        street: null,
        plz: null,
        city: null
      }
    }
  },
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  validations: {
    form: {
      street: {
        required: helpers.withMessage('Bitte das Feld ausfüllen!', required)
      },
      plz: {
        required: helpers.withMessage('Bitte das Feld ausfüllen!', required),
        max: helpers.withMessage('Postleitzahl darf nur 5 Stellen haben!', maxLength(5)),
        min: helpers.withMessage('Postleitzahl darf muss 5 Stellen haben!', minLength(5))
      },
      city: {
        required: helpers.withMessage('Bitte das Feld ausfüllen!', required)
      }
    }
  },
  methods: {
    submit () {
      this.v$.$touch()
      return new Promise((resolve, reject) => {
        if (!this.v$.$invalid) {
          resolve({
            street: this.form.street,
            plz: this.form.plz,
            city: this.form.city
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
