<template>
  <UiTextarea 
    v-model="field" 
  
    :invalid="invalid"
    :rightIcon="rightIcon"
    :message="message"
    :label="label"
    :placeholder="placeholder"
    :maska="maska"
    :dataMaskReserved="dataMaskReserved"
    :maskaTokens="maskaTokens"
    :errorMessage="errorMessage"
    />
</template>
<script setup>
import { useField } from 'vee-validate';

const emits = defineEmits(["update:modelValue"])

const props = defineProps({
  name:String,
  modelValue:[String,Number],
  rules:String,
  convertTo:Function,

  // Пропсы ниже все попадают внутрь UiField
  invalid:Boolean,
  rightIcon:String,
  message:String,
  label:String,
  placeholder:String,
  maska:String,
  dataMaskReserved:String,
  maskaTokens:String,
  errorMessage:String
});

const field = computed({
  get(){
    return props.modelValue
  },
  set(value){
    emits('update:modelValue',value)
  }
})

const { errorMessage, value } = useField(props.name,
  props.rules,
  {
    initialValue: props.modelValue
  },
);

watch(() => field.value, () => {
  value.value = props.convertTo?.call(this, value?.value, field.value) ?? field.value;
}, {
  deep: true
});

</script>
