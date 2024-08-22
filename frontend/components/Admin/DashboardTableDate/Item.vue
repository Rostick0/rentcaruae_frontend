<template>
  <tr class="table_tr">
    <td class="table__td">
      {{ item?.car?.generation?.model_car?.brand?.name }}
    </td>
    <td class="table__td">
      {{ item?.car?.generation?.model_car?.name }}
    </td>
    <td class="table__td"></td>
    <td class="table__td">
      <div class="table__td_flex">
        <UiStatType :isShowType="item?.id < 3" :isDecline="item?.id == 2">
          {{ item?.views }}
        </UiStatType>
      </div>
    </td>
    <td class="table__td">
      <div class="table__td_flex">
        <UiStatType>
          {{ item?.booking }}
        </UiStatType>
      </div>
    </td>
    <td class="table__td">
      <div class="table__td_flex">
        <UiStatType>
          {{ item?.whatsapp }}
        </UiStatType>
      </div>
    </td>
    <td class="table__td">AED {{ item?.price }}</td>
    <td class="table__td">
      <NuxtLink class="link" :to="`/admin/cars/${item?.car?.id}`">Edit</NuxtLink>
    </td>
  </tr>
</template>

<script setup>
import moment from "moment";

const props = defineProps({
  item: Object,
});
</script>

<style lang="scss" scoped></style>
