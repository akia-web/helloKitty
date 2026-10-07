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

                <div class="mt-4">
                  <label >Motif</label>
                  <select v-model="form.defaultMotif" class="p-2.5 mb-2 border w-full rounded-sm">
                      <option :value="undefined" disabled>
                          Sélectionner un type couleur
                      </option>

                        <option
                            v-for="type in tableFlowerMotif"
                            :key="type"
                            :value="type"
                        >
                        {{ type }}
                        </option>
                  </select>
                </div>
            
                <div class="flex flex-col gap-2">
                    
                  <div class="flex gap-2 flex-wrap">
                    <div v-for="color in props.colors" >
                      <div class="flex flex-col justify-center items-center">
                          <div :style="{ backgroundColor: color.color }"
                            class="h-6.25 w-6.25 rounded-full shadow-sm border-3"
                            :class="{ 'border-green-600': selectedColors.some(selected => selected.id === color.id), 'border-white': !selectedColors.some(selected => selected.id === color.id)}"
                            @click="selectColors(color)">
                          </div>
                          <p class="text-xs">{{ color.name }}</p>
                      </div>
                      
                    </div>
                  </div>
                </div>

                <UiImageInput :image="flower?.image"
                            v-model:file="file" />
                <input type="checkbox" v-model="form.checked" class="opacity-0">

                <div class="text-center">
                  <button type="submit" class="bg-background text-pink p-4 rounded-lg font-bold">{{flower?'Modifier' : 'Envoyer'}}</button>
                </div>
                
            </form> 
        </div>
        
    </div>



</template>
<script lang="ts" setup>
import { FlowerMotifEnum } from '~/enum/flowerMotifEnum';
import type { DefaultColorsDto } from '~/interfaces/default-colors.dto';
import type { FlowerDto } from '~/interfaces/flower.dto';

const props = defineProps({
    showModal: Boolean,
    title: String,
    flower: Object as PropType<FlowerDto>,
    colors: Array as PropType<DefaultColorsDto[]>
});

const emit = defineEmits(['closeModal']);

const close = (flower? : FlowerDto) => {
  resetForm()
  emit('closeModal', flower );
};

const tableFlowerMotif: FlowerMotifEnum[] = Object.values(FlowerMotifEnum)
const selectedColors = ref<DefaultColorsDto[]>([])

const file = ref()


const form = reactive({
  name: '',
  defaultMotif: FlowerMotifEnum.NONE,
  checked: false
});

const selectColors = (color: DefaultColorsDto) => {
  const index = selectedColors.value.findIndex(c => c.id === color.id)

  if (index !== -1) {
    selectedColors.value.splice(index, 1)
  } else {
    selectedColors.value.push(color)
  }
}

const resetForm = () => {;
  file.value = undefined;
  form.name = '';
  form.checked = false;
}


onMounted(() => {   
   props.flower?.defaultColors.forEach((element)=>{
        selectedColors.value.push(element)
   })

   form.name = props.flower? props.flower.name: ''
   
   if(props.flower){
    form.defaultMotif = props.flower.defaultMotif as FlowerMotifEnum
   }
})

watch(
  () => props.flower,
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
    formData.append('defaultMotif', form.defaultMotif)
    formData.append('defaultColors', JSON.stringify(selectedColors.value))

    if (file.value) {
      formData.append('file', file.value)
    }

    
  if(!props.flower){
   const save : FlowerDto = await $fetch<FlowerDto>('/api/admin/flower/create', {
      method: 'POST',
      body: formData
    })
    close(save)

    }else{

        const save : FlowerDto = await $fetch<FlowerDto>(`/api/admin/flower/${props.flower.id}`, {
            method: 'PATCH',
            body: formData
        })

        close(save)
    }

  }

</script>