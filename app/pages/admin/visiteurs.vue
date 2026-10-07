<template>
 <h1 class="text-lg text-pink font-bold">Visiteurs</h1>

    <div v-if="auth.user && auth.user.role==='ADMIN'"
            class="flex flex-row-reverse reactive">
        <button class="border flex items-center p-2.5 gap-2 border-gold"
                @click="openModal('Ajouter un visiteur')">
                <p class="text-gold">Ajouter</p>
                <ClientOnly>
                <Icon name="mdi-light:plus-circle" class="text-gold" size="24"/>
                </ClientOnly>          
        </button>

        <PopupEditVisitor v-if="showModal"
                            :title="titleModal"
                            v-model:visitor="selectedVisitor"
                            @closeModal="handleCloseModal"/>
    </div>

    <SearchBar v-model:elementTable="visitors"
            type="visitor"/>
    
    <table class="bg-white w-full border">
        <thead>
            <tr class="border border-b-pink ">
                <th class="text-left w-50 text-xs md:text-base p-2.5">Nom</th>
                <th class="text-center text-xs md:text-base">Image</th>
                <th class="text-center text-xs md:text-base">cadeau</th>
                <th>Ami de</th>
                <th class="text-center text-xs md:text-base">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="visitor in visitors" :key="visitor.id">
                <td >
                    <p class="pl-2 text-pink font-bold pt-2.5 pb-2.5 text-xs md:text-base">
                        {{ visitor.name }}
                    </p>
                </td>

                <td class="text-center">
                    <img
                        :src="visitor.image"
                        class="w-10 inline-block pt-2.5 pb-2.5"
                        alt=""
                    >
                </td>

                <td class="text-center">
                    <img
                        :src="visitor.gift.image"
                        class="w-10 inline-block pt-2.5 pb-2.5"
                        alt=""
                    >
                </td>
                
                <td class="text-center">
                    <img v-if="visitor.character"
                        :src="visitor.character.miniature"
                        class="w-5 inline-block pt-2.5 pb-2.5"
                        alt=""
                    >
                </td>
                <td class="text-center">
                    <ClientOnly>
                        <Icon
                            class="text-[30px] text-pink inline-block "
                            name="mdi-light:pencil"
                            @click="openModal('Modification', visitor)"
                        />
                    </ClientOnly>
                </td>
            </tr>
        </tbody>
    </table>        
</template>
<script lang="ts" setup>
import type { VisitorDto } from '~/interfaces/visitor.dto';

definePageMeta({
  layout: 'admin',
})

const auth = useAuthStore()
const showModal = ref(false)
const titleModal = ref('')
const visitors = ref<VisitorDto[]>([])
const selectedVisitor= ref<VisitorDto>()

const openModal = (title: string, visitor?: VisitorDto):void =>{
    titleModal.value = title
    selectedVisitor.value = visitor   
    showModal.value = true 
}

const handleCloseModal = (visitor? : VisitorDto):void => {
    showModal.value = false
    selectedVisitor.value = undefined
    
    if (visitor && visitor.id) {
            const index = visitors.value.findIndex(
                c => c.id === visitor.id
            )

            if (index !== -1) {
                visitors.value[index] = visitor
            } else {
                visitors.value.push(visitor)
            }

            visitors.value.sort((a, b) => 
                a.name.localeCompare(b.name)
            )
    }
}


</script>