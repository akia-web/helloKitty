<template>
    <div class="relative w-full" :id="props.id">
        <label>{{props.title}}</label>    
        <button type="button"
                @click="open = !open"
                class="flex w-full items-center gap-3 rounded-lg border px-4 py-2 bg-white">
            <div :style="{ backgroundColor: selectedColor?.color }"
                class="h-6.25 w-6.25 rounded-full shadow-sm border">
            </div>
            <span> {{ selectedColor?.name || 'couleur' }}</span>
        </button>


        <div v-if="open" 
                class="absolute z-10 mt-2 max-h-60 w-full overflow-y-auto rounded-lg border bg-white shadow scrollbar-thin">
            
                <div v-for="item in colors"
                :key="item.id"
                @click="selectOption(item)"

                class="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-100">
                
                <div :style="{ backgroundColor: item?.color }"
                    class="h-6.25 w-6.25 rounded-full shadow-sm border">
                </div>

                <span>{{ item.name }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { DefaultColorsDto } from '~/interfaces/default-colors.dto'
const props = defineProps({
    title: String,
    colors: Array as PropType<DefaultColorsDto[]>,
    selectedColor: Object as PropType<DefaultColorsDto>,
    id: String
});


const open = ref(false)


const emit = defineEmits<{
    chooseOption: [item: DefaultColorsDto]
}>()

const handleClickOutside = (event: MouseEvent) => {
    const element = document.getElementById(props.id ?? '')

    if (element && !element.contains(event.target as Node)) {
        open.value = false
    }
}

const selectOption = (item: DefaultColorsDto) => {
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