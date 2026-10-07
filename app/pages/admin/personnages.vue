<template>
    <div v-if="auth.user && auth.user.role==='ADMIN'"
            class="flex flex-row-reverse reactive">
        <button class="border flex items-center p-2.5 gap-2 border-gold"
                @click="openModal('Ajouter un personnage')">
                <p class="text-gold">Ajouter</p>
                <ClientOnly>
                <Icon name="mdi-light:plus-circle" class="text-gold" size="24"/>
                </ClientOnly>          
        </button>

        <PopupEditCharacter v-if="showModal"
                            :title="titleModal"
                            v-model:character="selectedCharacter"
                            @closeModal="handleCloseModal"/>
    </div>

    <h1 class="text-lg text-pink font-bold">Personnages</h1>
        <SearchBar v-model:elementTable="characters"
                type="character"/>

    <table class="bg-white w-full border">
        <thead>
            <tr class="border border-b-pink ">
                <th class="text-left text-xs md:text-base p-2.5">Nom</th>
                <th class="text-center text-xs md:text-base">cadeau favoris</th>
                <th class="text-center text-xs md:text-base">cadeau reçu</th>
                <th class="text-center text-xs md:text-base">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="character in characters" :key="character.id">
                <td >
                    <p class="pl-2 text-pink font-bold pt-2.5 pb-2.5 text-xs md:text-base">
                        {{ character.name }}
                    </p>
                </td>

                <td class="text-center">
                    <img
                        :src="character.favoriteGift.image"
                        class="w-10 inline-block pt-2.5 pb-2.5"
                        alt=""
                    >
                </td>

                <td class="text-center">
                    <img
                        :src="character.receivedGift.image"
                        class="w-10 inline-block pt-2.5 pb-2.5"
                        alt=""
                    >
                </td>

                <td class="text-center">
                    <ClientOnly>
                        <Icon
                            class="text-[30px] text-pink inline-block "
                            name="mdi-light:pencil"
                            @click="openModal('Modification', character)"
                        />
                    </ClientOnly>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script lang="ts" setup>
import type { CharacterDto } from '~/interfaces/characters-dto'

definePageMeta({
  layout: 'admin',
})

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