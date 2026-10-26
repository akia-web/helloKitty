<template>
     <h1 class="text-lg text-pink font-bold">Région</h1>

    <div v-if="auth.user && auth.user.role==='ADMIN'"
            class="flex flex-row-reverse reactive">
        <button class="border flex items-center p-2.5 gap-2 border-gold"
                @click="openModal('Ajouter une région')">
                <p class="text-gold">Ajouter</p>
                <ClientOnly>
                <Icon name="mdi-light:plus-circle" class="text-gold" size="24"/>
                </ClientOnly>          
        </button>

        <PopupEditRegion v-if="showModal"
                            :title="titleModal"
                            v-model:region="selectedRegion"
                            @closeModal="handleCloseModal"/>
    </div>

    <SearchBar v-model:elementTable="regions"
                        type="region"/>

            <table class="bg-white w-full border">
        <thead>
            <tr class="border border-b-pink ">
                <th class="text-left text-xs md:text-base p-2.5">Nom</th>
                <th class="text-center text-xs md:text-base">Image</th>
                <th class="text-center text-xs md:text-base">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="region in regions" :key="region.id">
                <td >
                    <p class="pl-2 text-pink font-bold pt-2.5 pb-2.5 text-xs md:text-base">
                        {{ region.name }}
                    </p>
                </td>

                <td class="text-center">
                    <img
                        :src="region.image"
                        class="w-6 inline-block pt-2.5 pb-2.5"
                        alt=""
                    >
                </td>
                <td class="text-center">
                    <ClientOnly>
                        <Icon
                            class="text-[30px] text-pink inline-block "
                            name="mdi-light:pencil"
                            @click="openModal('Modification', region)"
                        />
                    </ClientOnly>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script lang="ts" setup>
import type { RegionDto } from '~/interfaces/region.dto'

definePageMeta({
  layout: 'admin',
})
const auth = useAuthStore()
const showModal = ref(false)
const titleModal = ref('')
const regions = ref<RegionDto[]>([])
const selectedRegion= ref<RegionDto>()

const openModal = (title: string, visitor?: RegionDto):void =>{
    titleModal.value = title
    selectedRegion.value = visitor   
    showModal.value = true 
}

const handleCloseModal = (visitor? : RegionDto):void => {
    showModal.value = false
    selectedRegion.value = undefined
    
    if (visitor && visitor.id) {
            const index = regions.value.findIndex(
                c => c.id === visitor.id
            )

            if (index !== -1) {
                regions.value[index] = visitor
            } else {
                regions.value.push(visitor)
            }

            regions.value.sort((a, b) => 
                a.name.localeCompare(b.name)
            )
    }
}
</script>