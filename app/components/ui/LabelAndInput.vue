<template>
    <div class="flex flex-col gap-2 mt-4">
        <label :for="id">{{ label }}</label>
        <input v-model="property" 
            :type="type" 
            :id="id" 
            class="border p-2.5 rounded-lg" 
            :placeholder="placeholder"
            :min="min"
            :max="max">
    </div>
</template>
<script lang="ts" setup>
    const props = defineProps({
    property: String,
    min: String,
    max: String,
    type: String,
    label: String,
    id: String,
    placeholder:String
    });

    const emit = defineEmits(['update:property']);

    const property = computed({
      get: () => props.property,
      set: value => emit('update:property', String(value))
    });
</script>