<template>
    <h1>Chose à faire</h1>
    <div class="flex items-center gap-2">
        <label for="">Objet pirate</label>
        <input type="checkbox" class="opacity-0">
    </div>

    <div class="flex items-center gap-2">
        <label for="">Bulles sous-marine</label>
        <input type="checkbox" class="opacity-0">
    </div>

</template>
<script lang="ts" setup>

const auth = useAuthStore()
const showModal = ref(false)
const titleModal = ref('')


    
onMounted(async ():Promise<void> =>{
    // dreamsnaps.value = await $fetch<DreamsnapDto[]>('/api/dreamsnap/all')
})

// const openModal = (title: string, dreamsnap?: DreamsnapDto):void =>{
//     titleModal.value = title
//     selectedDreamsnap.value = dreamsnap   
//     showModal.value = true 
// }

// const handleCloseModal = (dreamsnap? : DreamsnapDto):void => {
//     showModal.value = false
//     selectedDreamsnap.value = undefined
    
//     if (dreamsnap && dreamsnap.id) {
//             const index = dreamsnaps.value.findIndex(
//                 c => c.id === dreamsnap.id
//             )

//             if (index !== -1) {
//                 dreamsnaps.value[index] = dreamsnap
//             } else {
//                 dreamsnaps.value.push(dreamsnap)
//             }

//         dreamsnaps.value.sort(
//             (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
//         )
//     }
// }
</script>