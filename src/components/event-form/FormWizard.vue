<template>
    <div class="mx-auto max-w-4xl py-12 mt-12 w-full sm:px-6 px-4">
        <div v-if="wizardInProgress" v-show="asyncState !== 'pending'">
            <keep-alive>
                <component ref="currentStep" :is="currentStep" @updateAsyncState="updateAsyncState" :wizard-data="form"></component>
            </keep-alive>
            <div class="progress-bar w-full rounded-full relative my-4 h-[12px] bg-primary-100">
                <div class="rounded-full absolute h-full bg-primary-500 transition-all duration-300" :style="`width: ${progress}%`"></div>
            </div>
            <div class="buttons flex justify-end space-x-4">
                <PrimaryButton
                    button
                    light
                    title="Zurück"
                    @click="goBack"
                    v-if="currentStepNumber > 1"
                >
                </PrimaryButton>
                <PrimaryButton
                    button
                    solid
                    :title="isLastStep ? 'Anfrage abschicken' : 'Weiter'"
                    @click="nextButtonAction"
                    :class="isLastStep ? 'success' : 'declined'"
                >
                </PrimaryButton>
            </div>
        </div>
        <div v-if="asyncState === 'success'">
            <div class="bg-white py-12 px-4 sm:px-6 lg:col-span-3 lg:px-8 xl:pl-12">
                <div
                    class="max-w-lg mx-auto lg:max-w-none bg-white p-8 shadow-lg flex flex-col justify-center items-center space-y-4">
                    <h1 class="h4 text-center text-cyan-500">Vielen Dank für Ihre Anfrage!</h1>
                    <h2 class="text-xl text-gray-600 text-center">
                        Wir melden uns schnellstmöglich bei dir!
                    </h2>
                    <!--<a href="/"
                       class="sm:block w-full sm:w-auto text-middleblue hover:bg-middleblue hover:text-white px-6 py-2 rounded text-lg border border-middleblue relative transition-all duration-300">Zurück
                        zum Start</a>-->
                    <PrimaryButton @click="backToStart" solid title="Zurück zum Start"></PrimaryButton>
                </div>
            </div>
        </div>
        <div v-if="asyncState === 'error'">
            <div class="bg-white py-12 px-4 sm:px-6 lg:col-span-3 lg:px-8 xl:pl-12">
                <div
                    class="max-w-lg mx-auto lg:max-w-none bg-white p-8 shadow-lg flex flex-col justify-center items-center space-y-4">
                    <h1 class="h4 text-center error">Leider ist etwas schief gelaufen!</h1>
                    <h2 class="text-xl text-gray-600 text-center mb-2">
                        Bitte versuchen Sie es später nochmal!
                    </h2>
                    <!--<a href="/"
                       class="sm:block w-full sm:w-auto text-middleblue hover:bg-middleblue hover:text-white px-6 py-2 rounded text-lg border border-middleblue relative transition-all duration-300">Zurück
                        zum Start</a>-->
                    <PrimaryButton @click="backToStart" solid title="Zurück zum Start"></PrimaryButton>
                </div>
            </div>
        </div>
        <div class="loading-wrapper mt-16" v-if="asyncState === 'pending'">
            <div
                class="loader flex flex-wrap p-2 mx-auto items-center justify-center border border-primary-500 text-xl text-gray-500">
                <img src="/svg/spinner.svg" alt="">
                <p class="mr-4">Wir bearbeiten gerade Ihre Anfrage!</p>
            </div>
        </div>
    </div>
</template>

<script>
import FormType from './FormType.vue'
import FormFood from './FormFood.vue'
import FormOverview from './FormOverview.vue'
import FormUserDetails from './FormUserDetails.vue'
import FormUserAddress from './FormUserAddress.vue'
import emailjs from '@emailjs/browser';
import FormDate from "./FormDate.vue";
import FormStarter from "./FormStarter.vue";
import PrimaryButton from "../reusable/PrimaryButton.vue";
// import FormDrinks from "./FormDrinks";

export default {
    name: 'FormWizard',
    components: {
        PrimaryButton,
        FormType,
        FormFood,
        FormOverview,
        FormUserDetails,
        FormUserAddress,
        FormDate,
        FormStarter
    },
    data() {
        return {
            currentStepNumber: 1,
            asyncState: null,
            steps: [
                'FormType',
                'FormDate',
                'FormStarter',
                'FormFood',
                'FormUserDetails',
                'FormUserAddress',
                'FormOverview'
            ],
            form: {
                typename: null,
                typepax: null,
                startdate: null,
                enddate: null,
                breakout: null,
                food: null,
                drinks: null,
                email: null,
                phone: null,
                company: null,
                name: null,
                street: null,
                plz: null,
                city: null,
                roomsamount: null,
                videoconference: null
            }
        }
    },
    computed: {
        isLastStep() {
            return this.currentStepNumber === this.length
        },
        wizardInProgress() {
            return this.currentStepNumber <= this.length
        },
        length() {
            return this.steps.length
        },
        currentStep() {
            return this.steps[this.currentStepNumber - 1]
        },
        progress() {
            return this.currentStepNumber / this.length * 100
        }
    },

    methods: {
        updateAsyncState(state) {
            this.asyncState = state
        },
        backToStart() {
            this.updateAsyncState()
            this.currentStepNumber = 1
        },
        sendEmail(e) {
            this.asyncState = 'pending'
            try {
                emailjs.send('service_xpoifvi', 'template_31l2pq8', {
                        typename: this.form.typename,
                        typepax: this.form.typepax,
                        startdate: this.form.startdate,
                        enddate: this.form.enddate,
                        breakout: this.form.breakout,
                        food: this.form.food,
                        drinks: this.form.drinks,
                        email: this.form.email,
                        phone: this.form.phone,
                        company: this.form.company,
                        name: this.form.name,
                        street: this.form.street,
                        plz: this.form.plz,
                        city: this.form.city,
                        roomsamount: this.form.roomsamount,
                        videoconference: this.form.videoconference
                    },
                    'RcqJ3aAlLUHrfuioc')
                this.resetForm()
                this.asyncState = 'success'
                this.currentStepNumber++
            } catch (error) {
                console.log({error})
                this.asyncState = 'error'
            }
        },
        resetForm() {
            this.form.typeame = '',
            this.formtypepax = '',
            this.form.startdate = '',
            this.form.enddate = '',
            this.form.breakout = '',
            this.form.food = '',
            this.form.drinks = '',
            this.form.email = '',
            this.form.phone = '',
            this.form.company = '',
            this.form.name = '',
            this.form.street = '',
            this.form.plz = '',
            this.form.city = '',
            this.form.roomsamount = '',
            this.form.videoconference = ''
        },
        nextButtonAction() {
            this.$refs.currentStep.submit()
                .then(stepData => {
                    Object.assign(this.form, stepData)
                    if (this.isLastStep) {
                        this.sendEmail()
                    } else {
                        this.goNext()
                    }
                })
                .catch(error => console.log(error))
        },
        goBack() {
            this.currentStepNumber--
        },
        goNext() {
            this.currentStepNumber++
        }
    }
}
</script>

<style scoped>

</style>
