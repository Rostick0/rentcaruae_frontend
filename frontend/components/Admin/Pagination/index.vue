<template>
  <div class="admin-pagination" v-if="totalCountData > limit">
    <div class="admin-pagination__info">
      {{ (currentPage - 1) * limit + 1 }} - {{ currentPage * limit }} of
      {{ totalCountData }} items
    </div>
    <div class="admin-pagination__btns">
      <button class="admin-pagination__btn" @click="prevClick">Previous</button>
      <button class="admin-pagination__btn" @click="nextClick">Next</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: [Number, String],
  limit: [Number, String],
  totalCountData: [Number, String],
});

const emit = defineEmits(["setPage"]);

const lastPage = computed(() =>
  Math.ceil(props?.totalCountData / props?.limit)
);

const prevClick = () =>
  props?.currentPage > 1 && emit("setPage", props?.currentPage - 1);
const nextClick = () =>
  props?.currentPage < lastPage.value &&
  emit("setPage", props?.currentPage + 1);
</script>

<style lang="scss" scoped>
.admin-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;

  &__info {
    color: #344054;
    font-size: 14px;
    font-weight: 700;
  }

  &__btns {
    display: flex;
    column-gap: 14px;
  }

  &__btn {
    background-color: var(--color-white);
    border: 1px solid #d0d5dd;
    box-shadow: 0 1px 2px 0 #1018280d;
    border-radius: 8px;
    color: #344054;
    font-size: 14px;
    font-weight: 700;
    padding: 7px 14px;
  }
}
</style>
