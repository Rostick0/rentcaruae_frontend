<template>
  <h1 class="h1 seller">Profile</h1>
  <SellerProfileForm :user="user" :getUser="getUser" />
</template>

<script setup>
const { user, getUser } = await useAuth();

definePageMeta({
  layout: "seller",
});
</script>
