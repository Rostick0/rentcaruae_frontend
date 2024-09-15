<template>
  <LazyUiModal :name="name" position="bottom">
    <div class="modal-bottom modal-pwa">
      <button class="modal-pwa__close" @click="close">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.827 10.5002L16.7258 4.60135C17.0922 4.23517 17.0922 3.64104 16.7258 3.27487C16.3593 2.90838 15.7658 2.90838 15.3993 3.27487L9.50047 9.17367L3.60135 3.27487C3.23486 2.90838 2.64135 2.90838 2.27487 3.27487C1.90838 3.64104 1.90838 4.23517 2.27487 4.60135L8.17399 10.5002L2.27487 16.399C1.90838 16.7651 1.90838 17.3593 2.27487 17.7254C2.45811 17.9084 2.69826 18 2.93811 18C3.17795 18 3.4181 17.9084 3.60135 17.7251L9.50047 11.8263L15.3993 17.7251C15.5825 17.9084 15.8227 18 16.0625 18C16.3024 18 16.5425 17.9084 16.7258 17.7251C17.0922 17.359 17.0922 16.7648 16.7258 16.3987L10.827 10.5002Z"
            fill="#221EE3"
          />
        </svg>
      </button>
      <div class="modal-pwa__top">
        <div class="modal-pwa__icon d-flex">
          <LazyNuxtImg
            class="modal-pwa__img"
            src="favicons/favicon-96x96.png"
            alt=""
            width="84"
            height="84"
          />
        </div>
        <div class="modal-pwa__">Add to home screen</div>
        <h2 class="modal-pwa__title">Install RentCarUAE App</h2>
      </div>
      <ol class="modal-pwa__list">
        <li class="modal-pwa__item">
          <span>
            Tap on the
            <strong class="color-basic">Share</strong>
            button below
          </span>
          <div class="modal-pwa__btn">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.3976 19.9998H4.88628C3.84635 19.9998 3 19.1535 3 18.1135V7.60405C3 6.56412 3.84635 5.71777 4.88628 5.71777H7.21515C7.60664 5.71777 7.92175 6.03375 7.92175 6.42437C7.92175 6.81586 7.60577 7.13097 7.21515 7.13097H4.88694C4.62652 7.13097 4.41386 7.34451 4.41386 7.60405V18.1127C4.41386 18.3731 4.6274 18.5857 4.88694 18.5857H15.3955C15.656 18.5857 15.8686 18.3722 15.8686 18.1127V7.60405C15.8686 7.34363 15.6551 7.13097 15.3955 7.13097H13.0667C12.6752 7.13097 12.3601 6.81499 12.3601 6.42437C12.3601 6.03288 12.6761 5.71777 13.0667 5.71777H15.3955C16.4355 5.71777 17.2818 6.56412 17.2818 7.60405V18.1127C17.2818 19.1535 16.4355 19.9998 15.3973 19.9998L15.3976 19.9998Z"
                fill="#4693FE"
              />
              <path
                d="M13.5025 3.06699L10.6423 0.206782C10.5398 0.104351 10.407 0.0331716 10.2647 0.0114695C10.0424 -0.0310658 9.80287 0.0470604 9.64227 0.206782L6.78207 3.06699C6.50689 3.34216 6.50689 3.78921 6.78207 4.06438C7.05724 4.33956 7.50428 4.33956 7.77946 4.06438L9.43309 2.41075V12.1442C9.43309 12.5357 9.74907 12.8508 10.1397 12.8508C10.5312 12.8508 10.8463 12.5349 10.8463 12.1442V2.41075L12.4999 4.06438C12.6379 4.2024 12.8176 4.27098 12.9999 4.27098C13.6223 4.27532 13.9469 3.50883 13.5025 3.06699Z"
                fill="#4693FE"
              />
            </svg>
          </div>
        </li>
        <li class="modal-pwa__item">
          <span>
            Select <strong class="color-basic">Add to Home Screen</strong>
          </span>
          <div class="modal-pwa__btn">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1281_16307)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10 5C10.1894 5 10.3711 5.07525 10.5051 5.20921C10.639 5.34316 10.7143 5.52485 10.7143 5.71429V9.28571H14.2857C14.4752 9.28571 14.6568 9.36097 14.7908 9.49492C14.9247 9.62888 15 9.81056 15 10C15 10.1894 14.9247 10.3711 14.7908 10.5051C14.6568 10.639 14.4752 10.7143 14.2857 10.7143H10.7143V14.2857C10.7143 14.4752 10.639 14.6568 10.5051 14.7908C10.3711 14.9247 10.1894 15 10 15C9.81056 15 9.62888 14.9247 9.49492 14.7908C9.36097 14.6568 9.28571 14.4752 9.28571 14.2857V10.7143H5.71429C5.52485 10.7143 5.34316 10.639 5.20921 10.5051C5.07525 10.3711 5 10.1894 5 10C5 9.81056 5.07525 9.62888 5.20921 9.49492C5.34316 9.36097 5.52485 9.28571 5.71429 9.28571H9.28571V5.71429C9.28571 5.52485 9.36097 5.34316 9.49492 5.20921C9.62888 5.07525 9.81056 5 10 5Z"
                  fill="black"
                />
                <rect
                  x="0.75"
                  y="0.75"
                  width="18.5"
                  height="18.5"
                  rx="3.25"
                  stroke="black"
                  stroke-width="1.5"
                />
              </g>
              <defs>
                <clipPath id="clip0_1281_16307">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </li>
        <li class="modal-pwa__item">
          <span>Select <strong class="color-basic">Add</strong></span>
        </li>
      </ol>
      <div class="modal-pwa__advantages">
        <div class="modal-pwa-advantage">
          <div class="modal-pwa-advantage__inner">
            <svg
              width="37"
              height="38"
              viewBox="0 0 37 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.5368 27.235H30.3166C28.9726 21.9434 29.1004 18.1141 29.1004 15.2679C29.1004 10.8803 26.3641 7.11322 22.4925 5.54938V4.95171C22.4925 2.77343 20.7009 1 18.5 1C16.2992 1 14.5076 2.77328 14.5076 4.95171V5.54938C10.6359 7.11315 7.89965 10.8806 7.89965 15.2679C7.89965 18.0565 8.03462 21.9153 6.68347 27.235H6.46325C2.51225 27.235 2.51225 33.1538 6.46325 33.1538H14.4195C14.6837 35.318 16.5478 37 18.804 37C21.0602 37 22.9256 35.3181 23.19 33.1538H30.5366C34.4877 33.1538 34.4878 27.235 30.5368 27.235ZM15.5734 4.95178C15.5734 3.35429 16.8861 2.05491 18.5001 2.05491C20.1141 2.05491 21.4269 3.35429 21.4269 4.95178V5.18381C20.4977 4.91944 19.5145 4.77741 18.5001 4.77741C17.4857 4.77741 16.5039 4.91944 15.5734 5.18381V4.95178ZM8.96543 15.2694C8.96543 10.0663 13.242 5.83198 18.5001 5.83198C23.7569 5.83198 28.0349 10.0649 28.0349 15.2694C28.0349 18.0903 27.9056 21.9236 29.2183 27.2365L7.78333 27.2351C9.08331 21.9773 8.96543 18.1843 8.96543 15.2694ZM18.8042 35.9456C17.1363 35.9456 15.7496 34.7348 15.4938 33.1542H22.1145C21.8588 34.7348 20.4722 35.9456 18.8042 35.9456ZM30.5368 32.0993H6.46345C3.9203 32.0993 3.9203 28.2898 6.46345 28.2898H30.5368C33.08 28.2898 33.08 32.0993 30.5368 32.0993ZM22.5977 9.95649C19.8401 8.24229 17.1606 8.24229 14.4029 9.95649C13.8076 10.3277 13.2393 9.43478 13.836 9.06352C16.9304 7.13835 20.069 7.13835 23.1645 9.06352C23.757 9.43194 23.1973 10.3291 22.5977 9.95649Z"
                fill="white"
                stroke="white"
                stroke-width="0.5"
              />
            </svg>
            <span>Push notifecations</span>
          </div>
        </div>
        <div class="modal-pwa-advantage">
          <div class="modal-pwa-advantage__inner">
            <svg
              width="37"
              height="36"
              viewBox="0 0 37 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.48771 14.2722C4.94293 14.2722 4.5 13.8308 4.5 13.2845V8.93855C4.50309 6.2131 6.7131 4.00316 9.43855 4H14.1487C14.6935 4 15.1365 4.44293 15.1365 4.98771C15.1365 5.53403 14.6935 5.97542 14.1487 5.97542H9.43855C7.80421 5.97851 6.4785 7.30267 6.47542 8.93855V13.2845C6.47542 13.5468 6.37202 13.7984 6.18682 13.9836C6.00163 14.1688 5.75005 14.2722 5.48771 14.2722Z"
                fill="white"
              />
              <path
                d="M31.4815 14.3152C30.9352 14.3152 30.4938 13.8738 30.4938 13.3274V8.98152C30.4892 7.34718 29.165 6.02301 27.5307 6.01839H22.8173C22.271 6.01839 21.8296 5.577 21.8296 5.03068C21.8296 4.4859 22.271 4.04297 22.8173 4.04297H27.5307C30.2561 4.0476 32.4645 6.25607 32.4692 8.98152V13.3274C32.4692 13.5898 32.3643 13.8414 32.1791 14.0265C31.9939 14.2117 31.7423 14.3152 31.4815 14.3152Z"
                fill="white"
              />
              <path
                d="M27.5387 31.9726H22.8407C22.296 31.9726 21.853 31.5312 21.853 30.9848C21.853 30.4401 22.296 29.9971 22.8407 29.9971H27.5387C29.173 29.9925 30.4972 28.6684 30.5018 27.034V22.7157C30.5018 22.171 30.9432 21.728 31.4895 21.728C32.0343 21.728 32.4772 22.171 32.4772 22.7157V27.0617C32.4572 29.7763 30.2533 31.9678 27.5387 31.9726Z"
                fill="white"
              />
              <path
                d="M14.1763 31.9726H9.46296C6.73752 31.9679 4.52916 29.7595 4.52441 27.034V22.7157C4.52441 22.171 4.9658 21.728 5.51212 21.728C6.05691 21.728 6.49983 22.171 6.49983 22.7157V27.0617C6.50446 28.696 7.82862 30.0202 9.46296 30.0248H14.1763C14.7211 30.0248 15.164 30.4677 15.164 31.0125C15.164 31.5573 14.7211 32.0002 14.1763 32.0002V31.9726Z"
                fill="white"
              />
            </svg>
            <span>Fullscreen browsing</span>
          </div>
        </div>
        <div class="modal-pwa-advantage">
          <div class="modal-pwa-advantage__inner">
            <svg
              width="37"
              height="36"
              viewBox="0 0 37 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.5 12.8139C12.3226 12.8139 7.3139 17.8226 7.3139 24C7.3139 24.5011 6.90805 24.9069 6.40695 24.9069C5.90698 24.9069 5.5 24.5011 5.5 24C5.5 16.8204 11.3204 11 18.5 11C25.6796 11 31.5 16.8204 31.5 24C31.5 24.5011 31.093 24.9069 30.5931 24.9069C30.0919 24.9069 29.6861 24.5011 29.6861 24C29.6861 17.8226 24.6774 12.8139 18.5 12.8139Z"
                fill="white"
              />
              <path
                d="M20.9183 22.7902C20.9183 24.1268 19.8356 25.2095 18.5002 25.2095C17.1647 25.2095 16.082 24.1268 16.082 22.7902C16.082 21.4547 17.1647 20.3721 18.5002 20.3721C19.8356 20.3721 20.9183 21.4548 20.9183 22.7902Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.2178 22.8186L22.9895 17.0469C23.3432 16.692 23.9179 16.692 24.2717 17.0469C24.6265 17.4006 24.6265 17.9754 24.2717 18.3291L18.5 24.1008L17.2178 22.8186Z"
                fill="white"
              />
            </svg>
            <span>Improved performance</span>
          </div>
        </div>
      </div>
    </div>
  </LazyUiModal>
