<template>
  <tr class="table_tr">
    <td class="table__td">
      {{ moment(item?.date).format("DD MMM YYYY") }}
    </td>
    <td class="table__td">{{ item?.refreshes }}</td>
    <td class="table__td">{{ item?.special_offers }}</td>
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
      <NuxtLink class="link" :to="`/seller/date/${item?.date}`">More</NuxtLink>
    </td>
  </tr>
</template>

<script setup>
import moment from "moment";

const props = defineProps({
  item: Object,
  itemNext: Object,
});
</script>
