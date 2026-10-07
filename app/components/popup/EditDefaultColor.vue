<template>
    <div
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

                <UiLabelAndInput v-model:property="form.color"
                                    id="color"
                                    placeholder="Couleur"
                                    type="text"
                                    label="Couleur"/>

                <select v-model="form.colorType" class="p-2.5 mb-2 border mt-4 w-full rounded-sm">
                  <option :value="undefined" disabled>
                      Sélectionner un type couleur
                  </option>

                    <option
                        v-for="type in tableFlowerColorType"
                        :key="type"
                        :value="type"
                    >
                        {{ type }}
                    </option>
                </select>
                    

                <input type="checkbox" v-model="form.checked" class="opacity-0">

                <div class="text-center">
                  <button type="submit" class="bg-background text-pink p-4 rounded-lg font-bold">{{flowerColor?'Modifier' : 'Envoyer'}}</button>
                </div>
                
            </form> 
        </div>
        
    </div>



</template>
<script lang="ts" setup>
import { FlowerColorTypeEnum } from '~/enum/flowerColorTypeEnum';
import type { DefaultColorsDto } from '~/interfaces/default-colors.dto';

const props = defineProps({
    showModal: Boolean,
    title: String,
    flowerColor: Object as PropType<DefaultColorsDto>
});

const tableFlowerColorType: FlowerColorTypeEnum[] = Object.values(FlowerColorTypeEnum)
const emit = defineEmits(['closeFlowerColorModal']);

const close = (flowerColor? : DefaultColorsDto) => {
  resetForm()
  emit('closeFlowerColorModal', flowerColor );
};

const form = reactive({
  name: '',
  color: '',
  colorType: FlowerColorTypeEnum.BASE,
  checked: false
});

const resetForm = () => {;
  form.name = '';
  form.checked = false;
}


watch(
  () => props.flowerColor,
  (newValue, oldValue) => {
    if(newValue){
      form.name = newValue.name
    }
  }
)

const send = async () => {

    const data: DefaultColorsDto = {
      name: form.name,
      color: form.color,
      colorType: form.colorType,
      checked: form.checked
    }

    
  if(!props.flowerColor){
   const save : DefaultColorsDto = await $fetch<DefaultColorsDto>('/api/admin/default-color/create', {
      method: 'POST',
      body: data
    })
    close(save)

    }else{

        const save : DefaultColorsDto = await $fetch<DefaultColorsDto>(`/api/admin/default-color/${props.flowerColor.id}`, {
            method: 'PATCH',
            body: data
        })

        close(save)
    }

  }

</script>