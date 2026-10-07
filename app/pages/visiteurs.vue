<template>
 <h1 class="text-lg text-pink font-bold">Visiteurs</h1>

    <div v-if="auth.user"
            class="flex flex-row-reverse reactive">
        <button class="border flex items-center p-2.5 gap-2 bg-white"
                @click="openModal('Ajouter des visiteurs')">
                <p class="text-gold">Reglage</p>
                <ClientOnly>
                <Icon name="mdi-light:cog" class="text-gold" size="24"/>
                </ClientOnly>          
        </button>

        <PopupConfigVisitors v-if="showModal"
                            :title="titleModal"
                            v-model:visitorsUser="visitorsUserModel"
                            @closeModal="handleCloseModal" />
    </div>

        <SearchBar v-model:elementTable="elementTable"
                :type="auth.user? 'visitor-user':'visitor'"/>

        <div v-if="elementTable.length===0"
                class="mt-6 flex justify-center ">
            <div class="flex flex-col gap-4">
                <div class="flex items-center gap-4">
                    <span class="border rounded-full inline-block w-7.5 text-center h-7.5  p-1.5">1</span> 
                    <p class="text-pink">
                        Utilisez le bouton réglage pour afficher les visiteurs souhaité
                    </p>
                </div>

                <div class="flex items-center gap-4">
                    <span class="border rounded-full inline-block w-7.5 text-center h-7.5  p-1.5">2</span> 
                    <p class="text-pink">  
                        Cliquez sur la petite maison pour les renseigner comme résident
                    </p>
                </div>
                <div class="flex items-center gap-4">
                    <span class="border rounded-full inline-block w-7.5 text-center h-7.5  p-1.5">3</span> 
                    <p class="text-pink">
                        Cliquez sur la partie blanche d'une carte pour mettre un visiteur en favoris. <br>Il se déplacera au debut de la liste
                    </p>
                </div>
            </div>
            
        </div>

        <div class="grid grid-cols-[repeat(auto-fill,168px)] justify-center gap-4">
            
            <div v-for="visitor in elementTable"
            class="border rounded-lg w-42 bg-white/90 border-gold shadow-md">
            <div class="relative min-h-17.5 flex items-center justify-around bg-gray-pink rounded-tl-lg rounded-tr-lg border-b border-b-pink">
                <p class="text-center pt-7 text-pink font-bold">
                      {{ getVisitor(visitor).name }}
                </p>
                <ClientOnly v-if="auth.user"
                @click="updateIsResidentIsFav(visitor as VisitorUserDto, true, false)"
                >
                    <Icon
                        class="text-[25px] absolute -top-0.75 -right-0.75 text-white font-bold border border-black rounded-full p-0.75"
                        :class="{
                            'bg-pink': isResident(visitor) ,
                            'bg-gray': !isResident(visitor)
                            }"
                        name="material-symbols:home"
                    />
                </ClientOnly>

                <ClientOnly v-if="auth.user && isFav(visitor)">
                    <Icon
                        class="text-[45px] absolute -top-2 -left-1.5 font-bold rounded-full p-0.75"
                        :class="{
                            'text-pink': isFav(visitor) ,
                            }"
                        name="material-symbols:bookmark-star"
                    />
                </ClientOnly>
            </div>

           
            <div class="flex justify-around items-center p-2"
             @click="updateIsResidentIsFav(visitor as VisitorUserDto, false, true)">
                <div class="flex w-[30%] h-full flex-col gap-2 justify-center">
                    <img :src="getVisitor(visitor).gift.image" class="h-9 object-contain" alt="">
                </div>
                <img :src="getVisitor(visitor).image" class="h-25" alt="">
            </div>
            <div v-if="getVisitor(visitor).character" 
            class="flex gap-2 p-2 items-center">
                <p>ami de : </p>
                <img :src="getVisitor(visitor).character.miniature" class="h-3.75">
            </div>
        </div>

    </div>
</template>
<script lang="ts" setup>
import type { VisitorUserDto } from '~/interfaces/visitor-user.dto';
import type { VisitorDto } from '~/interfaces/visitor.dto';

const auth = useAuthStore()
const showModal = ref(false)
const titleModal = ref('')
const elementTable  = ref<VisitorDto[] | VisitorUserDto[]>([])

const openModal = (title: string):void =>{
    titleModal.value = title 
    showModal.value = true 
}

const visitorsUserModel = computed<VisitorUserDto[]>({
  get: () => elementTable.value as VisitorUserDto[],
  set: (value) => {
    elementTable.value = value
  }
})

const getVisitor = (visitor: VisitorUserDto | VisitorDto) => {
  return auth.user
    ? (visitor as VisitorUserDto).visitor
    : visitor as VisitorDto
}

const isResident = (visitor: VisitorUserDto | VisitorDto): boolean => {
    if(auth.user){
        return (visitor as VisitorUserDto).isResident
    }else{
        return false
    }
}

const isFav = (visitor: VisitorUserDto | VisitorDto): boolean => {
    if(auth.user){
        return (visitor as VisitorUserDto).isFav
    }else{
        return false
    }
}

const handleCloseModal = async (response? : {success: boolean}):Promise<void> => {
    showModal.value = false

    if(response?.success ){
        elementTable.value = await $fetch<VisitorDto[]>(`/api/visitor-user/all`)
    }
}

const updateIsResidentIsFav = async (visitor: VisitorUserDto, resident: boolean, fav: boolean) =>{
    if(auth.user){
        const save : VisitorUserDto = await $fetch<VisitorUserDto>(`/api/visitor-user/${visitor.visitor.id}`, {
                    method: 'PATCH',
                    body: {
                        resident,
                        fav
                    }
                })

        const index = (elementTable.value as VisitorUserDto[]).findIndex(
            c => c.visitor.id === save.visitor.id
        )

        if (index !== -1) {
            elementTable.value[index] = save
        }

        if(fav){
            elementTable.value = await $fetch<VisitorDto[]>(`/api/visitor-user/all`)
        }
    }       
}


</script>