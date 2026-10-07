<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script lang="ts" setup>

const auth = useAuthStore()
await auth.fetchUser()
</script>