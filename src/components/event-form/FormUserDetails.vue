<template>
  <div>
      <h1 class="font-berringer text-3xl text-gray-900 text-center mb-3">Ihre Kontaktdaten</h1>
      <h2 class="text-xl text-gray-600 text-center">
          Wir senden Ihnen ein passendes Angebot!
      </h2>
    <div class="py-12 px-4 sm:px-6 lg:col-span-3 lg:px-8 xl:pl-12">
      <div class="max-w-lg mx-auto lg:max-w-none bg-white p-8 shadow-lg">
        <form class="grid grid-cols-1 gap-y-6">
          <div class="">
            <label class="block font-berringer font-medium text-gray-500" for="name">Name</label>
            <input v-model="v$.form.name.$model" type="text" placeholder="Name" autocomplete="name" class="py-3 px-4 block w-full shadow-sm focus:ring-accent-500 focus:border-accent-500 border-gray-300" id="name">
            <div v-for="error of v$.form.name.$errors" :key="error.$uid" class="error">{{ error.$message }}</div>
          </div>
          <div class="">
            <label class="block font-berringer font-medium text-gray-500" for="company">Unternehmen</label>
            <input v-model="v$.form.company.$model" type="text" placeholder="Unternehmen" autocomplete="organization" class="py-3 px-4 block w-full shadow-sm focus:ring-accent-500 focus:border-accent-500 border-gray-300" id="company">
          </div>
          <div class="">
            <label class="block font-berringer font-medium text-gray-500" for="email">Email</label>
            <input type="text" v-model="v$.form.email.$model" placeholder="beispiel@email.com" autocomplete="email" class="py-3 px-4 block w-full shadow-sm focus:ring-accent-500 focus:border-accent-500 border-gray-300" id="email">
            <div v-for="error of v$.form.email.$errors" :key="error.$uid" class="error">{{ error.$message }}</div>
          </div>
            <div class="">
                <label class="block font-berringer font-medium text-gray-500" for="phone">Telefon</label>
                <input type="text" v-model="v$.form.phone.$model" placeholder="beispiel@email.com" autocomplete="tel" class="py-3 px-4 block w-full shadow-sm focus:ring-accent-500 focus:border-accent-500 border-gray-300" id="phone">
                <div v-for="error of v$.form.phone.$errors" :key="error.$uid" class="error">{{ error.$message }}</div>
            </div>
            <div class="flex flex-row">
                <label class="font-berringer font-medium text-gray-500 pr-2" >Videokonferenz geplant?</label>
                <input type="checkbox" v-model="v$.form.videoconferenceIsRequired.$model" class="py-2 px-2 block my-auto shadow-sm text-accent-600 focus:ring-accent-500 focus:border-accent-500 border-gray-300" >
                <div v-for="error of v$.form.videoconferenceIsRequired.$errors" :key="error.$uid" class="error">{{ error.$message }}</div>
            </div>
            <div>
                <div class="flex flex-row pb-1">
                    <label class="font-berringer font-medium text-gray-500 pr-2">Zimmer erwünscht?</label>
                    <input type="checkbox" v-model="roomsRequired" class="py-2 px-2 block my-auto shadow-sm text-accent-600 focus:ring-accent-500 focus:border-accent-500 border-gray-300" >
                </div>
                <div class="" v-if="roomsRequired" >
                    <div class="relative ">
                        <input v-model="v$.form.roomsAmount.$model" type="number" placeholder="Anzahl"
                               min="0"
                               class="block w-full text-base text-gray-700 shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-accent-500 focus:border-accent-500 border-gray-300 pl-20">
                        <div class="absolute inset-0 right-auto flex items-center pointer-events-none">
                            <span class="text-base text-gray-500 font-medium px-3">Zimmer</span>
                        </div>
                    </div>
                    <div
                        v-for="error in v$.form.roomsAmount.$errors"
                        :key="error.$uid"
                        class="error"
                    >
                        {{ error.$message }}
                    </div>
                </div>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, numeric, helpers } from '@vuelidate/validators'

export default {
  name: 'FormUserDetails',
  props: {
    wizardData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
        form: {
            email: '',
            phone: '',
            company: '',
            name: '',
            roomsAmount: null,
            videoconferenceIsRequired: false
        },
        roomsRequired: false,
    }
  },
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  validations () {
    return {
      form: {
        email: {
          required: helpers.withMessage('Bitte das Feld ausfüllen!', required),
          email: helpers.withMessage('E-Mail ist nicht gültig!', email)
        },
          phone: {
              required: helpers.withMessage('Bitte das Feld ausfüllen!', required),
              numberic: helpers.withMessage('Telefonnummer ist nicht gültig!', numeric)
          },
        company: {},
        name: {
          required: helpers.withMessage('Bitte das Feld ausfüllen!', required)
        },
          roomsAmount: {
          },
          videoconferenceIsRequired: {
          }
      }
    }
  },
  methods: {
    submit () {
      this.v$.$touch()
      return new Promise((resolve, reject) => {
        if (!this.v$.$invalid) {
          resolve({
            email: this.form.email,
            phone: this.form.phone,
            company: this.form.company,
            name: this.form.name,
              roomsamount: this.roomsRequired ? this.form.roomsAmount : 0 && this.form.roomsAmount === '' || 0 ? 'Ja' : this.form.roomsAmount,
              videoconference: this.form.videoconferenceIsRequired
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
