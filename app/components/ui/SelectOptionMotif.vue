<template>
    <div class="relative w-full" :id="props.id">
        <label>{{props.title}}</label>    
        <button type="button"
                @click="open = !open"
                class="flex w-full items-center gap-3 rounded-lg border px-4 py-2 bg-white">
                <img   v-if="props.selectedMotif && props.selectedMotif !== FlowerMotifEnum.NONE"
                 :src="motifImages[`/assets/images/motifs/${props.selectedMotif}.webp`]" alt="">
            <span> {{ props.selectedMotif? translateMotifEnum(props.selectedMotif)  : 'Choisir un motif' }}</span>
        </button>


        <div v-if="open" 
                class="absolute z-10 mt-2 max-h-60 w-full overflow-y-auto rounded-lg border bg-white shadow scrollbar-thin">
            
                <div v-for="item in tableFlowerMotif"
                :key="item"
                @click="selectOption(item)"

                class="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-100">
                
                <img :src="motifImages[`/assets/images/motifs/${item}.webp`]" alt="">

                <span>{{ translateMotifEnum(item)  }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FlowerMotifEnum } from '~/enum/flowerMotifEnum';
const props = defineProps({
    title: String,
    selectedMotif: String,
    id: String
});


const open = ref(false)

const tableFlowerMotif: FlowerMotifEnum[] = Object.values(FlowerMotifEnum)


const emit = defineEmits<{
    chooseOption: [item: string]
}>()

const motifImages = import.meta.glob<string>(
  '~/assets/images/motifs/*.webp',
  {
    eager: true,
    import: 'default'
  }
)

const handleClickOutside = (event: MouseEvent) => {
    const element = document.getElementById(props.id ?? '')

    if (element && !element.contains(event.target as Node)) {
        open.value = false
    }
}

const selectOption = (item: string) => {
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