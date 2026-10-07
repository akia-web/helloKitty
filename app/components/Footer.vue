<template>
    <footer >
        <div class="bg-gold text-center p-2 text-xs">
        Version : {{ config.public.appVersion }}
        </div>

  </footer>
</template>
<script lang="ts" setup>
    const config = useRuntimeConfig()
</script>