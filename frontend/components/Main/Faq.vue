<template>
  <div class="faq">
    <h2 class="faq__title">Frequently Asked Questions</h2>
    <div class="faq__content">
      <div class="faq-item">
        <h3 class="faq-item__title">Practical Information</h3>
        <div class="faq-item__list">
          <UiSpoiler>
            <template #title>What about parking availability?</template>
            <template #content>
              We charge daily rental fees, using the 24-hour time format. For
              example, a car rented at 2:00 pm will be due back at the same time
              the following day. We urge all customers to verify the return date
              and time to avoid extra charges. The best course of action is to
              contact our team of professionals and provide them with the
              necessary information.
            </template>
          </UiSpoiler>
          <UiSpoiler>
            <template #title
              >On what schedule do you charge for the rental?</template
            >
            <template #content>
              We charge daily rental fees, using the 24-hour time format. For
              example, a car rented at 2:00 pm will be due back at the same time
              the following day. We urge all customers to verify the return date
              and time to avoid extra charges. The best course of action is to
              contact our team of professionals and provide them with the
              necessary information.
            </template>
          </UiSpoiler>
          <UiSpoiler>
            <template #title
              >What can I expect to pay for car rentals in Dubai?</template
            >
            <template #content>
              We charge daily rental fees, using the 24-hour time format. For
              example, a car rented at 2:00 pm will be due back at the same time
              the following day. We urge all customers to verify the return date
              and time to avoid extra charges. The best course of action is to
              contact our team of professionals and provide them with the
              necessary information.
            </template>
          </UiSpoiler>
          <UiSpoiler>
            <template #title
              >Can I rent a car from Dubai International Airport 24/7?</template
            >
            <template #content>
              We charge daily rental fees, using the 24-hour time format. For
              example, a car rented at 2:00 pm will be due back at the same time
              the following day. We urge all customers to verify the return date
              and time to avoid extra charges. The best course of action is to
              contact our team of professionals and provide them with the
              necessary information.
            </template>
          </UiSpoiler>
        </div>
      </div>
      <div class="faq-item">
        <h3 class="faq-item__title">Practical Information</h3>
        <div class="faq-item__list">
          <UiSpoiler>
            <template #title>What about parking availability?</template>
            <template #content>
              We charge daily rental fees, using the 24-hour time format. For
              example, a car rented at 2:00 pm will be due back at the same time
              the following day. We urge all customers to verify the return date
              and time to avoid extra charges. The best course of action is to
              contact our team of professionals and provide them with the
              necessary information.
            </template>
          </UiSpoiler>
          <UiSpoiler>
            <template #title
              >On what schedule do you charge for the rental?</template
            >
            <template #content>
              We charge daily rental fees, using the 24-hour time format. For
              example, a car rented at 2:00 pm will be due back at the same time
              the following day. We urge all customers to verify the return date
              and time to avoid extra charges. The best course of action is to
              contact our team of professionals and provide them with the
              necessary information.
            </template>
          </UiSpoiler>
          <UiSpoiler>
            <template #title
              >What can I expect to pay for car rentals in Dubai?</template
            >
            <template #content>
              We charge daily rental fees, using the 24-hour time format. For
              example, a car rented at 2:00 pm will be due back at the same time
              the following day. We urge all customers to verify the return date
              and time to avoid extra charges. The best course of action is to
              contact our team of professionals and provide them with the
              necessary information.
            </template>
          </UiSpoiler>
          <UiSpoiler>
            <template #title
              >Can I rent a car from Dubai International Airport 24/7?</template
            >
            <template #content>
              We charge daily rental fees, using the 24-hour time format. For
              example, a car rented at 2:00 pm will be due back at the same time
              the following day. We urge all customers to verify the return date
              and time to avoid extra charges. The best course of action is to
              contact our team of professionals and provide them with the
              necessary information.
            </template>
          </UiSpoiler>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.faq {
  &__title {
    display: flex;
    align-items: center;
    margin-bottom: 14px;
    min-height: 44px;
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 24px;
  }

  &-item {
    &__title {
      font-size: 16px;
      font-weight: 500;
    }

    &__list {
      display: flex;
      flex-direction: column;
      row-gap: 8px;
      margin-top: 8px;
    }
  }
}
</style>
