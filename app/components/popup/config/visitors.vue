<template>
<div class="fixed top-0 left-0 right-0 md:bottom-0 md:top-11 flex items-center justify-center bg-gray-500/80 z-10">
    <div class="rounded bg-white shadow h-[calc(100vh-60px)]  w-full md:w-[50%] lg:w-[30%] flex flex-col">

        <div class="flex gap-2 items-center justify-between bg-background text-pink p-4">
            <h1>{{ title }}</h1>

            <ClientOnly>
                <Icon
                    name="ic:baseline-cancel"
                    size="24"
                    @click="close(undefined)"
                />
            </ClientOnly>
        </div>

<form
    class="flex-1 bg-red-50 flex flex-col min-h-0"
    @submit.prevent="send"
>

    <div class="flex w-full justify-around mt-4">
        <button
            class="border border-black text-pink p-2 rounded-lg font-bold block"
            @click="selectAllVisitor()"
            type="button">
            Tout cocher
        </button>

        <button @click="uncheckAll()"
            class="border border-black text-pink p-2 rounded-lg font-bold block"
            type="button">
            Tout décocher
        </button>


    </div>

    <div class="flex-1 overflow-y-auto pr-4 pl-4">
        
        <SearchBar v-model:elementTable="visitorList"
                type="visitor"/>
        <UiMultiSelectOption
            :selectedOptions="selectedVisitors"
            :table="visitorList"
            column="image"
            @chooseOption="selectVisitor"
        />
    </div>

    <div class="bg-white border-t p-2">
        <button
            type="submit"
            class="bg-background text-pink p-4 rounded-lg font-bold mx-auto block"
        >
            Modifier
        </button>
    </div>
</form>

    </div>
</div>
</template>

<script lang="ts" setup>
import type { VisitorUserDto } from '~/interfaces/visitor-user.dto';
import type { VisitorDto } from '~/interfaces/visitor.dto';

const props = defineProps({
    title: String,
    visitorsUser: Array as PropType<VisitorUserDto[]>
});

const emit = defineEmits(['closeModal']);

const visitorList = ref<VisitorDto[]>([])
const selectedVisitors = ref<VisitorDto[]>([])

onMounted(async () => {
   visitorList.value = await $fetch<VisitorDto[]>(`/api/visitor/all`);
   
   props.visitorsUser?.forEach((element)=>{
        selectedVisitors.value.push(element.visitor)
   })

   console.log(visitorList.value)
})

const selectAllVisitor = () => {
    visitorList.value.forEach((element)=>{
        selectedVisitors.value.push(element)
    })
}

const uncheckAll = () => {
    selectedVisitors.value=[]
}

const selectVisitor = (visitors: VisitorDto[])=> {
  selectedVisitors.value = visitors;
}

const close = (visitors? : VisitorUserDto[]) => {
  emit('closeModal', visitors );
};

const send = async() => {
    const data ={
        visitors: selectedVisitors.value,
        checked: false
    }

    const save : VisitorUserDto[] = await $fetch<VisitorUserDto[]>('/api/visitor-user/create', {
      method: 'POST',
      body: data
    })
    close(save)

}

</script>