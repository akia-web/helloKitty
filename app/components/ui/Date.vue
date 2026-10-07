<template>
  <p class="text-xs">
    {{ formattedDate }}
  </p>
</template>

<script lang="ts" setup>

import { computed } from 'vue';

const props = defineProps({
  date: String
});

const formattedDate = computed(() => {
      if (props.date) {
       return new Intl.DateTimeFormat('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(props.date));
      }
    }
);
</script>