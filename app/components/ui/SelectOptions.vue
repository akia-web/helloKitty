
<template>
    <div class="relative" :id="props.id">
        <label>{{ props.title }}</label>

        <button
            type="button"
             :disabled="props.disabled"
            @click="open = !open"
                :class="[
        'flex w-full items-center gap-3 rounded-lg border px-4 py-2',
        props.disabled
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60'
            : 'bg-white cursor-pointer hover:bg-gray-50'
    ]"
        >
            <img
                v-if="selectedOption"
                :src="String(selectedOption[props.column])"
                class="w-5 rounded object-cover"
            />

            <span>{{ selectedOption?.name || 'Choisir un item' }}</span>
        </button>

        <div
            v-if="open"
            class="absolute z-10 mt-2 max-h-60 w-full overflow-y-auto rounded-lg border bg-white shadow scrollbar-thin"
        >
            <input
                v-model="search"
                type="text"
                placeholder="Rechercher..."
                class="sticky top-0 w-full border-b px-4 py-2 outline-none bg-white"
                @click.stop
            />

            <div
                v-for="item in filteredTable"
                :key="item.name"
                @click="selectOption(item)"
                class="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-100"
            >
                <img
                    :src="String(item[props.column])"
                    class="w-5 rounded object-cover"
                />

                <span>{{ item.name }}</span>
            </div>

            <p
                v-if="filteredTable.length === 0"
                class="px-4 py-2 text-sm text-gray-500"
            >
                Aucun résultat
            </p>
        </div>
    </div>
</template>

<script setup lang="ts" generic="T extends { name: string }">
const props = defineProps<{
    title?: string
    id?: string
    selectedOption?: T
    table: T[]
    column: keyof T,
    disabled: boolean
}>()

const emit = defineEmits<{
    chooseOption: [item: T]
}>()

const open = ref(false)
const search = ref('')

const filteredTable = computed(() => {
    return props.table.filter(item =>
        item.name.toLowerCase().includes(search.value.toLowerCase().trim())
    )
})

const handleClickOutside = (event: MouseEvent) => {
    const element = document.getElementById(props.id ?? '')

    if (element && !element.contains(event.target as Node)) {
        open.value = false
    }
}

const selectOption = (item: T) => {
    emit('chooseOption', item)
    open.value = false
    search.value = ''
}

watch(open, (isOpen) => {
    if (isOpen) {
        search.value = ''
    }
})

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>
