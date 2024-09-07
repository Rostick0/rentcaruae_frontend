<template>
  <AnyFormBlock title="Post meta">
    <div class="form-item">
      <div class="form__fields_inner">
        <VFormComponent :field="title" />
        <VFormComponent :field="car_id" />
      </div>
      <VFormComponent :field="image" />
    </div>
  </AnyFormBlock>
  <AnyFormBlock title="Info">
    <VFormComponent :field="short_description" />
    <VFormComponent :field="content" />
     <!-- <UiCkeditor /> -->
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
    label: "Car",
    debounceMs: 200,
    searchFn: fetchCar,
    withIcon: false,
  },
});

const short_description = ref({
  type: "textarea",
  name: "short_description",
  modelValue: props.post?.short_description ?? "",

  bind: {
    label: "Short description",
    rows: 4,
  },
});

const content = ref({
  type: "ckeditor",
  name: "content",
  modelValue: props.post?.content ?? "",

  bind: {
    // label: "Content",
    rows: 4,
  },
});

async function fetchCar(_, searchString, limit, page) {
  return await api.car
    .getAll({
      params: {
        "filterLIKE[name]": searchString,
        limit,
        page,
      },
    })
    .then((res) => ({
      ...res,
      data: res?.data?.map((item) => ({
        ...item,
        name: `${item?.title} #${item?.id}`,
      })),
    }));
}
</script>
