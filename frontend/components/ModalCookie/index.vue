<template>
  <UiModal name="cookie" position="bottom" cancelCloseOuter>
    <div class="modal-cookie">
      <div class="modal-cookie__content">
        <template v-if="isCustomize">
          <div class="modal-cookie__content_item">
            <div>
              <span class="color-basic">Technical</span> — provides
              authentication, navigation and other important functions. Their
              absence may disrupt the operation of RenrCarUAE sites and
              services, so they are used by default.
            </div>
            <UiSwitch modelValue />
          </div>
          <div class="modal-cookie__content_item">
            <div>
              <span class="color-basic">Analytical/marketing</span> — improve
              the quality of work with RentCarUAE services. They remember
              preference settings, anonymously analyze site traffic and allow
              you to display relevant ads.
            </div>
            <UiSwitch v-model="analyticalCookie" />
          </div>
          <div class="modal-cookie__content_item">
            <div>
              <span class="color-basic">Other cookies</span> — perform service
              functions and make it easier to work with RentCarUAE sites and
              services. These files help you remember the page status, select a
              region, save personal preferences, and more.
            </div>
            <UiSwitch v-model="otherCookie" />
          </div>
        </template>
        <template v-else>
          <div class="modal-cookie__short-text">
            RentCarUAE uses cookies: technical, analytical, marketing and
            others. They are necessary for the optimal operation of sites and
            services, help RentCarUAE recognize you and store your settings.
            Read more in the
            <NuxtLink class="color-basic" to="/privacy_policy" target="_blank"
              >Policy.</NuxtLink
            >
          </div>
        </template>
      </div>
      <div class="modal-cookie__btns">
        <UiButton @click="isCustomize = !isCustomize" variant="outlined"
          >Customize</UiButton
        >
        <UiButton class="modal-cookie__big-btn" @click="onAccepted"
          >Accept</UiButton
        >
      </div>
    </div>
  </UiModal>
</template>

<script setup>
const { open, close, isOpen } = useModal({
  name: "cookie",
});

const acceptedCookie = useCookie("accepted_cookie");

const analyticalCookie = ref(true);
const otherCookie = ref(true);

const route = useRoute();

const cookieWatch = watch(
  () => route.path,
  (newV) => {
    if (newV === "/privacy_policy") {
      close();
      return;
    }

    if (!isOpen.value) open();
  }
);

if (acceptedCookie.value) {
  cookieWatch();
}

const onAccepted = () => {
  acceptedCookie.value = true;
  useCookie("analytical_cookie").value = analyticalCookie.value;
  useCookie("other_cookie").value = otherCookie.value;
  close();
  cookieWatch();
};

onMounted(() => {
  if (!acceptedCookie.value && route.path !== "/privacy_policy") {
    open();
  }
});

const isCustomize = ref(false);
</script>

<style lang="scss" scoped>
.modal-cookie {
  background-color: var(--color-white);
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  max-width: 790px;

  &__content {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    margin-bottom: 20px;

    &_item {
      display: flex;
      align-items: center;
      column-gap: 40px;
    }
  }

  &__short-text {
    width: 100%;
    max-width: 411px;
  }

  &__btns {
    display: flex;
    column-gap: 20px;
    justify-content: flex-end;
  }

  &__big-btn {
    width: 100%;
    max-width: 320px;
  }

  @media (max-width: 1024px) {
    border-radius: 20px 20px 0 0;
  }
}
</style>
