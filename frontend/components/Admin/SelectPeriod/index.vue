<template>
  <div class="select-period">
    <div class="select-period__info">
      <div class="select-period__info_item">
        <div class="select-period__title">{{ title }} {{ titleRight }}</div>
      </div>
      <div class="select-period__info_item">
        <div class="select-period__subtitle">{{ subtitle }}</div>
        <UiSelectAlternative
          :modelValue="modelValue"
          @update:modelValue="(val) => emits('update:modelValue', val)"
          :options="options"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  titleRight: String,
  subtitle: String,
  modelValue: Object,
  options: Array,
});

const emits = defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
.select-period {
  font-weight: 700;
  margin-bottom: 22px;

  &__info {
    display: flex;
    flex-direction: column;
    row-gap: 6px;

    &_item {
      display: flex;
      align-items: center;
      column-gap: 10px;
    }
  }

  &__title {
    font-size: 24px;
  }
}
</style>

<style lang="scss">
.select-period {
  .select__value {
    padding: 0;
  }
}
</style>
