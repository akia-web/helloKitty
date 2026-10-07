<template>
 <h1 class="text-lg text-pink font-bold">Fleurs</h1>

    <div v-if="auth.user && auth.user.role==='ADMIN'"
            class="flex flex-row-reverse gap-4 reactive">
        <button class="border flex items-center p-2.5 gap-2 border-gold"
                @click="openFlowerModal('Ajouter une fleure')">
                <p class="text-gold">Ajouter une fleure</p>
                <ClientOnly>
                <Icon name="mdi-light:plus-circle" class="text-gold" size="24"/>
                </ClientOnly>          
        </button>

        <button class="border flex items-center p-2.5 gap-2 border-gold"
                @click="openFlowerColorModal('Ajouter une Couleur')">
                <p class="text-gold">Ajouter une Couleur</p>
                <ClientOnly>
                <Icon name="mdi-light:plus-circle" class="text-gold" size="24"/>
                </ClientOnly>          
        </button>

        <PopupEditFlower v-if="showFlowerModal"
                            :title="titleModal"
                            v-model:flower="selectedFlower"
                            :colors="flowersColor"
                            @closeModal="handleCloseFlowerModal"/>
        
        <PopupEditDefaultColor v-if="showFlowerColorModal"
                            :title="titleModal"
                            v-model:flower="selectedFlowerColor"
                            @closeFlowerColorModal="handleCloseFlowerColorModal"/>
    </div>

    <div class="flex gap-2">
        <div v-for="color in flowersColor">
                <div :style="{ backgroundColor: color.color }"
                class="h-[25px] w-[25px] rounded-full shadow-sm border border-white"></div>
            </div>
    </div>
    
    <SearchBar v-model:elementTable="flowers"
                type="flower"/>

    <table class="bg-white w-full border">
        <thead>
            <tr class="border border-b-pink ">
                <th class="text-left w-50 text-xs md:text-base p-2.5">Nom</th>
                <th class="text-center text-xs md:text-base">Image</th>
                <th class="text-center text-xs md:text-base">Couleurs</th>
                <th>Motif</th>
                <th class="text-center text-xs md:text-base">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="flower in flowers" :key="flower.id">
                <td >
                    <p class="pl-2 text-pink font-bold pt-2.5 pb-2.5 text-xs md:text-base">
                        {{ flower.name }}
                    </p>
                </td>

                <td class="text-center">
                    <img
                        :src="flower.image"
                        class="w-10 inline-block pt-2.5 pb-2.5"
                        alt=""
                    >
                </td>

                <td class="text-center">
                    <div class="flex justify-center gap-2">
                        <div v-for="color in flower.defaultColors">
                                <div :style="{ backgroundColor: color.color }"
                        class="h-6.25 w-6.25 rounded-full shadow-sm border border-white"></div>
                            </div>
                    </div>
  
                </td>
                
                <td class="text-center">
                    <div>
                        {{ flower.defaultMotif }}
                    </div>
                </td>
                <td class="text-center">
                    <ClientOnly>
                        <Icon
                            class="text-[30px] text-pink inline-block "
                            name="mdi-light:pencil"
                            @click="openFlowerModal('Modification', flower)"
                        />
                    </ClientOnly>
                </td>
            </tr>
        </tbody>
    </table>     
</template>

<script lang="ts" setup>
import type { DefaultColorsDto } from '~/interfaces/default-colors.dto'
import type { FlowerDto } from '~/interfaces/flower.dto'

definePageMeta({
  layout: 'admin',
})

const auth = useAuthStore()
const showFlowerModal = ref(false)
const showFlowerColorModal = ref(false)
const titleModal = ref('')
const selectedFlower=ref<FlowerDto>()
const selectedFlowerColor=ref<DefaultColorsDto>()
const flowers = ref<FlowerDto[]>([])
const flowersColor = ref<DefaultColorsDto[]>([])
    

const openFlowerModal = (title: string, flower?: FlowerDto):void =>{
    showFlowerColorModal.value=false
    titleModal.value = title
    selectedFlower.value = flower   
    showFlowerModal.value = true 
}


const openFlowerColorModal = (title: string, flowerColor?: DefaultColorsDto):void =>{
    showFlowerModal.value = false 
    titleModal.value = title
    selectedFlowerColor.value = flowerColor   
    showFlowerColorModal.value=true
}

const handleCloseFlowerModal = (flower? : FlowerDto):void => {
    showFlowerModal.value = false
    selectedFlower.value = undefined
    
    if (flower && flower.id) {
            const index = flowers.value.findIndex(
                c => c.id === flower.id
            )

            if (index !== -1) {
                flowers.value[index] = flower
            } else {
                flowers.value.push(flower)
            }

            flowers.value.sort((a, b) => 
                a.name.localeCompare(b.name)
            )
    }
}

const handleCloseFlowerColorModal = (flowerColor? : DefaultColorsDto):void => {
    showFlowerColorModal.value = false
    selectedFlowerColor.value = undefined
    
    if (flowerColor && flowerColor.id) {
            const index = flowers.value.findIndex(
                c => c.id === flowerColor.id
            )

            if (index !== -1) {
                flowersColor.value[index] = flowerColor
            } else {
                flowersColor.value.push(flowerColor)
            }

            flowersColor.value.sort((a, b) => 
                a.name.localeCompare(b.name)
            )
    }
}

onMounted(async()=>{
     flowersColor.value = await $fetch<DefaultColorsDto[]>(`/api/default-color/all`)
})



</script>