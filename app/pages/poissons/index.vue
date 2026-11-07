<template>
        <h1 class="text-lg text-pink font-bold">Poissons</h1>
            <SearchBar v-model:elementTable="fishes"
            type="fish"/>

        <div class="grid grid-cols-[repeat(auto-fill,250px)] justify-center gap-4">
                <div v-for="fish in fishes"
                        class="border rounded-lg bg-white/90 border-gold shadow-md">
                                <div class="flex items-center justify-between bg-card-color pt-2.5 pb-2.5 rounded-tl-lg rounded-tr-lg">
                                        <p class="pl-2 font-bold text-xs"
                                        :style="{ color: getColorName(fish.rarity) }">
                                                {{ fish.name }}
                                        </p>

                                        <div class="pr-2">
                                                <img :src="fish.region.image" class="w-5 h-5" alt="">
                                        </div>
                                </div>

                                <div class="flex flex-col gap-3 p-2.5 hover:bg-gray-100 ">
                                        <NuxtLink class="flex flex-col items-center gap-6"
                                         :to="`/poissons/${fish.id}`">
                                                <img :src="fish.image" class="w-20 h-20 object-contain" alt="">

                                                <div class="flex gap-2">
                                                        <div v-for="weather in fish.weatherReport">
                                                                <img :src="getTimeImage(weather)" class="h-5 w-5" alt="">
                                                        </div>
                                                </div>

                                                
                                        
                                        </NuxtLink>
                                </div>
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