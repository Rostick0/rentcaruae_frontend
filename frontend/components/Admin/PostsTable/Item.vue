<template>
  <tr>
    <td class="table__td">{{ item?.id }}</td>
    <td class="table__td">
      {{
        truncate(item?.title, {
          length: 30,
          separator: "...",
        })
      }}
    </td>
    <td class="table__td">{{ item?.post_category?.name }}</td>
    <td class="table__td">
      {{ moment(item?.created_at).format("DD MMM YYYY") }}
    </td>
    <td class="table__td">
      <NuxtLink class="link" :to="`/admin/posts/${item?.id}/`">Edit</NuxtLink>
    </td>
  </tr>
</template>

<script setup>
import truncate from "lodash/truncate";
import moment from "moment";

const props = defineProps({
  item: Object,
});
</script>
