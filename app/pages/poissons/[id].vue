<template>
    <div v-if="fish" class="mt-8 bg-white p-2 rounded-xl">
        <div class="flex items-center mt-4 border-b border-pink p-2">
            <div class="w-[33%]">
                <img :src="fish.region.image"  alt="">
            </div>
            <div class="w-[33%]">
                <h1 class="text-pink text-center">{{ fish.name }}</h1> 
            </div>

            <div class="w-[33%]">
                <a :href="fish.url" 
                    class="block text-right text-pink underline italic"
                    target="_blank"
                     rel="noopener noreferrer">Lien wiki</a>
            </div>

        </div>

       
       <div class="flex mt-4 justify-center items-center gap-4">
            <p class="pl-2 font-bold text-xs"
                                        :style="{ color: getColorName(fish.rarity) }">
                                                {{ getRarity(fish.rarity) }}
                                        </p>
            <img :src="fish.image" class="w-25 h-25 object-contain" alt="">
       </div>



        <div class="p-4 md:mt-8 flex gap-4 justify-between 2xl:mx-auto flex-wrap 2xl:w-[70%]">
            <div class="md:border md:border-pink rounded-xl p-2  w-full md:w-70  md:shadow-md">
                <h2 class="underline mb-2 md:text-center">Appâts</h2>

                <div class="flex mt-2 gap-2">
                    <img :src="fish.bait1?.image" class="w-6.25 h-6.25 object-contain" alt="">
                    <p class="text-xs">{{ fish.bait1?.name }}</p>
                </div>

                <div class="flex mt-2 gap-2" 
                    v-if="fish.bait2">
                    <img :src="fish.bait2.image" class="w-6.25 h-6.25 object-contain" alt="">
                    <p class="text-xs">{{ fish.bait2?.name }}</p>
                </div>
            </div>
            <div class="md:border md:border-pink rounded-xl p-2  w-full md:w-70  md:shadow-md">
                <h2 class="underline mb-2 md:text-center">Temps</h2>
                <div class="flex gap-2 md:justify-center">
                    <div v-for="weather in fish.weatherReport">
                            <img :src="getTimeImage(weather)" class="h-5 w-5" alt="">
                    </div>
                </div>
            </div>
            
            <div class="md:border md:border-pink rounded-xl p-2 w-full md:w-70  md:shadow-md">
                <h2 class="underline mb-2 md:text-center">Lieu</h2>
                <div>
                    <p v-if="fish.description">{{ fish.description }}</p>
                    <p v-if="fish.tinyDescription" class="text-xs mb-1"><span class="font-semibold">•Nain :</span> {{ fish.tinyDescription }} </p>
                    <p v-if="fish.regularDescription" class="text-xs mb-1"><span class="font-semibold">•Normal :</span> {{ fish.regularDescription }}</p>
                    <p v-if="fish.hugeDescription" class="text-xs"><span class="font-semibold">•Géant :</span> {{ fish.hugeDescription }}</p>
                </div>

            </div>

        </div>
        

        
    </div>




</template>
<script lang="ts" setup>
import type { FishDto } from '~/interfaces/fish.dto';

const route = useRoute()

const fishId = Number(route.params.id)
const fish = ref<FishDto>()

onMounted(async ()=>{
   fish.value =  await $fetch<FishDto>(`/api/fish/${fishId}`)
})

const timeImages = import.meta.glob('~/assets/images/time/*.webp', {
    eager: true,
    import: 'default',
    query: '?url'
}) as Record<string, string>;

const getTimeImage = (weather: string) => {
    return timeImages[`/assets/images/time/${weather}.webp`]
        ?? timeImages[`/assets/images/time/${weather}.webp`.replace('/assets/', '/')]
};

const getColorName = (name: string) => {
        switch(name){
                case 'COMMON':
                        return '#8fcd83'
                case 'UNCOMMON':
                        return '#7695ed'
                case 'RARE':
                        return '#9B72C8'
        }
}

const getRarity = (name:string)=>{
            switch(name){
                case 'COMMON':
                        return 'COMMUN'
                case 'UNCOMMON':
                        return 'PEU COMMUN'
                case 'RARE':
                        return 'RARE'
        }
}


</script>