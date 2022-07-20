<script setup>
defineProps({
    solid: {
        type: Boolean,
        default: false
    },
    medium: {
        type: Boolean,
        default: false
    },
    light: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: 'Weiter'
    },
    size: {
        type: String,
        default: 'px-4 py-2 text-base'
    },
    to: {
        type: String,
        default: '/'
    },
    button: {
        type: Boolean,
        default: false
    }
})

</script>

<template>
    <div>
        <button
            v-if="button"
            :class="[
                solid ? ' shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500' : '',
                medium ? ' text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500' : '',
                light ? ' border border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500' : '',
                size,
                'inline-flex items-center text-center justify-center border border-transparent font-medium sm:w-auto w-full'

            ]"
        >
            {{ title }}
        </button>
        <router-link
            v-else
            :to="to"
            :class="[
                solid ? ' shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500' : '',
                medium ? ' text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500' : '',
                light ? ' border border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500' : '',
                size,
                'inline-flex items-center text-center justify-center border border-transparent font-medium sm:w-auto w-full'

            ]"
        >
            {{ title }}
        </router-link>
    </div>
</template>
