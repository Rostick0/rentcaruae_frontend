<template>
  <div class="rental-service">
    <h2 class="rental-service__title">Car rental service</h2>
    <div class="rental-service__content">
      <div class="rental-service__description">
        <p>
          RentCarUAE is a car rental service in Dubai. With us, you can rent a
          car for one or several days, weeks, or even months. We carefully
          select suppliers, conducting a full audit and continuous checks
          through secret shoppers to ensure your rental experience is perfect.
          Renting affordable cars for a month or even a year is very simple and
          can be done in just a few clicks.
        </p>
        <br />
        <h3 class="rental-service__description_title">Daily Rental</h3>
        <p>
          Daily rental is a great way to get acquainted with a car before buying
          or committing to a long-term rental. You can rent a car for one day
          with the option to extend the contract at a favorable price.
        </p>
        <br />
        <h3 class="rental-service__description_title">Weekly Rental</h3>
        <p>
          Planning a vacation or business trip to Dubai? Then renting a car for
          a week or more at a special price is your choice! Renting a car is
          much more cost-effective than taking taxis and allows you to enjoy all
          the attractions of Dubai.
        </p>
        <br />
        <h3 class="rental-service__description_title">Monthly Rental</h3>
        <p>
          An economy car or a luxurious SUV with a monthly rental becomes more
          advantageous and allows you to enjoy your trip or business visit.
          Renting a car for a month allows you to pick it up right at the
          airport and return it at any convenient location.
        </p>
        <br />
        <h3 class="rental-service__description_title">Cheap Car Rental</h3>
        <p>
          We have selected the best offers from our partners starting from AED
          220. BMW, Toyota, Nissan, and many other economical cars with minimal
          fuel consumption and low prices are available. They can be rented for
          one day or for a whole year with an additional discount of up to 30%.
          Our service allows you to sort the offers of all our partners and
          choose the best price, both among all cars and among cars of a
          specific brand.
        </p>
        <br />
        <h3 class="rental-service__description_title">Payment Methods</h3>
        <p>
          Our partners accept cash and bank cards for car rental payments, and
          quite often, you can pay using cryptocurrency.
        </p>
        <br />
        <h3 class="rental-service__description_title">Popular Car Brands for Rent in Dubai</h3>
        <p>
          Audi, Mercedes, and Range Rover are the most popular brands among
          business-class cars. Ferrari, Lamborghini, and Porsche are leaders in
          the luxury segment. You can choose an SUV, convertible, or sports car
          of almost any brand with free delivery to any place in Dubai.
        </p>
      </div>
      <NuxtLink class="rental-service__link text-ui" to="/">
        Show more
      </NuxtLink>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.rental-service {
  margin-bottom: 42px;

  &__title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    min-height: 44px;
  }

  &__content {
    max-width: 840px;

    p {
      line-height: 1;
    }
  }

  &__description {
    font-size: 14px;
    margin-bottom: 4px;

    &_title {
        margin-bottom: 6px;
    }
  }

  &__link {
    color: var(--color-basic);
    display: block;
    padding: 12px 16px;
    margin-left: auto;
    width: fit-content;
  }
}
</style>
