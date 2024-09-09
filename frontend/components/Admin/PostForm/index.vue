<template>
  <div class="form__fields">
    <AnyFormBlock title="Post meta">
      <div class="form-item">
        <div class="form__fields_inner">
          <VFormComponent :field="title" />
          <VFormComponent :field="title_link" />
        </div>
        <VFormComponent :field="image" />
      </div>
      <div class="form-item">
        <VFormComponent :field="car_id" />
        <VFormComponent :field="post_category_id" />
      </div>
    </AnyFormBlock>
    <AnyFormBlock title="Info">
      <VFormComponent :field="short_description" />
      <VFormComponent :field="content" />
    </AnyFormBlock>

    <div class="form__bottom">
      <div class="form__flex_switch">
        <VFormComponent :field="is_show" />
        <UiButton>Save</UiButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "~/api";

const props = defineProps({
  post: Object,
});

const title = ref({
  type: "text",
  name: "title",
  rules: "required|max:255",
  modelValue: props.post?.title ?? "",

  bind: {
    label: "Title",
  },
});

const title_link = ref({
  type: "text",
  name: "title_link",
  rules: "required|max:255",
  modelValue: props.post?.title_link ?? "",

  bind: {
    label: "Link",
  },
});

const image = ref({
  type: "photo-loader",
  name: "image",
  modelValue: { path_webp: props.post?.image?.image?.path_webp },

  bind: {
    title: "Upload logo",
    // subtitle: "140 x 56 pix",
  },
});

const car_id = ref({
  type: "select",
  name: "car_id",
  rules: "required",
  modelValue: props?.post?.car
    ? {
        ...props?.post?.car,
        name: `${props.post?.car?.title} #${props.post?.car?.id}`,
      }
    : {},

  bind: {
    label: "Car",
    debounceMs: 200,
    searchFn: fetchCar,
    withIcon: false,
  },
});

const post_category_id = ref({
  type: "select",
  name: "post_category_id",
  rules: "required",
  modelValue: props?.post?.post_category ?? {},

  bind: {
    label: "Category",
    options: postCategories,
  },
});

const short_description = ref({
  type: "textarea",
  name: "short_description",
  rules: "required|max:600",
  modelValue: props.post?.short_description ?? "",

  bind: {
    label: "Short description",
    rows: 4,
  },
});

const content = ref({
  type: "ckeditor",
  name: "content",
  rules: "required|max:65536",
  modelValue: props.post?.content ?? "",

  bind: {
    rows: 4,
  },
});

const is_show = ref({
  type: "switch",
  name: "is_show",
  modelValue: !!props.post?.is_show,

  bind: {
    label: "Publish on website",
  },
});

async function fetchCar(_, searchString, limit, page) {
  return await api.car
    .getAll({
      params: {
        "filterLIKE[title]": searchString?.split?.("#", 1)[0],
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
