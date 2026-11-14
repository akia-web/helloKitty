<template>
    <h1 class="text-lg text-pink font-bold">Fleurs</h1>
    <div v-if="auth.user"
            class="flex flex-row-reverse reactive">
        <button class="border flex items-center p-2.5 gap-2 bg-white"
                @click="openModal('Ajouter des fleurs')">
                <p>Reglage</p>
                <ClientOnly>
                <Icon name="mdi-light:cog" size="24"/>
                </ClientOnly>          
        </button>
            <button class="border flex items-center p-2.5 gap-2 bg-white"
                @click="openSimulatorModal('Simuler une couleur de fleure')">
                <p>Simuler</p>
                <ClientOnly>
                <Icon name="mdi-light:cog" size="24"/>
                </ClientOnly>          
            </button>
            
                <PopupConfigFlowers v-if="showModal"
                            :title="titleModal"
                            v-model:flowersUser="flowersUserModel"
                            @closeModal="handleCloseModal" />

                <PopupEditColorFlowerUser v-if="showColorModal"
                            :title="titleModal" 
                            :flower="selectedFlower"
                            @closeModal="handleCloseColorModal"/>
                
                <PopupSimulatorFlower v-if="showSimulatorModal"
                            :title="titleModal" 
                            :flower="selectedFlower"
                            :searchColor="searchColor"
                            @closeModal="handleCloseSimultatorModal"/>
                
                <PopupDetailFlower v-if="showFlowerModal"
                            :flower="selectedFlower"
                            :searchColor="searchColor"
                            @closeModal="handleCloseFlowerModal($event)"
                            @simulateFlower="simulateFlower($event)"/>
    </div>




    <SearchBar v-model:elementTable="elementTable"
            :type="auth.user? 'flower-user':'flower'"/>

    <div v-if="elementTable.length===0"
            class="mt-6 flex justify-center ">
        <div class="flex flex-col gap-4">
            <div class="flex items-center gap-4">
                <span class="border rounded-full inline-block w-7.5 text-center h-7.5  p-1.5">1</span> 
                <p class="text-pink">
                    Utilisez le bouton réglage pour afficher les fleurs souhaité
                </p>
            </div>

            <div class="flex items-center gap-4">
                <span class="border rounded-full inline-block w-7.5 text-center h-7.5  p-1.5">2</span> 
                <p class="text-pink">  
                    Cliquez sur le signe + pour rajouter une couleur
                </p>
            </div>
        </div>
        
    </div>

    <div class="grid grid-cols-[repeat(auto-fill,168px)] justify-center gap-4">
            <div v-for="flower in elementTable"
            class="border rounded-lg w-42 bg-white/90 border-gold shadow-md">
            <div  class="relative min-h-17.5 flex items-center justify-around bg-gray-pink rounded-tl-lg rounded-tr-lg border-b cursor-pointer border-b-pink"
            @click="showFlower(flower as FlowerUserDto)">
                <p class="text-center pt-7 text-pink font-bold underline">
                      {{ getFlower(flower).name }}
                </p>
            </div>

           
            <div class="flex justify-around items-center p-2 border-b border-pink cursor-pointer hover:bg-gray-200">
                <img @click="showFlower(flower as FlowerUserDto)" :src="getFlower(flower).image" class="h-25 " alt="">
            </div>

            <div v-if="auth.user" class="flex flex-wrap items-center p-2 gap-2" >
                <div v-for="color in getFlowerUser(flower).colors">
                    <div :style="{ backgroundColor: color.color1.color }"
                    v-if="color.motif === FlowerMotifEnum.NONE"
                    class="h-6.25 w-6.25 rounded-full shadow-sm border"></div>
                    
                    <div v-if="color.motif !== FlowerMotifEnum.NONE && color.color2"
                    class="flex flex-col relative">
                        <img :src="motifImages[`/assets/images/motifs/${color.motif}.webp`]" 
                        class="w-3.75 absolute -top-0.75 -left-0.75 border rounded-full">
                        <div class="h-6.25 w-6.25 rounded-full shadow-sm border"
                               :style="{
                                 background: `linear-gradient(to right, ${color.color1.color} 50%, ${color.color2.color} 50%)`}">
                        </div>

                    </div>
                    <div v-if="color.motif !== FlowerMotifEnum.NONE && !color.color2"
                    class="flex flex-col relative">

                     <img :src="motifImages[`/assets/images/motifs/${color.motif}.webp`]" 
                        class="w-3.75 absolute -top-0.75 -left-0.75 border rounded-full">
                        <div class="h-6.25 w-6.25 rounded-full shadow-sm border"
                               :style="{ backgroundColor: color.color1.color }">
                        </div>

                    </div>
                </div>
                <ClientOnly @click="openColorModal(flower)">
                    <Icon name="material-symbols:add-circle-outline" class="text-xl"/>
                </ClientOnly>
            </div>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { FlowerMotifEnum } from '~/enum/flowerMotifEnum';
