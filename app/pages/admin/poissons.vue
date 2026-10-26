<template>
 <h1 class="text-lg text-pink font-bold">Poisson</h1>

    <div v-if="auth.user && auth.user.role==='ADMIN'"
            class="flex flex-row-reverse reactive">
        <button class="border flex items-center p-2.5 gap-2 border-gold"
                @click="openModal('Ajouter un poisson')">
                <p class="text-gold">Ajouter</p>
                <ClientOnly>
                <Icon name="mdi-light:plus-circle" class="text-gold" size="24"/>
                </ClientOnly>          
        </button>

        <PopupEditFish v-if="showModal"
                            :title="titleModal"
                            v-model:fish="selectedFish"
                            @closeModal="handleCloseModal"/>
    </div>

    <SearchBar v-model:elementTable="fishes"
            type="fish"/>
    
    <table class="bg-white w-full border">
        <thead>
            <tr class="border border-b-pink ">
                <th class="text-left w-50 text-xs md:text-base p-2.5">Nom</th>
                <th class="text-center text-xs md:text-base">Image</th>
                <th class="text-center text-xs md:text-base">Region</th>
                <th class="text-center text-xs md:text-base">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="fish in fishes" :key="fish.id">
                <td >
                    <p class="pl-2 text-pink font-bold pt-2.5 pb-2.5 text-xs md:text-base">
                        {{ fish.name }}
                    </p>
                </td>

                <td class="text-center">
                    <img
                        :src="fish.image"
                        class="w-10 inline-block pt-2.5 pb-2.5"
                        alt=""
                    >
                </td>

                <td class="text-center">
                    <img
                        :src="fish.region.image"
                        class="w-10 inline-block pt-2.5 pb-2.5"
                        alt=""
                    >
                </td>
                
                <td class="text-center">
                    <ClientOnly>
                        <Icon
                            class="text-[30px] text-pink inline-block "
                            name="mdi-light:pencil"
                            @click="openModal('Modification', fish)"
                        />
                    </ClientOnly>
                </td>
            </tr>
        </tbody>
    </table>        
</template>
<script lang="ts" setup>
import type { FishDto } from '~/interfaces/fish.dto';

definePageMeta({
  layout: 'admin',
})

const auth = useAuthStore()
const showModal = ref(false)
const titleModal = ref('')
const fishes = ref<FishDto[]>([])
const selectedFish= ref<FishDto>()

const openModal = (title: string, visitor?: FishDto):void =>{
    titleModal.value = title
    selectedFish.value = visitor   
    showModal.value = true 
}

const handleCloseModal = (fish? : FishDto):void => {
    showModal.value = false
    selectedFish.value = undefined
    
    if (fish && fish.id) {
            const index = fishes.value.findIndex(
                c => c.id === fish.id
            )

            if (index !== -1) {
                fishes.value[index] = fish
            } else {
                fishes.value.push(fish)
            }

            fishes.value.sort((a, b) => 
                a.name.localeCompare(b.name)
            )
    }
}


</script>