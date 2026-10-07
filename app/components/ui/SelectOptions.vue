<template>
    <div class="relative w-full" :id="props.id">
        <label>{{props.title}}</label>    
        <button type="button"
                @click="open = !open"
                class="flex w-full items-center gap-3 rounded-lg border px-4 py-2 bg-white">
            <img v-if="selectedOption"
            :src="String(selectedOption[props.column])"
            class="w-5 rounded object-cover"/>

            <span> {{ selectedOption?.name || 'Choisir un item' }}</span>
        </button>


        <div v-if="open" 
                class="absolute z-10 mt-2 max-h-60 w-full overflow-y-auto rounded-lg border bg-white shadow scrollbar-thin">
                <div v-for="item in table"
                :key="item.name"
                @click="selectOption(item)"

                class="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-100">
                
                <img :src="String(item[props.column])"
                class="w-5 rounded object-cover"/>

                <span>{{ item.name }}</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts" generic="T extends { name: string }">

const props = defineProps<{
    title?: string
    id?: string
    selectedOption?: T
    table: T[]
    column: keyof T
}>()

const emit = defineEmits<{
    chooseOption: [item: T]
}>()

const open = ref(false)

const handleClickOutside = (event: MouseEvent) => {
    const element = document.getElementById(props.id ?? '')

    if (element && !element.contains(event.target as Node)) {
        open.value = false
    }
}

const selectOption = (item: T) => {
    emit('chooseOption', item)
    open.value = false
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>