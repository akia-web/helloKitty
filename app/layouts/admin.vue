<template>
  <div class="bg-linear-to-b from-background to-background/70 min-h-100vh w-full">
    <header class="hidden lg:block sticky top-0 z-50"">
      <div>
        <LayoutAdminNavBar />
      </div>
    </header>

    <div class="w-[90%] mx-auto">
      <div class="lg:mt-4 pt-4 min-h-[85vh]">
        <NuxtPage/>
      </div>
    </div>
    <Footer/>
  </div>
</template>


<script setup lang="ts">
import Footer from '~/components/Footer.vue';

</script>