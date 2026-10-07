<template>
    <div class="flex flex-col">
    <label :for="title">{{title}}</label>
    <textarea :id="title" 
            v-model="message"
    class="border p-1.5 rounded" />
    </div>

</template>

<script lang="ts" setup>

const props = defineProps({
    title: String,
    message: String
})

    const emit = defineEmits(['update:message']);

    const message = computed({
      get: () => props.message,
      set: value => emit('update:message', String(value))
    });
</script>