<template>
    <div v-if="showModal"
    class="fixed inset-0 flex items-center justify-center bg-gray-500/80">
        <div class="bg-white rounded shadow w-[60%]">
            <div class="flex gap-2 items-center justify-between bg-card-color text-pink bg-background p-4">
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
                    

              <UiImageInput :image="item?.image"
                            v-model:file="file" />
                <input type="checkbox" v-model="form.checked" class="opacity-0">

                <div class="text-center">
                  <button type="submit" class="bg-background text-pink p-4 rounded-lg font-bold">{{item?'Modifier' : 'Envoyer'}}</button>
                </div>
                
            </form> 
        </div>
        
    </div>
</template>

<script lang="ts" setup>
import type { ItemDto } from '~/interfaces/item.dto';

const props = defineProps({
    showModal: Boolean,
    title: String,
    item: Object as PropType<ItemDto>
});

const emit = defineEmits(['closeModal']);

const close = (item? : ItemDto) => {
  resetForm()
  emit('closeModal', item );
};


const file = ref()

const form = reactive({
  name: '',
  checked: false
});

const resetForm = () => {;
  file.value = undefined;
  form.name = '';
  form.checked = false;
}

watch(
  () => props.item,
  (newValue, oldValue) => {
    if(newValue){
      form.name = newValue.name
    }
  }
)



const send = async () => {

    const formData = new FormData()

    formData.append('name', form.name)
    formData.append('checked', String(form.checked))

    if (file.value) {
      formData.append('file', file.value)
    }

    
  if(!props.item){
   const save : ItemDto = await $fetch<ItemDto>('/api/admin/item/create', {
      method: 'POST',
      body: formData
    })
    close(save)

    }else{

        const save : ItemDto = await $fetch<ItemDto>(`/api/admin/item/${props.item.id}`, {
            method: 'PATCH',
            body: formData
        })

        close(save)
    }

  }


</script>