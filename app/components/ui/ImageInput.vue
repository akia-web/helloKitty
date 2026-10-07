<template>
    <div class="w-full">
        <div class="flex flex-col gap-2 mt-4">
                <label
                    for="image"
                    @mouseenter="isHovering = true"
                    @mouseleave="isHovering = false"
                    ref="dropZone"
                    class="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-gray-600 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                >
                    📁
                    <span>{{ fileName || message? message: "Choisir une image"  }}</span>
                </label>

                <input
                    id="image"
                    type="file"
                    class="hidden"
                    @change="onFileChange"
                />
            </div>

            <div class="relative">
                <img
                    v-if="props.image || preview"
                    :src="preview ? preview : props.image"
                    alt="Aperçu"
                    class="h-12.5 rounded-lg object-cover mt-4"
                />

                <ClientOnly
                    v-if="image && preview"
                    class="absolute top-0 left-32"
                >
                    <Icon
                        name="ic:baseline-cancel"
                        size="24"
                        @click="previous"
                    />
                </ClientOnly>
            </div>
    </div>
    
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

const props = defineProps({
    file: {
        type: Object as PropType<File | undefined>,
        required: false
    },
    image: String,
    message: String
})

const emit = defineEmits(['update:file'])
const dropZone = ref<HTMLElement | null>(null)
const isHovering = ref(false)

const localFile = ref<File>()

const file = computed({
    get: () => localFile.value,
    set: value => {
        localFile.value = value
        emit('update:file', value)
    }
})

const fileName = ref('')
const preview = ref('')

const onFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement

    if (input.files && input.files.length > 0) {
        const selectedFile = input.files[0]!

        file.value = selectedFile
        fileName.value = selectedFile.name

        createPreview()
    } else {
        clearFile()
    }
}

const createPreview = () => {
    if (!file.value) {
        return
    }

    if (preview.value) {
        URL.revokeObjectURL(preview.value)
    }

    preview.value = URL.createObjectURL(file.value)
}

const onPaste = (event: ClipboardEvent) => {
    if (!isHovering.value) {
        return
    }
    console.log("j'ai collé")

    const items = event.clipboardData?.items

    if (!items) {
        return
    }

    for (const item of items) {
        if (!item.type.startsWith('image/')) {
            continue
        }

        const pastedFile = item.getAsFile()

        if (pastedFile) {
            file.value = pastedFile
            fileName.value = pastedFile.name

            console.log('je crée la preview')
            console.warn(file.value)

            createPreview()

            event.preventDefault()
        }

        break
    }
}

const clearFile = () => {
    if (preview.value) {
        URL.revokeObjectURL(preview.value)
    }

    preview.value = ''
    file.value = undefined
    fileName.value = ''
}

const previous = () => {
    clearFile()
}

onMounted(() => {
    window.addEventListener('paste', onPaste)
})

onBeforeUnmount(() => {
    window.removeEventListener('paste', onPaste)

    if (preview.value) {
        URL.revokeObjectURL(preview.value)
    }
})
</script>