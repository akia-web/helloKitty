<template>
  <div>
    <input
      type="text"
      class="border border-gold w-full p-2.5 rounded-lg mt-4 mb-4 placeholder:gold text-card-color bg-white/90"
      v-model="searchElement"
      placeholder="Rechercher"
    >
  </div>
</template>

<script lang="ts" setup>

import type { PropType } from 'vue'
import type { CharacterDto } from '~/interfaces/characters-dto'
import type { FlowerUserDto } from '~/interfaces/flower-user.dto'
import type { FlowerDto } from '~/interfaces/flower.dto'
import type { ItemDto } from '~/interfaces/item.dto'
import type { VisitorUserDto } from '~/interfaces/visitor-user.dto'
import type { VisitorDto } from '~/interfaces/visitor.dto'

const props = defineProps({
  elementTable: Array as PropType<CharacterDto[] | ItemDto[] | FlowerDto[]| VisitorUserDto[] | FlowerUserDto[]>,
  type: {
    type: String as PropType<'character' | 'item' | 'visitor' | 'flower' |'flower-user'| 'visitor-user'>,
    required: true
  }
})

const emit = defineEmits([
  'update:elementTable'
])

const searchElement = ref('')

let timeout: ReturnType<typeof setTimeout>

const elementTable = computed({
  get: () => props.elementTable,
  set: value => emit(`update:elementTable`, value)
})

const searchApi = async (query?: {}) => {
    elementTable.value = await $fetch<CharacterDto[]| ItemDto[]|VisitorDto[]>(`/api/${props.type}/all`, {
      query,
    })
}

onMounted(async () => {
  await searchApi()
})

onBeforeUnmount(() => {
  clearTimeout(timeout)
})

watch(searchElement, (newValue) => {
  clearTimeout(timeout)

  timeout = setTimeout(async () => {
    await searchApi(
      newValue
        ? { search: newValue }
        : undefined
    )
  }, 200)
})

</script>