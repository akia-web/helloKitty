<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-500/80 z-10 ">
        <div class="bg-white rounded shadow mt-4 w-[90%] md:w-[60%] max-h-[90vh] overflow-y-auto">
            <div class="flex gap-2 items-center justify-between bg-background text-pink p-4">
                <h1>{{ title }}</h1>
                <ClientOnly>
                <Icon name="ic:baseline-cancel" 
                        size="24"
                        @click="close"/>
                </ClientOnly>   
            </div>
        
            <form class="p-4" @submit.prevent="send" >
              <UiLabelAndInput v-model:property="form.name"
                                  id="name"
                                  placeholder="Nom"
                                  type="text"
                                  label="Nom"/>

              <div class="flex gap-6 bg-background mt-4 p-2.5 flex-wrap">
                <UiSelectOptions  title="Région"
                  column="image"
                  id="select3"
                  :disabled="false"
                  :selectedOption="selectedRegion" 
                  :table="regions"
                  @chooseOption="selectRegion" 
                  class="w-full"/>

              </div>  

              <div class="mt-4">
                <label>Rareté</label>
                <select v-model="form.rarity" class="p-2.5 mb-2 border w-full rounded-sm">
                  <option :value="undefined" disabled>
                      Sélectionner une rareté
                  </option>

                  <option
                      v-for="type in tableRarity"
                      :key="type"
                      :value="type">
                    {{ type }}
                  </option>
                </select>
              </div>

              <div class="bg-background p-2.5">
                <label> Temps</label>
                <div class="flex items-center gap-4">
                  <div  class="flex items-center gap-1 p-2.5 rounded-xl"
                        tabindex="0"
                        @keydown.enter="updateTable('MORNING')"
                        :class="form.weatherReport.includes('MORNING') ? 'bg-pink' : 'bg-white'"
                         @click="updateTable('MORNING')">
                    <img src="/assets/images/time/MORNING.webp" alt="">
                  </div>
                  <div class="flex items-center gap-1 p-2.5 rounded-xl"
                        tabindex="0"
                        @keydown.enter="updateTable('DAYTIME')"
                        :class="form.weatherReport.includes('DAYTIME') ? 'bg-pink' : 'bg-white'"
                        @click="updateTable('DAYTIME')">
                    <img src="/assets/images/time/DAYTIME.webp" alt="">
                  </div>
                  <div class="flex items-center gap-1 p-2.5 rounded-xl"
                        tabindex="0"
                        @keydown.enter="updateTable('EVENING')"
                        :class="form.weatherReport.includes('EVENING') ? 'bg-pink' : 'bg-white'"
                        @click="updateTable('EVENING')">
                    <img src="/assets/images/time/EVENING.webp" alt="">
                  </div>
                    <div class="flex items-center gap-1 p-2.5 rounded-xl"
                        tabindex="0"
                        @keydown.enter="updateTable('NIGHT')"
                        :class="form.weatherReport.includes('NIGHT') ? 'bg-pink' : 'bg-white'"
                        @click="updateTable('NIGHT')">
                        <img src="/assets/images/time/NIGHT.webp" alt="">
                    </div>

                </div>
                <div class="flex items-center gap-4 mt-4">
                  <div class="flex items-center gap-1 p-2.5 rounded-xl"
                  tabindex="0"
                  @keydown.enter="updateTable('RAIN')"
                  :class="form.weatherReport.includes('RAIN') ? 'bg-pink' : 'bg-white'"
                  @click="updateTable('RAIN')">
                    <img src="/assets/images/time/RAIN.webp" alt="" class="w-5.25">
                  </div>
                  <div class="flex items-center gap-1 p-2.5 rounded-xl"
                  tabindex="0"
                  @keydown.enter="updateTable('STARFALL')"
                  :class="form.weatherReport.includes('STARFALL') ? 'bg-pink' : 'bg-white'"
                  @click="updateTable('STARFALL')">
                    <img src="/assets/images/time/STARFALL.webp" alt="" class="w-5.25">
                  </div>
                  <div class="flex items-center gap-1 p-2.5 rounded-xl"
                  tabindex="0"
                  @keydown.enter="updateTable('STEAM')"
                  :class="form.weatherReport.includes('STEAM') ? 'bg-pink' : 'bg-white'"
                  @click="updateTable('STEAM')">
                    <img src="/assets/images/time/STEAM.webp" alt="" class="w-5.25">
                  </div>
                  <div class="flex items-center gap-1 p-2.5 rounded-xl"
                  tabindex="0"
                  @keydown.enter="updateTable('SNOWFALL')"
                  :class="form.weatherReport.includes('SNOWFALL') ? 'bg-pink' : 'bg-white'"
                  @click="updateTable('SNOWFALL')">
                    <img src="/assets/images/time/SNOWFALL.webp" alt="" class="w-5.25">
                  </div>
                  <div class="flex items-center gap-1 p-2.5 rounded-xl"
                  tabindex="0"
                  @keydown.enter="updateTable('FLOURFALL')"
                  :class="form.weatherReport.includes('FLOURFALL') ? 'bg-pink' : 'bg-white'"
                  @click="updateTable('FLOURFALL')">
                    <img src="/assets/images/time/FLOURFALL.webp" alt="" class="w-5.25">
                  </div>
                
                </div>
              </div>

              <div class="mt-4">
                <UiTextarea  title="Descriptions"  v-model:message="form.description" />
                <UiTextarea  title="Petit poisson"  v-model:message="form.tinyDescription" class="mt-2" />
                <UiTextarea  title="Poisson normal"  v-model:message="form.regularDescription" class="mt-2"/>
                <UiTextarea  title="Grand poisson"  v-model:message="form.hugeDescription" class="mt-2" />
              </div>
              
                    
              <div class="flex gap-6 bg-background mt-4 p-2.5 flex-wrap">
                <UiSelectOptions  title="Appât 1"
                                  column="image"
                                  id="select1"
                                   :disabled="false"
                                  :selectedOption="selectedBait1" 
                                  :table="items"
                                  @chooseOption="selectBait($event, 1)" 
                                  class="md:w-[47%] w-full"/>
                
                <UiSelectOptions  title="Appât 2"
                                  column="image"
                                  id="select2"
                                  :disabled="false"
                                  :selectedOption="selectedBait2" 
                                  :table="items"
                                  @chooseOption="selectBait($event, 2)"
                                  class="md:w-[47%] w-full"/>

              </div>    
                <UiLabelAndInput v-model:property="form.url"
                  id="url"
                  placeholder="Url"
                  type="text"
                  label="url"/>
  

                <UiImageInput :image="form.image"
                              v-model:file="file" />
                
                <input type="checkbox" v-model="form.checked" class="opacity-0">

                <div class="text-center">
                  <button type="submit" class="bg-background text-pink p-4 rounded-lg font-bold">{{fish?'Modifier' : 'Envoyer'}}</button>
                </div>
                
            </form> 
        </div>
    </div>
