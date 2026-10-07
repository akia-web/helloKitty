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
                    
              <div class="flex gap-6 bg-background mt-4 p-2.5">
                <UiSelectOptions  title="Cadeau de l'habitant"
                                  column="image"
                                  id="select1"
                                  :selectedOption="selectedGift" 
                                  :table="items"
                                  @chooseOption="selectGift"/>
                
                <UiSelectOptions  title="Ami de ..."
                                  column="miniature"
                                  id="select2"
                                  :selectedOption="selectedCharacter" 
                                  :table="characters"
                                  @chooseOption="selectCharacter"/>

              </div>    
  

                <UiImageInput :image="form.image"
                              v-model:file="file" />
                
                <input type="checkbox" v-model="form.checked" class="opacity-0">

                <div class="text-center">
                  <button type="submit" class="bg-background text-pink p-4 rounded-lg font-bold">{{visitor?'Modifier' : 'Envoyer'}}</button>
                </div>
                
            </form> 
        </div>
        
    </div>
</template>

<script lang="ts" setup>
import type { CharacterDto } from '~/interfaces/characters-dto';
import type { ItemDto } from '~/interfaces/item.dto';
import type { VisitorDto } from '~/interfaces/visitor.dto';

const props = defineProps({
    title: String,
    visitor: Object as PropType<VisitorDto>
});

const emit = defineEmits(['closeModal']);

const close = (visitor? : VisitorDto) => {
  resetForm()
  emit('closeModal', visitor );
};


const selectedGift = ref<ItemDto>()
const selectedCharacter = ref<CharacterDto>()
const open = ref(false)

const file = ref()


const form = reactive({
  name: '',
  level: '',
  isResident:false,
  image:'',
  checked: false
});

const items = ref<ItemDto[]>([])
const characters = ref<CharacterDto[]>([])

const resetForm = () => {
  selectedGift.value=undefined;
  file.value = undefined;
  form.name = '';
  form.level = '';
  form.isResident = false;
  form.image='';
  form.checked = false;
}




const selectGift= (gift:ItemDto) => {
  selectedGift.value = gift
  open.value = false
}


const selectCharacter = (character: CharacterDto)=> {
  selectedCharacter.value = character;
  open.value = false
}


const send = async () => {

  const formData = new FormData()

  formData.append('name', form.name)
  formData.append('level', form.level)
  formData.append('checked', String(form.checked))
  formData.append('isResident', String(form.isResident))
  formData.append('character', String(selectedCharacter.value?.id))

  formData.append('gift', String(selectedGift.value?.id))

  if (file.value) {
    formData.append('file', file.value)
  }

  if(!props.visitor){
  const save : VisitorDto = await $fetch<VisitorDto>('/api/admin/visitor/create', {
      method: 'POST',
      body: formData
    })

    close(save)
  }else{

    const save : VisitorDto = await $fetch<VisitorDto>(`/api/admin/visitor/${props.visitor.id}`, {
      method: 'PATCH',
      body: formData
    })

    close(save);
  }
}

onMounted(async () => {
  if(props.visitor){
      form.name = props.visitor.name;
      form.image=props.visitor.image;
      selectedGift.value = props.visitor.gift;
      selectedCharacter.value = props.visitor.character;
      }

   items.value = await $fetch<ItemDto[]>(`/api/item/all`);
   characters.value = await $fetch<CharacterDto[]>(`/api/character/all`);
})

</script>