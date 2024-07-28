<template>
  <tr class="table_tr">
    <td class="table__td">
      {{ moment(car?.created_at).format("DD MMM YYYY") }}
    </td>
    <td class="table__td">{{ car?.refreshes }}</td>
    <td class="table__td">{{ car?.special_offers }}</td>
    <td class="table__td">
      <div class="table__td_flex">
        <UiStatType :isShowType="car?.id < 3" :isDecline="car?.id == 2">
          {{ car?.total_views }}
        </UiStatType>
      </div>
    </td>
    <td class="table__td">
      <div class="table__td_flex">
        <UiStatType>
          {{ car?.booking }}
        </UiStatType>
      </div>
    </td>
    <td class="table__td">
      <div class="table__td_flex">
        <UiStatType>
          {{ car?.whatsapp }}
        </UiStatType>
      </div>
    </td>
    <td class="table__td">AED {{ car?.price_daily }}</td>
    <td class="table__td">
      <NuxtLink class="link" to="/">More</NuxtLink>
    </td>
  </tr>
</template>

<script setup>
import moment from "moment";

const props = defineProps({
  car: Object,
});
</script>

<style lang="scss" scoped></style>