import type { DefaultColorsDto } from '~/interfaces/default-colors.dto';
import type { FlowerUserDto } from '~/interfaces/flower-user.dto';
import type { FlowerDto } from '~/interfaces/flower.dto';

const auth = useAuthStore()
const showModal = ref(false)
const showSimulatorModal = ref(false)
const showColorModal = ref(false)
const showFlowerModal = ref(false)
const searchColor = ref<DefaultColorsDto|undefined>(undefined)
const titleModal = ref('')
const elementTable  = ref<FlowerDto[] | FlowerUserDto[]>([])
const selectedFlower=ref<FlowerUserDto>()

const simulateFlower = (event: DefaultColorsDto | undefined) =>{
    console.warn(event)
    showModal.value = false
    showColorModal.value = false;
    showFlowerModal.value = false;
    showSimulatorModal.value = true     
    searchColor.value = event
}

const motifImages = import.meta.glob<string>(
  '~/assets/images/motifs/*.webp',
  {
    eager: true,
    import: 'default'
  }
)

const showFlower = (flower: FlowerUserDto) => {
    if(auth.user){
        showFlowerModal.value = true
    }
    selectedFlower.value = flower
}

const openModal = (title: string):void =>{
    titleModal.value = title 
    showModal.value = true 
    showSimulatorModal.value = false
}

const openSimulatorModal = (title: string):void =>{
    titleModal.value = title 
    showModal.value = false
    showSimulatorModal.value = true 
}

const openColorModal = (flower:any) => {
    console.warn(flower)
    titleModal.value = `Ajouter une couleur pour ${flower.flower.name}` 
    showColorModal.value = true 
    selectedFlower.value= flower as FlowerUserDto
}

const flowersUserModel = computed<FlowerUserDto[]>({
  get: () => elementTable.value as FlowerUserDto[],
  set: (value) => {
    elementTable.value = value
  }
})

const getFlower = (flower: FlowerUserDto | FlowerDto) => {
  return auth.user
    ? (flower as FlowerUserDto).flower
    : flower as FlowerDto
}

const getFlowerUser = (flower: FlowerUserDto | FlowerDto) => {
return flower as FlowerUserDto
}

const handleCloseModal = async (response? : {success: boolean}):Promise<void> => {
    showModal.value = false

    if(response?.success ){
        elementTable.value = await $fetch<FlowerDto[]>(`/api/flower-user/all`)
    }
}

const handleCloseFlowerModal = async (event: any):Promise<void> => {
    console.warn(event)
    showFlowerModal.value = false
    if(!event){
        elementTable.value = await $fetch<FlowerDto[]>(`/api/flower-user/all`)
    }
}

const handleCloseColorModal = async (flower: FlowerUserDto):Promise<void> => {
    showColorModal.value = false
    selectedFlower.value = undefined
    
    if(flower){
        elementTable.value = await $fetch<FlowerDto[]>(`/api/flower-user/all`)
    }
}

const handleCloseSimultatorModal = () => {
    showSimulatorModal.value=false;
}

</script>