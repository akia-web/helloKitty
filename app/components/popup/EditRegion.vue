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


                <UiImageInput :image="form.image"
                              v-model:file="file" />
                
                <input type="checkbox" v-model="form.checked" class="opacity-0">

                <div class="text-center">
                  <button type="submit" class="bg-background text-pink p-4 rounded-lg font-bold">{{region?'Modifier' : 'Envoyer'}}</button>
                </div>
                
            </form> 
        </div>
        
    </div>
</template>

<script lang="ts" setup>
import type { RegionDto } from '~/interfaces/region.dto';
import type { VisitorDto } from '~/interfaces/visitor.dto';

const props = defineProps({
    title: String,
    region: Object as PropType<RegionDto>
});

const emit = defineEmits(['closeModal']);

const close = (region? : RegionDto) => {
  resetForm()
  emit('closeModal', region );
};


const open = ref(false)

const file = ref()


const form = reactive({
  name: '',
  image:'',
  checked: false
});

const resetForm = () => {
  file.value = undefined;
  form.name = '';
  form.image='';
  form.checked = false;
}


const send = async () => {

  const formData = new FormData()

  formData.append('name', form.name)
  formData.append('checked', String(form.checked))

  if (file.value) {
    formData.append('file', file.value)
  }

  if(!props.region){
  const save : VisitorDto = await $fetch<VisitorDto>('/api/admin/region/create', {
      method: 'POST',
      body: formData
    })

    close(save)
  }else{

    const save : VisitorDto = await $fetch<VisitorDto>(`/api/admin/region/${props.region.id}`, {
      method: 'PATCH',
      body: formData
    })

    close(save);
  }
}

onMounted(async () => {
  if(props.region){
      form.name = props.region.name;
      form.image=props.region.image;
      }
})

</script>