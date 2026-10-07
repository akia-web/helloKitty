<template>



        <div class="flex flex-col">
            <div
                v-for="item in table"
                :key="item.name"
                @click="selectOption(item)"
                class="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-100">
            <ClientOnly>
                <Icon
                    :name="isSelected(item) ? 'material-symbols:visibility-rounded' : 'mdi-light:eye-off'"
                    :class="{
                            'text-pink': isSelected(item),
                            'text-black': !isSelected(item)
                            }"
                    size="24"
                />
            </ClientOnly>

                <img
                    :src="String(item[props.column])"
                    class="w-5 rounded object-cover"
                    alt=""
                >

                <span>{{ item.name }}</span>
            </div>
        </div>
</template>

<script setup lang="ts" generic="T extends { name: string }">

const props = defineProps<{
    title?: string
    id?: string
    selectedOptions?: T[]
    table: T[]
    column: keyof T
}>()

const emit = defineEmits<{
    chooseOption: [items: T[]]
}>()

const selectedOptions = computed(() => props.selectedOptions ?? [])

const isSelected = (item: T) => {
    return selectedOptions.value.some(
        selected => selected.name === item.name
    )
}

const selectOption = (item: T) => {
    console.warn(item)

    const selected = [...selectedOptions.value]

    const index = selected.findIndex(
        selectedItem => selectedItem.name === item.name
    )

    if (index !== -1) {
        selected.splice(index, 1)
    } else {
        selected.push(item)
    }

    emit('chooseOption', selected)
}

</script>

