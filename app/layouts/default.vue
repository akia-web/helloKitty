<template>
  <div class="bg-linear-to-b from-background to-background/70 min-h-screen w-full">
    <header class="hidden md:block sticky top-0 z-50"">
      <div>
        <LayoutAppNavBar />
      </div>
    </header>

    <div class="w-[90%] mx-auto">
      <div class="lg:mt-4 pb-20 pt-4 min-h-[85vh]">
        <NuxtPage/>
      </div>
    </div>

    <LayoutAppNavBarMobile class="md:hidden fixed bottom-0 z-50 w-full"/>
    <Footer class="hidden md:block"/>
  </div>
</template>


<script setup lang="ts">
import Footer from '~/components/Footer.vue';

</script>