</template>

<script lang="ts" setup>
import { RarityEnum } from '~/enum/rarityEnum';
import type { CharacterDto } from '~/interfaces/characters-dto';
import type { FishDto } from '~/interfaces/fish.dto';
import type { ItemDto } from '~/interfaces/item.dto';
import type { RegionDto } from '~/interfaces/region.dto';


const props = defineProps({
    title: String,
    fish: Object as PropType<FishDto>
});

const tableRarity: RarityEnum[] = Object.values(RarityEnum)


const emit = defineEmits(['closeModal']);

const close = (fish? : FishDto) => {
  resetForm()
  emit('closeModal', fish );
};


const selectedBait1 = ref<ItemDto>()
const selectedBait2 = ref<ItemDto>()
const selectedRegion= ref<RegionDto>()
const open = ref(false)

const file = ref()

const form = reactive({
  name: '',
  image:'',
  weatherReport:[] as string[],
  description: '',
  tinyDescription: '',
  regularDescription: '',
  hugeDescription: '',
  url: '',
  rarity: undefined  as RarityEnum | undefined,
  checked: false
});

const items = ref<ItemDto[]>([])
const regions = ref<RegionDto[]>([])

const resetForm = () => {
  selectedBait1.value=undefined;
  selectedBait2.value=undefined;
  selectedRegion.value = undefined;
  file.value = undefined;
  form.name = '';
  form.image='';
  form.weatherReport= [];
  form.checked = false;
}

const selectBait= (gift:ItemDto, type: number) => {
  type === 1? selectedBait1.value = gift : selectedBait2.value = gift 
  open.value = false
}

const selectRegion= (region:RegionDto) => {
  selectedRegion.value = region
  open.value = false
}

const updateTable = (weather: string) => {
  const index = form.weatherReport.indexOf(weather);

  if (index === -1) {
    form.weatherReport.push(weather);
  } else {
    form.weatherReport.splice(index, 1);
  }
};

const send = async () => {

  const formData = new FormData()

  formData.append('name', form.name)
  formData.append('checked', String(form.checked))
  formData.append('rarity', String(form.rarity))
  formData.append('url', String(form.url))

  if(form.description){
    formData.append('description', String(form.description))
  }

  if(form.tinyDescription){
    formData.append('tinyDescription', String(form.tinyDescription))
  }

  if(form.regularDescription){
    formData.append('regularDescription', String(form.regularDescription))
  }

  if(form.hugeDescription){
    formData.append('hugeDescription', String(form.hugeDescription))
  }

  formData.append('weatherReport', JSON.stringify(form.weatherReport))

  formData.append('regionId', String(selectedRegion.value?.id))

  if(selectedBait1.value){
      formData.append('bait1Id', String(selectedBait1.value?.id))
  }

  if(selectedBait2.value){
     formData.append('bait2Id', String(selectedBait2.value?.id))
  }
 
  if (file.value) {
    formData.append('file', file.value)
  }

  if(!props.fish){
  const save : FishDto = await $fetch<FishDto>('/api/admin/fish/create', {
      method: 'POST',
      body: formData
    })

    close(save)
  }else{

    const save : FishDto = await $fetch<FishDto>(`/api/admin/fish/${props.fish.id}`, {
      method: 'PATCH',
      body: formData
    })

    close(save);
  }
}

onMounted(async () => {
  if(props.fish){
      form.name = props.fish.name;
      form.image=props.fish.image;
      form.rarity = props.fish.rarity;
      form.url= props.fish.url;
      form.description = props.fish.description;
      form.tinyDescription=props.fish.tinyDescription;
      form.regularDescription= props.fish.regularDescription;
      form.hugeDescription= props.fish.hugeDescription;
      form.weatherReport= props.fish.weatherReport;
      selectedBait1.value = props.fish.bait1;
      selectedBait2.value = props.fish.bait2;
      selectedRegion.value = props.fish.region
      }

   items.value = await $fetch<ItemDto[]>(`/api/item/all`);
   regions.value = await $fetch<CharacterDto[]>(`/api/region/all`);
})

</script>