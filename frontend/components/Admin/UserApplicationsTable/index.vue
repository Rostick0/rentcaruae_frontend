<template>
  <table class="table">
    <tr class="table_tr">
      <th class="table__th">Id</th>
      <th class="table__th">Name</th>
      <th class="table__th">Email</th>
      <th class="table__th">Tel</th>
      <th class="table__th">Company name</th>
      <th class="table__th">Company website</th>
      <th class="table__th">Created at</th>
      <th class="table__th"></th>
    </tr>
    <AdminUserApplicationsTableItem
      v-for="item in data"
      :key="item?.id"
      :item="item"
      @setItem="(val) => (selectedApplication = val)"
    />
  </table>
  <UiModalToast
    class="modal-application"
    title="Action for user"
    :name="nameModal"
  >
    Approve or reject - {{ selectedApplication?.email }}
    <template #bottom>
      <div class="modal-application__btns">
        <UiButton @click="approve">Approve</UiButton>
        <UiButton @click="reject" variant="red">Reject</UiButton>
      </div>
    </template>
  </UiModalToast>
</template>

<script setup>
import api from "~/api";

const props = defineProps({
  data: Array,
  get: Function,
});

const selectedApplication = ref();

const nameModal = "application-action";
const { open, close, isOpen } = useModal({
  name: nameModal,
});

const approve = async () => {
  if (!selectedApplication.value) return;

  const res = await api.userApplications.accept({
    id: selectedApplication.value?.id,
  });

  if (res?.error) {
    warningPopup(res?.errorResponse?.data?.message);
    return;
  }

  await props?.get?.();
  close();
};

const reject = async () => {
  if (!selectedApplication.value) return;

  const res = await api.userApplications.deny({
    id: selectedApplication.value?.id,
  });

  if (res?.error) {
    warningPopup(res?.errorResponse?.data?.message);
    return;
  }

  await props?.get?.();
  close();
};

watch(
  () => selectedApplication.value,
  (newV) => {
    if (newV) open();
  }
);

watch(
  () => isOpen.value,
  (newV) => {
    if (!newV) selectedApplication.value = null;
  }
);
</script>

<style lang="scss" scoped>
.modal-application {
  &__btns {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
    margin: 0 auto;
    width: 100%;
    max-width: 240px;
  }
}
</style>
