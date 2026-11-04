<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-500/80 z-10 ">
    <div class="bg-white rounded shadow w-[98%] lg:w-[60%]">
        <div class="flex gap-2 items-center justify-between bg-background text-pink p-4">
            <h1>{{ title }}</h1>
            <ClientOnly>
            <Icon name="ic:baseline-cancel" 
                    size="24"
                    @click="close"/>
            </ClientOnly>   
        </div>
        <form @submit.prevent="send" v-if="!showResult">
            <div class="flex flex-col gap-2 p-4">

                <UiSelectOptions  title="fleure"
                column="image"
                id="select1"
                :disabled="false"
                :selectedOption="selectedFlower" 
                :table="flowers"
                @chooseOption="selectFlower"/>


                <UiSelectOptionMotif :selectedMotif="motif"
                    id="select2"
                    title="Motif"
                    @chooseOption="selectMotif"/>

                    <div class="flex">
                        <UiSelectOptionColor :colors="colors" 
                                         :selectedColor="color1"
                                         id="select3"
                                         title="Couleur principale"
                                         @chooseOption="selectColor1"/>
                    
                        <UiSelectOptionColor :colors="colors" 
                             v-if="showColor2()"
                            :selectedColor="color2"
                            id="select4"
                            title="Couleur secondaire"
                            @chooseOption="selectColor2"/>

                    </div>

                    
                    <div class="text-center">
                  <button type="submit" class="bg-background text-pink p-4 rounded-lg font-bold">Simuler</button>
                </div>
                </div>
        </form>
     
        <div v-else class="p-2.5">
            <h2 class="text-center mt-4">Obtenir la couleur {{ color1?.name }} sur la fleure {{ selectedFlower?.name }}</h2>
            <div v-for="value in resultFlower" class="flex justify-center items-center gap-8">
                <h2 class="text-xs">{{value.title.charAt(0)}} </h2>
                <div>
                    <div v-if="!value.error" class="flex gap-4 justify-center mt-4">
                        <div>
                            <div class="flex items-center gap-2">
                                <img :src="value.flower1?.image" class="w-7.5 h-7.5 object-contain" alt="">
                                
                                <div class="relative">
                                    <div  :style="{ backgroundColor: value.color1?.color1.color }"
                                             class="border w-7.5 h-7.5 rounded-full text-center flex justify-center items-center">
                                        <p v-if="!value.color1" class="mt-1">?</p>
                                    </div>

                                    <img :src="motifImages[`/assets/images/motifs/${value.color1?.motif}.webp`]" 
                                    class="border rounded-full w-3.75 absolute -top-0.75 -right-0.75"
                                    v-if="value.color1?.motif !== 'NONE'">
                                </div>
                            </div>
                            <p class="text-sm text-right">{{ value.color1?.color1.name }}</p>
                        </div>
                        
                        <div class="text-4xl">+</div>

                        <div>
                            <div class="flex items-center gap-2">
                                <img :src="value.flower2?.image" class="w-7.5 h-7.5 object-contain" alt="">
                                <div class="relative"> 
                                    <div  :style="{ backgroundColor: value.color2?value.color2.color1.color: 'white' }"
                                            class="border w-7.5 h-7.5 rounded-full text-center flex justify-center items-center">
                                    <p class="mt-1" v-if="!value.color2" >?</p>
                                    </div>
                                </div>
                            </div>
                            <p class="text-sm text-right">{{ value.color2? value.color2.color1.name : 'Couleur libre'  }}</p>
                        </div>

                        <div class="text-4xl">=</div>

                        <div>
                            <div class="flex items-center gap-2">
                                <img :src="value.resultFlower?.image" class="w-7.5 h-7.5 object-contain" alt="">
                                <div  :style="{ backgroundColor: value.resultColor?.color }"
                                class="border w-7.5 h-7.5 rounded-full">
                                </div>
                            </div>
                            <p class="text-sm text-right">{{ value.resultColor?.name }}</p>
                        </div>
                        
                    </div>
                    <div v-else>
                       <p class="text-center"> {{ value.error }}</p>
                    </div>
                </div>
            </div>
                <p class="mt-4">T = Transfère, M = Mélange</p>
        </div>
    </div>
</div>
</template>
<script lang="ts" setup>
import type { DefaultColorsDto } from '~/interfaces/default-colors.dto';
import type { FlowerUserDto } from '~/interfaces/flower-user.dto';
import type { FlowerDto } from '~/interfaces/flower.dto';
import type { ResultSimulatorFlowersDto } from '~/interfaces/result-simulator-flowers.dto';

const props = defineProps({
    title: String,
    flower: Object as PropType<FlowerUserDto>,
    searchColor: Object as PropType<DefaultColorsDto>
  });

const emit = defineEmits(['closeModal']);
const colors = ref<DefaultColorsDto[]>([])
const color1 = ref<DefaultColorsDto>()
const color2 = ref<DefaultColorsDto>()
const motif = ref()
const selectedFlower = ref<FlowerDto>()
const showResult = ref(false);
const flowers = ref<FlowerDto[]>([])
const flowersUser = ref<FlowerUserDto[]>([])
const resultFlower = ref<ResultSimulatorFlowersDto[]>([])

const showColor2 = () => {
   return canHaveColor2(motif.value)
}

const motifImages = import.meta.glob<string>(
  '~/assets/images/motifs/*.webp',
  {
    eager: true,
    import: 'default'
  }
)

const selectColor1= (color:DefaultColorsDto) => {
  color1.value = color
}

const selectColor2= (color:DefaultColorsDto) => {
  color2.value = color
}

const selectMotif= (element:string) => {
  motif.value = element
}

const selectFlower = (flower: FlowerDto)=> {
  selectedFlower.value = flower;
}

const close = () => {
      emit('closeModal');
}

const send = () => {
    if(!selectedFlower.value){
        return
    }

    const indexFlowerUser = flowersUser.value.findIndex((element: FlowerUserDto)=> element.flower.id === selectedFlower.value?.id)
    let flowerUser: FlowerUserDto | undefined= flowersUser.value[indexFlowerUser]

    if(!motif.value || motif.value === 'NONE'){
        getMixSteps(color1.value!.name,flowerUser!, resultFlower.value, colors.value, flowersUser.value )               
    }

    showResult.value=true
}


onMounted(async () => {
    console.warn(props.flower)
    console.warn(props.searchColor)
    if(props.flower && props.searchColor){
        selectedFlower.value = props.flower.flower
        color1.value = props.searchColor
        
    }
   colors.value = await $fetch<DefaultColorsDto[]>(`/api/default-color/all`)
   flowersUser.value = await $fetch<FlowerUserDto[]>(`/api/flower-user/all`)
   flowers.value = flowersUser.value.map(element => element.flower)
})

</script>