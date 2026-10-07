<template>
    <h1 class="text-lg text-pink font-bold">Personnages</h1>
    <SearchBar v-model:elementTable="characters"
            type="character"/>


    <div class="grid grid-cols-[repeat(auto-fill,168px)] justify-center gap-4">
        <div v-for="character in characters"
            class="border rounded-lg w-45 bg-white/90 border-gold shadow-md"
            @click="openModal('Modification', character)">
                <div class="relative flex items-center justify-between bg-card-color pt-2.5 pb-2.5 rounded-tl-lg rounded-tr-lg">

                    <p class="pl-2 text-pink font-bold">
                        {{ character.name }}
                    </p>

                    <div class="relative mr-2">
                        <ClientOnly>
                            <Icon
                                class="text-[45px] text-pink"
                                name="material-symbols:favorite-rounded"
                            />
                        </ClientOnly>

                        <p class="absolute inset-0 flex items-center justify-center text-white text-[14px] font-bold">
                            {{ character.level }}
                        </p>
                    </div>
                </div>
           
                <div class="p-2.5 flex justify-between items-center">
                    <div class="flex flex-col justify-items-center items-center">
                        <img :src="character.favoriteGift.image" class="h-10" alt="">
                        <ClientOnly>
                            <Icon class="text-4xl text-pink " name="mdi-light:arrow-down" />
                        </ClientOnly> 
                        <img :src="character.receivedGift.image" class="h-10" alt="">
                    </div>
                    <img :src="character.image" class="h-25" alt="">
                </div>

                <div class="border-t border-t-pink">
                    <p class="p-1.5 text-sm mt-2"> <span class="text-pink font-bold">Bonus :</span>  {{ character.bonus1 }}</p>
                    <p v-if="character.bonus2"
                        class="p-1.5 text-sm"><span class="text-pink font-bold">Bonus :</span> {{ character.bonus2 }}</p>
                </div>
            
        </div>

    </div>
    



</template>
<script lang="ts" setup>
import type { CharacterDto } from '~/interfaces/characters-dto'

const auth = useAuthStore()
const showModal = ref(false)
const titleModal = ref('')
const characters = ref<CharacterDto[]>([])
const selectedCharacter= ref<CharacterDto>()

const openModal = (title: string, character?: CharacterDto):void =>{
    titleModal.value = title
    selectedCharacter.value = character   
    showModal.value = true 
}

const handleCloseModal = (character? : CharacterDto):void => {
    showModal.value = false
    selectedCharacter.value = undefined
    
    if (character && character.id) {
            const index = characters.value.findIndex(
                c => c.id === character.id
            )

            if (index !== -1) {
                characters.value[index] = character
            } else {
                characters.value.push(character)
            }

            characters.value.sort((a, b) => 
                a.name.localeCompare(b.name)
            )
    }
}


</script>