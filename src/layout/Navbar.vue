<template>
  <nav class="relative px-10 py-5 bg-white shadow sticky top-0 z-40">
    <a class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inline-block w-12 h-12" href="#">
      <img src="/src/assets/logo.png" alt="" width="48">
    </a>
    <div class="flex w-full">
      <button class="hidden flex navbar-burger ml-auto items-center justify-center w-14 h-14 rounded-full bg-gray-100 hover:bg-gray-200">
        <svg width="20" height="9" viewbox="0 0 20 9" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="0.75" y1="1.25" x2="19.25" y2="1.25" stroke="black" stroke-width="1.5" stroke-linecap="round"></line><line x1="0.75" y1="8.25" x2="13.25" y2="8.25" stroke="black" stroke-width="1.5" stroke-linecap="round"></line></svg>
      </button>
      <ul class="flex mr-auto items-center">
        <li class="mr-14">
          <a class="inline-flex items-center text-sm text-gray-900 hover:text-gray-700" href="#">
            <span class="mr-4">Collection</span>
            <svg width="12" height="7" viewbox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2L6 6L2 2" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="square" stroke-linejoin="round"></path>
            </svg>
          </a>
        </li>
        <li class="mr-14"><a class="inline-block text-sm text-gray-900 hover:text-gray-700" href="#">Projects</a></li>
        <li class="mr-14"><a class="inline-block text-sm text-gray-900 hover:text-gray-700" href="#">About</a></li>
        <li><a class="inline-block text-sm text-gray-900 hover:text-gray-700" href="#">How to Start</a></li>
      </ul>
      <ul class="flex mr-16 items-center">
        <li class="mr-14"><a class="inline-block text-sm text-gray-900 hover:text-gray-700" href="#">Design</a></li>
        <li><a class="inline-block text-sm text-gray-900 hover:text-gray-700" href="#">Saved (3)</a></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>

</script>

<style scoped>

</style>
