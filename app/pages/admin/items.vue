<template>
    <h1 class="text-lg text-pink font-bold">Items</h1>


        <div v-if="auth.user && auth.user.role==='ADMIN'"
            class="flex flex-row-reverse reactive">
            <button class="border flex items-center p-2.5 gap-2 border-gold"
                    @click="openModal('Ajouter un item')">
                    <p class="text-gold">Ajouter</p>
                    <ClientOnly>
                    <Icon name="mdi-light:plus-circle" class="text-gold" size="24"/>
                    </ClientOnly>          
            </button>

            <PopupEditItem :showModal="showModal" 
                                :title="titleModal"
                                v-model:item="selectedItem"
                                @closeModal="handleCloseModal"/>
        </div>
             <SearchBar v-model:elementTable="items"
                        type="item"/>

            <div class="flex gap-4 flex-wrap justify-around">
        <div v-for="item in items"
            class="border rounded-lg min-w-50 max-w-50 bg-white"
            @click="openModal('Modification', item)">
            <div class="flex justify-center p-2.5 rounded-tl-lg rounded-tr-lg">
                <p class="text-pink font-bold">{{ item.name }}</p>
            </div>
           
            <div class="p-2.5 flex flex-col items-center">
                <img :src="item.image" class="w-6.25" alt="">
            </div>
            
        </div>

    </div>
</template>
<script lang=ts setup>
import type { ItemDto } from '~/interfaces/item.dto'

definePageMeta({
  layout: 'admin',
})

const auth = useAuthStore()
const showModal = ref(false)
const titleModal = ref('')
const selectedItem= ref<ItemDto>()
const items = ref<ItemDto[]>([])

const openModal = (title: string, item?: ItemDto):void =>{
    titleModal.value = title
    selectedItem.value = item   
    showModal.value = true 
}

const handleCloseModal = (item? : ItemDto):void => {
    showModal.value = false
    selectedItem.value = undefined
    
    if (item && item.id) {
            const index = items.value.findIndex(
                c => c.id === item.id
            )

            if (index !== -1) {
                items.value[index] = item
            } else {
                items.value.push(item)
            }

            items.value.sort((a, b) => 
                a.name.localeCompare(b.name)
            )
    }
}
</script>