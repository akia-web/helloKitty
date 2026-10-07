<template>
<div class="fixed inset-0 flex items-center justify-center bg-gray-500/80 z-10 ">
    <div class="bg-white rounded shadow w-[60%]">
        <div class="flex gap-2 items-center justify-between bg-background text-pink p-4">
            <h1>{{ title }}</h1>
            <ClientOnly>
            <Icon name="ic:baseline-cancel" 
                    size="24"
                    @click="close"/>
            </ClientOnly>   
        </div>
        <form @submit.prevent="send">
                <div class="flex flex-col gap-2 p-4">
                    <UiSelectOptionMotif :selectedMotif="motif"
                        id="select2"
                        title="Motif"
                        @chooseOption="selectMotif"/>

                    <UiSelectOptionColor :colors="colors" 
                                         :selectedColor="color1"
                                         id="select1"
                                         title="Couleur principale"
                                         @chooseOption="selectColor1"/>
                    
                    <UiSelectOptionColor :colors="colors" 
                        :selectedColor="color2"
                        id="select3"
                        title="Couleur secondaire"
                        @chooseOption="selectColor2"
                        v-if="showColor2()"/>
                    <div class="text-center">
                  <button type="submit" class="bg-background text-pink p-4 rounded-lg font-bold">{{flowerColor?'Modifier' : 'Envoyer'}}</button>
                </div>
                </div>
            
           
                <input type="checkbox" v-model="form.checked" class="opacity-0">
        </form>
     
    </div>
</div>

</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { DefaultColorsDto } from '~/interfaces/default-colors.dto';
import type { FlowerColorDto } from '~/interfaces/flower-color.dto';
import type { FlowerUserDto } from '~/interfaces/flower-user.dto';

const props = defineProps({
    title: String,
    flowerColor: Object as PropType<FlowerColorDto>,
    flower: Object as PropType<FlowerUserDto>,
  });
const emit = defineEmits(['closeModal']);

const colors = ref<DefaultColorsDto[]>([])
const color1 = ref()
const color2 = ref()
const motif = ref()


const form = reactive({
  checked: false
});

const close = (flower: FlowerUserDto) => {
      emit('closeModal', flower );
}
const selectColor1= (color:DefaultColorsDto) => {
  color1.value = color
}

const selectColor2= (color:DefaultColorsDto) => {
  color2.value = color
}

const selectMotif= (element:string) => {
  motif.value = element
}


const showColor2 = () => {
   return canHaveColor2(motif.value)
}

onMounted(async () => {
  if(props.flowerColor){
    color1.value = props.flowerColor.color1
    color2.value = props.flowerColor.color2
    motif.value = props.flowerColor.motif
  }
   colors.value = await $fetch<DefaultColorsDto[]>(`/api/default-color/all`)
})

const send = async () => {

    const data: FlowerColorDto = {
      color1: color1.value,
      color2: color2.value,
      motif: motif.value,
      checked: form.checked,
      flowerUser: props.flower
    }

    
  if(!props.flowerColor){
   const save : FlowerUserDto = await $fetch<FlowerUserDto>('/api/flower-color/create', {
      method: 'POST',
      body: data
    })
    close(save)

    }else{

        const save : FlowerUserDto = await $fetch<FlowerUserDto>(`/api/flower-color/${props.flowerColor.id}`, {
            method: 'PATCH',
            body: data
        })

        close(save)
    }

  }
</script>