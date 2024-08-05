<template>
  <tr class="table__tr">
    <td class="table__td">
      <UiCheckbox v-model="isSelected" />
    </td>
    <td class="table__td">{{ car?.id }}</td>
    <td class="table__td">{{ car?.title }}</td>
    <td class="table__td"></td>
    <td class="table__td">
      <UiSwitch :modelValue="isShow" @update:model-value="changeShow" />
    </td>
    <td class="table__td">
      {{ moment(car?.created_at).format("DD MMM YYYY") }}
    </td>
    <td class="table__td">
      <template v-for="item in prices" :key="item?.id">
        {{ `${item?.price} / ${item?.period}` }} <br />
      </template>
    </td>
    <td class="table__td">
      <NuxtLink class="link" :to="'/admin/cars/' + car?.id">Edit</NuxtLink>
    </td>
    <td class="table__td">
      <UiButton @click="emits('selectCar', car)" variant="outlined"
        >Promote</UiButton
      >
    </td>
  </tr>
</template>

<script setup>
import moment from "moment";
import debounce from "lodash/debounce";
import api from "~/api";

const props = defineProps({
  car: Object,
  isSelected: Boolean,
});

const emits = defineEmits(["selectCar"]);

const isShow = ref(!!props.car?.is_show);

const isSelected = ref(props.isSelected);

watch(
  () => props.isSelected,
  (newV) => (isSelected.value = newV)
);

const changeShow = debounce(async (newV) => {
  const res = await api.car.update({
    data: {
      is_show: newV,
    },
    id: props?.car?.id,
  });

  if (res?.error) return;

  isShow.value = res?.data?.is_show;
}, 300);

const prices = computed(() =>
  props.car?.price
    ?.filter?.((item) => item?.is_show)
    ?.map?.((item) => ({
      price: `AED ${formatNumber(item?.price)}`,
      period: convertPeriod(item?.period),
    }))
);
</script>

<style lang="scss" scoped></style>
