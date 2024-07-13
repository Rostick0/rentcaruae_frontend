<template>
    <UiControl
        :label="label"
        :invalid="!!errorMessage"
        :message="errorMessage || message"
    >
        <UiMPhotoLoader
            :modelValue="selectedImages"
            @update:modelValue="handleChangeSelectedImage"
            @remove="handleRemoveSelectedImage"
        />
    </UiControl>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';

interface Props {
    name: string,
    initialValue?: any[],
    rules?: any
    message?: string
    label?: string
    placeholder?: string
    searchImage?: (id: number) => Promise<any>
    uploadFn?: (image: any) => any
    converTo?: (value: any) => any
}

const props = defineProps<Props>()

const { value, errorMessage, resetField, validate } = useField<any>(props.name, props.rules, {
    initialValue: props.initialValue?.map(item => item?.file?.id).join() || ''
});

const selectedImages = ref<any[] | any>([])

async function getFilesByIds(ids?: number[]) {
    if (props.searchImage && ids?.length) {
        const images = []

        for (let i = 0; i < ids.length; i++) {
            const image = await props?.searchImage(ids[i])
            // images.push("http://37.77.105.221/storage/" + (image.path || image.url || image.link))
            image.path = (image.path || image.url || image.link)
            images.push(image)
        }
        return images
    }
}

selectedImages.value = await getFilesByIds(props.initialValue?.map(item => item?.file.id)) || []

async function handleChangeSelectedImage(fileObject: any) {
    if (props.uploadFn && fileObject) {
        const fileEntity = await props.uploadFn(fileObject)
        
        selectedImages.value.push(fileEntity)
        value.value = selectedImages.value.map((item: any) => item.id).join(",")
    }
    else {
        selectedImages.value = []
        value.value = []
    }

    // !BUG Баг с валидацией, скорее всего required не работает с массивами
    validate()
}
async function handleRemoveSelectedImage(file: any) {
    value.value = value.value?.split(",").filter((item: any) => item != file.id).join(',') || []
    selectedImages.value = selectedImages.value.filter((item: any) => item.id !== file.id) || []
}

</script>

