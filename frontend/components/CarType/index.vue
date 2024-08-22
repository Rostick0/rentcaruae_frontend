<template>
  <div class="car-type__list">
    <UiButton
      class="car-type__item"
      @click="emits('update:modelValue', '')"
      :variant="modelValue === '' ? 'standard' : 'outlined'"
    >
      All Cars
    </UiButton>
    <UiButton
      v-for="type in carType"
      :key="type.name"
      class="car-type__item text-pre-small"
      :class="{ active: modelValue === type.name.toLowerCase() }"
      @click="emits('update:modelValue', type.name.toLowerCase())"
      :variant="
        modelValue === type.name.toLowerCase() ? 'standard' : 'outlined'
      "
    >
      <LazyNuxtImg
        :src="type.img"
        loading="lazy"
        :alt="type.name"
        width="52"
        height="26"
      />
      <span>{{ type.name }}</span>
    </UiButton>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
});

const emits = defineEmits(["update:modelValue"]);

const carType = [
  {
    name: "SUV",
    img: "images/car-type/SUV.png",
  },
  {
    name: "VAN",
    img: "images/car-type/VAN.png",
  },
  {
    name: "Sedan",
    img: "images/car-type/Sedan.png",
  },
  {
    name: "Coupe",
    img: "images/car-type/Coupe.png",
  },
  {
    name: "Cabrio",
    img: "images/car-type/Cabrio.png",
  },
  {
    name: "Hatchback",
    img: "images/car-type/Hatchback.png",
  },
  {
    name: "Liftback",
    img: "images/car-type/Liftback.png",
  },
];
</script>

<style lang="scss" scoped>
.car-type {
  &__list {
    display: flex;
    column-gap: 12px;
    overflow: auto;
    margin-bottom: 20px;
  }

  &__item {
    display: flex;
    font-weight: 700;
    align-items: center;
    column-gap: 4px;
    padding: 7px 7.75px;

    &.outlined {
      color: var(--color-black);
    }

    &:first-child {
      padding: 12px 15px;
    }
  }
}
</style>
