<template>
        <h1 class="text-lg text-pink font-bold">Poissons</h1>
            <SearchBar v-model:elementTable="fishes"
            type="fish"/>

        <div class="grid grid-cols-[repeat(auto-fill,250px)] justify-center gap-4">
                <div v-for="fish in fishes"
                        class="border rounded-lg bg-white/90 border-gold shadow-md">
                        <a :href="fish.url" target="_blank"  rel="noopener noreferrer">
                                <div class="flex items-center justify-between bg-card-color pt-2.5 pb-2.5 rounded-tl-lg rounded-tr-lg">
                                        <p class="pl-2 font-bold text-xs"
                                        :style="{ color: getColorName(fish.rarity) }">
                                                {{ fish.name }}
                                        </p>

                                        <div class="pr-2">
                                                <img :src="fish.region.image" class="w-[20px] h-[20px]" alt="">
                                        </div>
                                </div>

                                <div class="flex flex-col gap-3 p-2.5 ">
                                        <div class="flex flex-col items-center gap-6">
                                                <img :src="fish.image" class="w-20 h-20 object-contain" alt="">

                                                <div class="flex gap-2">
                                                        <div v-for="weather in fish.weatherReport">
                                                                <img :src="getTimeImage(weather)" class="h-5 w-5" alt="">
                                                        </div>
                                                </div>

                                                
                                        
                                        </div>
                                        <hr v-if="fish.bait1 || fish.bait2" class="border border-pink">



                                        <div v-if="fish.bait1 || fish.bait2">
                                                <p class="font-semibold text-xs">Appâts</p>
                                                <div class="flex mt-2 gap-2">
                                                        <img :src="fish.bait1?.image" class="w-6.25 h-6.25 object-contain" alt="">
                                                        <p class="text-xs">{{ fish.bait1?.name }}</p>
                                                </div>
                                                <div class="flex mt-2 gap-2">
                                                        <img :src="fish.bait2?.image" class="w-6.25 h-6.25 object-contain" alt="">
                                                        <p class="text-xs">{{ fish.bait2?.name }}</p>
                                                </div>
                                        </div>
                                <hr class="border border-pink" v-if="fish.description || fish.tinyDescription|| fish.regularDescription || fish.hugeDescription">
                                        <div>
                                                <p v-if="fish.description"></p>
                                                <p v-if="fish.tinyDescription" class="text-xs mb-1"><span class="font-semibold">•Petit :</span> {{ fish.tinyDescription }} </p>
                                                <p v-if="fish.regularDescription" class="text-xs mb-1"><span class="font-semibold">•Moyen :</span> {{ fish.regularDescription }}</p>
                                                <p v-if="fish.hugeDescription" class="text-xs"><span class="font-semibold">•Grand :</span> {{ fish.hugeDescription }}</p>
                                        </div>
                                        
                                </div>
                        </a>
        </div>

    </div>
    
</template>
<script lang="ts" setup>
import type { FishDto } from '~/interfaces/fish.dto';

const fishes = ref<FishDto[]>([])

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
</script>