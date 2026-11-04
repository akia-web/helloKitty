<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-500/80 z-10 ">
        <div class="bg-white rounded shadow w-[98%] lg:w-[60%]"">
            <div class="flex gap-2 items-center justify-between bg-background text-pink p-4">
                <h1>{{ flower?.flower.name }}</h1>
                <ClientOnly>
                <Icon name="ic:baseline-cancel" 
                        size="24"
                        @click="close"/>
                </ClientOnly>   
            </div>

            <div class="p-2">

                <UiSelectOptionMotif :selectedMotif="motif"
                    id="select2"
                    title="Motif"
                    @chooseOption="selectMotif"/>

            </div>

            <div class="p-2">
                <h2 class="mb-2">Couleur obtenues {{ canHaveColor2(motif)? '(deuxième couleur = blanche)': '' }}</h2>
                <p v-if="colorsObtains.length===0">Aucune couleur</p>
                <div class="flex flex-wrap gap-2">
                    <div v-for="color in colorsObtains">
                        <div :style="{ backgroundColor: color.color1.color, color: getTextColor(color.color1.color) }"
                         class="p-1.5 rounded-xl min-w-25 text-xs flex items-center justify-between"> 
                            <span>{{ color.color1.name }}</span>
                            <ClientOnly>
                                <Icon name="coolicons:circle-close-round" 
                                        size="24"
                                        @click="deleteColor(color)"/>
                            </ClientOnly>  
                        </div>
  
                    </div>
                </div>

                   <h2 class="mb-2 mt-4 text-red-700">Couleur manquantes {{ canHaveColor2(motif)? '(deuxième couleur = blanche)': '' }}</h2>
                                   <div class="flex flex-wrap gap-2">
                    <div v-for="color in colorsMissing">
                        <div :style="{ backgroundColor: color.color, color: getTextColor(color.color) }"
                         class="p-1.5 rounded-xl min-w-25 text-xs flex items-center justify-between"> 
                            <span>{{ color.name }}</span>
                            <ClientOnly>
                                <Icon name="basil:search-solid" 
                                        size="24"
                                        @click="simulateFlower(color)"/>
                            </ClientOnly>  
                        </div>
  
                    </div>
                </div>
                <h2 class="mb-2 mt-4" v-if="canHaveColor2(motif) && otherColors.length>0">Autres couleurs</h2>
                <div class="flex flex-wrap gap-2">
                    <div v-for="color in otherColors">
                        <div class="flex">
                            <div :style="{ backgroundColor: color.color1.color, color: getTextColor(color.color1.color) }"
                                class="p-1.5 rounded-tl-xl rounded-bl-xl text-xs flex items-center justify-between border border-black"> 
                                <span>{{ color.color1.name }}</span>
                            </div>
                            <div :style="{ backgroundColor: color.color2!.color, color: getTextColor(color.color2!.color) }"
                                class="p-1.5 rounded-tr-xl rounded-br-xl text-xs flex items-center justify-between border-t border-b border-r border-black"> 
                                <span class="pr-2">{{ color.color2!.name }}</span>
                                                         <ClientOnly>
                                <Icon name="coolicons:circle-close-round" 
                                        size="24"
                                        @click="deleteColor(color)"/>
                            </ClientOnly> 
                            </div>
                        </div>
  
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>
<script lang="ts" setup>
import { FlowerMotifEnum } from '~/enum/flowerMotifEnum';
import type { DefaultColorsDto } from '~/interfaces/default-colors.dto';
import type { FlowerColorDto } from '~/interfaces/flower-color.dto';
import type { FlowerUserDto } from '~/interfaces/flower-user.dto';


const props = defineProps({
    flower: Object as PropType<FlowerUserDto>,
});

const colorsObtains = ref<FlowerColorDto[]>([])
const allColors = ref<DefaultColorsDto[]>([])
const colorsMissing = ref<DefaultColorsDto[]>([])
const refresh = ref<boolean>(false)
const motif = ref<FlowerMotifEnum>(FlowerMotifEnum.NONE)
const otherColors = ref<FlowerColorDto[]>([])

onMounted(async()=>{
    allColors.value = await $fetch<DefaultColorsDto[]>(`/api/default-color/all`)
    getObtenedAndMissingColorWithMotif(FlowerMotifEnum.NONE)

})


const getObtenedAndMissingColorWithMotif = (motif: FlowerMotifEnum) =>{
    colorsObtains.value.length=0
    colorsMissing.value.length=0
    otherColors.value.length=0

    if(!canHaveColor2(motif)){
        colorsObtains.value = props.flower?.colors.filter(element => element.motif === motif)??[]

        colorsMissing.value = allColors.value.filter(color =>
                !colorsObtains.value.some(
                    obtained => obtained.color1.id === color.id
                )
            )

    }else{
        colorsObtains.value = props.flower?.colors.filter(element => element.motif === motif && element.color2?.name ==='Blanc')??[]
        
        colorsMissing.value = allColors.value.filter(color =>
                !colorsObtains.value.some(
                    obtained => obtained.color1.id === color.id && obtained.color2?.name === 'Blanc'
                )
            )

        otherColors.value = props.flower?.colors.filter(element => element.motif === motif && element.color2?.name !=='Blanc')??[]
        console.warn(otherColors)
    }




}



const selectMotif= (element:FlowerMotifEnum) => {
  motif.value = element
  getObtenedAndMissingColorWithMotif(element)
}


const emit = defineEmits(['closeModal','simulateFlower']);
const close = () => {
  emit('closeModal', refresh.value );
};

const simulateFlower = (color: DefaultColorsDto) => {
    console.warn(color)
    emit('simulateFlower', color );
}

const getTextColor = (hex: string) => {
    const color = hex.replace('#', '')

    const r = parseInt(color.substring(0, 2), 16)
    const g = parseInt(color.substring(2, 4), 16)
    const b = parseInt(color.substring(4, 6), 16)

    const luminosity = (r * 299 + g * 587 + b * 114) / 1000

    return luminosity >= 128 ? '#000000' : '#FFFFFF'
}

const deleteColor=async (color: FlowerColorDto)=>{
        try {
        await $fetch(`/api/flower-color/${color.id}`, {
            method: 'DELETE'
        })

        colorsObtains.value =
            colorsObtains.value.filter(colorA => colorA.id !== color.id)

    } catch (error) {
        console.error(error)
    }

}
</script>