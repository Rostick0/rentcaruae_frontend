<template>
  <form @submit="onSubmit">
    <AdminPostForm :post="data" />
  </form>
  <br />
  <UiButton @click="open" variant="red">Delete</UiButton>
  <AnyModalDelete :functionConfirm="functionConfirm" />
</template>

<script setup>
import { useForm } from "vee-validate";
import api from "~/api";

const router = useRouter();
const id = useRoute().params.id;

const { data, get } = await useApi({
  name: "posts.get",
  params: {
    extends: "car,image.image,post_category",
    without_cache: true,
  },
  requestParams: {
    id,
  },
});
await get();

const { handleSubmit, setErrors } = useForm();

const onSubmit = handleSubmit(
  async (values) => {
    const data = await getPostOnSubmitValues(values);

    const res = await api.posts.update({
      data,
      id,
    });

    if (res?.error) {
      warningPopup(res?.errorResponse?.data?.message);
      setErrors(res?.errorResponse?.data?.errors);
      return;
    }

    router.go(-1);
  },
  () => {
    warningPopup("Not all fields are valid");
  }
);

const { open } = useModal({
  name: "delete-modal",
});

const functionConfirm = async () => {
  await api.posts.delete({ id });
  router.go(-1);
};

definePageMeta({
  layout: "admin",
});
</script>
ƒ
