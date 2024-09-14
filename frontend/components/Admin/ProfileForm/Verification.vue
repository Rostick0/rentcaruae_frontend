<template>
  <AnyFormBlock class="verification" title="Verification status">
    <div class="verification__list">
      <div class="verification__item" v-if="user?.company?.license?.file">
        <VFormComponent :field="is_trade_license" />
        <a
          class="link"
          :href="user?.company?.license?.file?.path"
          target="_blank"
          >Show</a
        >
        <VFormComponent
          v-if="user?.company?.license && !is_trade_license.modelValue"
          :field="reason_is_trade_license"
        />
      </div>
      <div class="verification__item" v-if="user?.company?.sertificate?.file">
        <VFormComponent :field="is_vat_sertificate" />
        <a
          class="link"
          :href="user?.company?.sertificate?.file?.path"
          target="_blank"
          >Show</a
        >
        <VFormComponent
          v-if="user?.company?.sertificate && !is_vat_sertificate.modelValue"
          :field="reason_is_vat_sertificate"
        />
      </div>

      <VFormComponent :field="is_verified" />
    </div>
  </AnyFormBlock>
</template>

<script setup>
const props = defineProps({
  user: Object,
});

const is_trade_license = ref({
  type: "switch",
  name: "is_trade_license",
  modelValue: props.user?.company?.is_trade_license,

  bind: {
    label: "Verified trade license",
  },
});

const reason_is_trade_license = ref({
  type: "text",
  name: "reason.is_trade_license",
  rules: "required",
  modelValue: "",

  bind: {
    label: "Reason reject trade license",
    placeholder: "Reason",
  },
});

const is_vat_sertificate = ref({
  type: "switch",
  name: "is_vat_sertificate",
  modelValue: props.user?.company?.is_vat_sertificate,

  bind: {
    label: "Verified vat sertificate",
  },
});

const reason_is_vat_sertificate = ref({
  type: "text",
  name: "reason.is_vat_sertificate",
  rules: "required",
  modelValue: "",

  bind: {
    label: "Reason reject vat sertificate",
    placeholder: "Reason",
  },
});

const is_verified = ref({
  type: "switch",
  name: "user.is_verified",
  modelValue: !!props.user?.is_verified,

  bind: {
    label: "Verified",
  },
});
</script>

<style lang="scss" scoped>
.verification {
  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }

  &__item {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }

  &__btn {
    margin-left: auto;
    width: fit-content;
  }
}
</style>
