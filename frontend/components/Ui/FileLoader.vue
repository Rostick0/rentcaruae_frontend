<template>
    <UiControl :label="label" :invalid="!!errorMessage || invalid" :message="errorMessage || message"
        :rightIcon="rightIcon">
        <div class="control__fileloader fileloader">
            <input @change="handleOnFileChange" v-bind="$attrs" class='fileloader__input' type="file" />
        </div>
    </UiControl>
</template>
<script setup>
defineComponent({
    inheritAttrs: false
})

const emits = defineEmits(["update:modelValue"])

const props = defineProps({
    modelValue: String,
    invalid: Boolean,
    rightIcon: String,
    message: String,
    label: String,
    placeholder: String,
    maska: String,
    dataMaskaReversed: Boolean,
    maskaTokens: String,
    errorMessage: String,
    onChange: Function,
    deps: [Array, Object, String, Number],
    onDepsChange: {
        type: Function
    },
    forceDeps: Boolean
});


const handleOnFileChange = (e) => {
    const files = e.target.files
    if (!files?.length) {
        return emits('update:modelValue', null)
    }
    const file = files[0]
    emits('update:modelValue', file)
}

</script>

<style lang="scss"></style>