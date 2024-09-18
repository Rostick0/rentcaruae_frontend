<template>
  <tr>
    <td class="table__td">{{ item?.id }}</td>
    <td class="table__td">{{ item?.full_name }}</td>
    <td class="table__td">{{ item?.email }}</td>
    <td class="table__td">{{ item?.tel }}</td>
    <td class="table__td">{{ item?.company_name }}</td>
    <td class="table__td">
      <a class="color-basic" :href="item?.company_website" target="_blank">{{
        item?.company_website
      }}</a>
    </td>
    <td class="table__td">
      {{ moment(item?.created_at).format("DD MMM YYYY") }}
    </td>
    <td class="table__td">
      <UiButton class="table__btn" @click="emits('setItem', item)"
        >Action</UiButton
      >
    </td>
  </tr>
</template>

<script setup>
import moment from "moment";

const props = defineProps({
  item: Object,
});

const emits = defineEmits(["setItem"]);
</script>
