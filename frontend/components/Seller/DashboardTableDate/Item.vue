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
        <UiStatType
          :isShowType="itemNext?.views && itemNext.views !== item?.views"
          :isDecline="+itemNext?.views > +item?.views"
        >
          {{ item?.views }}
        </UiStatType>
      </div>
    </td>
    <td class="table__td">
      <div class="table__td_flex">
        <UiStatType
          :isShowType="itemNext?.booking && itemNext.booking !== item?.booking"
          :isDecline="+itemNext?.booking > +item?.booking"
        >
          {{ item?.booking }}
        </UiStatType>
      </div>
    </td>
    <td class="table__td">
      <div class="table__td_flex">
        <UiStatType
          :isShowType="
            itemNext?.whatsapp && itemNext.whatsapp !== item?.whatsapp
          "
          :isDecline="+itemNext?.whatsapp > +item?.whatsapp"
        >
          {{ item?.whatsapp }}
        </UiStatType>
      </div>
    </td>
    <td class="table__td">AED {{ item?.price }}</td>
    <td class="table__td">
      <NuxtLink class="link" :to="`/seller/cars/${item?.car?.id}`"
        >Edit</NuxtLink
      >
    </td>
  </tr>
</template>

<script setup>
const props = defineProps({
  item: Object,
});
</script>

<style lang="scss" scoped></style>
