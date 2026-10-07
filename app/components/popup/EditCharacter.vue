<template>
    <div
    class="fixed inset-0 flex items-center justify-center bg-gray-500/80 z-10 ">
        <div class="bg-white rounded shadow w-[60%]">
            <div class="flex gap-2 items-center justify-between bg-background text-pink p-4">
                <h1>{{ title }}</h1>
                <ClientOnly>
                <Icon name="ic:baseline-cancel" 
                        size="24"
                        @click="close"/>
                </ClientOnly>   
            </div>
        
            <form class="p-4" @submit.prevent="send">
                <UiLabelAndInput v-model:property="form.name"
                                    id="name"
                                    placeholder="Nom"
                                    type="text"
                                    label="Nom"/>
                <UiLabelAndInput v-model:property="form.level"
                                    id="level"
                                    placeholder="Niveau"
                                    type="number"
                                    label="Niveau"
                                    min="1"/>
                    
              <div class="flex gap-6 bg-background mt-4 p-2.5">
                <UiSelectOptions  title="Cadeau favoris"
                                  id="select1"
                                  column="image"
                                  :selectedOption="selectedFavoriteGift" 
                                  :table="items"
                                  @chooseOption="selectFavoriteGift"/>

                <UiSelectOptions  title="Objet reçus"
                                  id="select2"
                                  column="image"
                                  :selectedOption="selectedReceivedGift" 
                                  :table="items"
                                  @chooseOption="selectReceivedGift"/>
              </div>    
              
              <select v-model="form.obtainWith" class="p-2.5 mb-2 border mt-4 w-full rounded-sm">
                  <option :value="undefined" disabled>
                      Sélectionner un jeu
                  </option>

                    <option
                        v-for="type in tableFlowerColorType"
                        :key="type"
                        :value="type"
                    >
                        {{ type }}
                    </option>
                </select>


                <div class="flex justify-between mt-4 ">
                <UiTextarea class="w-[49%]" title="Bonus 1"  v-model:message="form.bonus1" />
                <UiTextarea class="w-[49%]" title="Bonus 2"  v-model:message="form.bonus2"/>
                </div>

               
                <div class="flex gap-6 justify-between">
                    <UiImageInput :image="form.image"

                                  v-model:file="file" />
                    
                    <UiImageInput :image="form.miniature"
                                  message="Choisir une image miniature"
                                  v-model:file="miniature" />
                </div>

                
     
                
                <input type="checkbox" v-model="form.checked" class="opacity-0">

                <div class="text-center">
                  <button type="submit" class="bg-background text-pink p-4 rounded-lg font-bold">{{character?'Modifier' : 'Envoyer'}}</button>
                </div>
                
            </form> 
        </div>
        
    </div>
</template>

<script lang="ts" setup>
import { ObtainWithEnum } from '~/enum/obtainWithEnum';
import type { CharacterDto } from '~/interfaces/characters-dto';
import type { ItemDto } from '~/interfaces/item.dto';

const props = defineProps({
    title: String,
    character: Object as PropType<CharacterDto>
});

const emit = defineEmits(['closeModal']);

const close = (character? : CharacterDto) => {
  resetForm()
  emit('closeModal', character );
};

const tableFlowerColorType: ObtainWithEnum[] = Object.values(ObtainWithEnum)

const selectedFavoriteGift = ref<ItemDto>()
const selectedReceivedGift = ref<ItemDto>()
const open = ref(false)

const file = ref()
const miniature=ref()


const form = reactive({
  name: '',
  level: '',
  bonus1:'',
  bonus2:'',
  image:'',
  miniature:'',
  obtainWith: ObtainWithEnum.BASE_GAME,
  checked: false
});

const items = ref<ItemDto[]>([])

const resetForm = () => {
  selectedFavoriteGift.value=undefined;
  selectedReceivedGift.value=undefined;
  file.value = undefined;
  miniature.value=undefined;
  form.name = '';
  form.level = '';
  form.obtainWith=ObtainWithEnum.BASE_GAME;
  form.bonus1 = '';
  form.bonus2='';
  form.checked = false;
}




const selectFavoriteGift= (gift:ItemDto) => {
  selectedFavoriteGift.value = gift
  open.value = false
}

const selectReceivedGift= (gift:ItemDto) => {
  selectedReceivedGift.value = gift
  open.value = false
}


const send = async () => {

  const formData = new FormData()

  formData.append('name', form.name)
  formData.append('level', form.level)
  formData.append('checked', String(form.checked))
  formData.append('bonus1', form.bonus1)
  formData.append('bonus2', form.bonus2)
  formData.append('favoriteGift', String(selectedFavoriteGift.value?.id))
  formData.append('receivedGift', String(selectedReceivedGift.value?.id))
  formData.append('obtainWith',form.obtainWith )

  if (file.value) {
    formData.append('file', file.value)
  }

  if(miniature.value){
    formData.append('miniature', miniature.value)
  }

  if(!props.character){
  const save : CharacterDto = await $fetch<CharacterDto>('/api/admin/character/create', {
      method: 'POST',
      body: formData
    })

    close(save)
  }else{

    const save : CharacterDto = await $fetch<CharacterDto>(`/api/admin/character/${props.character.id}`, {
      method: 'PATCH',
      body: formData
    })
    close(save)
  }
}

onMounted(async () => {
  if(props.character){
      form.name = props.character.name
      form.bonus1=props.character.bonus1
      form.bonus2=props.character.bonus2
      form.level = props.character.level.toString()
      form.image=props.character.image
      form.miniature=props.character.miniature
      selectedFavoriteGift.value = props.character.favoriteGift;   
      selectedReceivedGift.value = props.character.receivedGift
  }

   items.value = await $fetch<ItemDto[]>(`/api/item/all`)
})

</script>