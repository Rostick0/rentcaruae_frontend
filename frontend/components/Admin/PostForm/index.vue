<template>
  <AnyFormBlock title="Model car">
    <div class="form-item">
      <div class="form__fields_inner">
        <VFormComponent :field="title" />
        <VFormComponent :field="car_id" />
      </div>
      <VFormComponent :field="image" />
    </div>
  </AnyFormBlock>
</template>

<script setup>
import api from "~/api";

const props = defineProps({
  post: Object,
});

const title = ref({
  type: "text",
  name: "name",
  modelValue: props.post?.title ?? "",

  bind: {
    label: "Title",
  },
});

const image = ref({
  type: "photo-loader",
  name: "image",
  modelValue: { path_webp: props.post?.image_url },

  bind: {
    title: "Upload logo",
    // subtitle: "140 x 56 pix",
  },
});

const car_id = ref({
  type: "select",
  name: "car_id",
  modelValue: props?.post?.car ?? {},

  bind: {
    label: "Model car",
    debounceMs: 200,
    searchFn: fetchCar,
    withIcon: false,
  },
});

async function fetchCar(_, searchString, limit, page) {
  return await api.car.getAll({
    params: {
      "filterLIKE[name]": searchString,
      limit,
      page,
    },
  });
}
</script>