</template>

<script setup>
const name = "pwa";

const { open, close } = useModal({
  name,
});
onMounted(() => {
  setTimeout(() => {
    open();
  }, 1000 * 60 * 5);
});
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/components/modal-bottom";

.modal-pwa {
  padding-top: 32px;
  padding-bottom: 32px;
  position: relative;

  &__close {
    display: flex;
    position: absolute;
    top: 12px;
    right: 20px;
  }

  &__top {
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 8px;
    margin-bottom: 24px;
  }

  &__list {
    background-color: var(--color-text20);
    border-radius: 20px;
    counter-reset: num;
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    padding: 12px;
    margin-bottom: 16px;
  }

  &__item {
    display: flex;
    align-items: center;
    column-gap: 8px;

    &::before {
      background-color: var(--color-basic);
      color: var(--color-white);
      border-radius: 30px;
      content: counter(num);
      counter-increment: num;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-weight: 700;
      line-height: 1;
      padding: 0 5px;
      min-width: 20px;
      height: 30px;
    }
  }

  &__btn {
    background-color: var(--color-white);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-left: auto;
    width: 36px;
    height: 36px;
  }

  &__advantages {
    background-color: var(--color-basic);
    color: var(--color-white);
    border-radius: 20px;
    display: flex;
    column-gap: 8px;
    text-align: center;
    padding: 16px 4px;
  }

  &-advantage {
    display: flex;
    align-items: center;
    column-gap: 8px;
    flex-basis: calc(33%);

    &::after {
      background-color: var(--color-white);
      content: "";
      display: block;
      opacity: 0.3;
      width: 1px;
      height: calc(100% - 2px);
    }

    &:last-child {
      flex-basis: calc(33% - 8px);
      &::after {
        content: none;
      }
    }

    &__inner {
      display: flex;
      align-items: center;
      flex-direction: column;
      row-gap: 8px;
    }
  }
}
</style>
