<template>
  <div class="faq faq-page">
    <div class="container">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <h1 class="h1 faq__h1">Frequently Asked Questions</h1>
      <p>Discover the best car rental service in UAE with RentCarUAE</p>
      <div class="faq-list">
        <div class="faq-item">
          <h2 class="faq-item__title text-ui">Getting started</h2>
          <div class="faq-item__content">
            <UiSpoiler>
              <template #title
                >What documents do I need for car rental in the UAE?</template
              >
              <template #content>
                <p>
                  The necessary documents for renting a car in the UAE vary
                  depending on whether you're a tourist or a resident. Here’s
                  what you’ll need:
                </p>
                <br />
                <figure>
                  <figcaption class="text-information__figcaption">
                    For tourists:
                  </figcaption>
                  <ul class="text-information__ul">
                    <li class="text-information__li">
                      A valid international driving permit.
                    </li>
                    <li class="text-information__li">Your passport.</li>
                    <li class="text-information__li">
                      A form of payment, such as a credit or debit card, or
                      cash.
                    </li>
                  </ul>
                </figure>
                <br />
                <figure>
                  <figcaption class="text-information__figcaption">
                    For UAE residents:
                  </figcaption>
                  <ul class="text-information__ul">
                    <li class="text-information__li">
                      A valid UAE driving license.
                    </li>
                    <li class="text-information__li">Your passport.</li>
                    <li class="text-information__li">A resident visa.</li>
                    <li class="text-information__li">An Emirates ID.</li>
                    <li class="text-information__li">
                      Payment options including cash, credit, or debit card.
                    </li>
                  </ul>
                </figure>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >Getting Started Can I rent a car without a credit
                card?</template
              >
              <template #content>
                <p>
                  Absolutely! You can make a cash deposit instead. However, keep
                  in mind that this deposit will typically be returned only 21
                  to 26 days after you return the vehicle. This time frame
                  accounts for any fines that might still be issued after the
                  car is back in our possession.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >How long does It take to get a rental car delivered?</template
              >
              <template #content>
                <p>
                  Delivery times can vary based on your location, the time of
                  day, and current traffic conditions. For example, morning rush
                  hours can lead to delays, while afternoons might see quicker
                  deliveries since most commuters are at work. On average, you
                  can expect delivery to take anywhere from 45 minutes to 2
                  hours. It's always a good idea to check with a company
                  representative to ensure there are no unexpected delays.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >Can I pick up my rental car from Dubai airport?</template
              >
              <template #content>
                <p>
                  Yes, we can deliver the car directly to the airport for you.
                  Please note that there is an additional fee for this service,
                  starting at a minimum of 126 AED.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >Can I rent a car with a new driving license in the
                UAE?</template
              >
              <template #content>
                <p>
                  Yes, it’s acceptable. Keep in mind that you should follow
                  local traffic rules.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >What should I do if I have an accident in a rental
                car?</template
              >
              <template #content>
                <p>
                  In the unfortunate event of an accident, your first step is to
                  contact the police to file a report. For minor accidents, you
                  can also use the police application to submit your report.
                </p>
                <br />
                <p>
                  Afterward, be sure to notify the rental company’s
                  representative. Obtaining a detailed accident report is
                  crucial, as insurance claims typically require this
                  documentation; without it, you may be responsible for covering
                  the damage yourself.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >What is the fuel policy for car rentals in the UAE?</template
              >
              <template #content>
                <p>
                  We adhere to a full-to-full fuel policy, meaning the vehicle
                  should be returned with the same fuel level it had when you
                  picked it up.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >Is my personal data secure when using your service?
              </template>
              <template #content>
                <p>
                  Rest assured; your privacy is our top priority. We have
                  implemented a comprehensive confidentiality policy to ensure
                  that your personal information is well-protected and handled
                  with the utmost care.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >Can anyone else drive the rental car other than me?</template
              >
              <template #content>
                <p>
                  Yes, but it must be agreed with the car company beforehand.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title>Can I hire a driver for my rental car?</template>
              <template #content>
                <p>
                  Yes, but please confirm it with the rental car company.
                  Remember that it is not allowed to sublease the car.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >Do I need to refuel the car before returning it?</template
              >
              <template #content>
                <p>
                  Yes, you should return the car with the same fuel level as
                  when you picked it up, or you may be charged for refueling.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >What should I do if I have mechanical issues with the
                car?</template
              >
              <template #content>
                <p>
                  Contact the rental company’s roadside assistance for help and
                  follow their instructions.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title>What are the driving rules in Dubai?</template>
              <template #content>
                <p>
                  Drive on the right side, obey speed limits, and always wear a
                  seatbelt. Traffic fines are strictly enforced.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title>What is Salik, and how do I use it?</template>
              <template #content>
                <p>
                  Salik is Dubai’s electronic toll collection system for its
                  paid roads. Key highways are equipped with electronic gates,
                  known as Salik Gates, which your vehicle will pass through.
                  Each registered vehicle must have a Salik tag (a sticker
                  attached to the windshield) that contains vehicle information.
                  As your car goes through the gates, the system automatically
                  deduces the toll from the owner's balance.
                </p>
                <br />
                <figure>
                  <figcaption class="text-information__figcaption">
                    There are roads operating under this system, for example:
                  </figcaption>
                  <ul class="text-information__ul">
                    <li class="text-information__li">Sheikh Zayed Road;</li>
                    <li class="text-information__li">Al Garhoud Bridge;</li>
                    <li class="text-information__li">Al Maktoum Bridge;</li>
                    <li class="text-information__li">Al Barsha;</li>
                    <li class="text-information__li">
                      Al Mamzar South and North.
                    </li>
                  </ul>
                </figure>
                <br />
                <p>
                  The driver should reimburse the amount when returning the car.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >What happens if I return the car later than
                scheduled?</template
              >
              <template #content>
                <p>
                  If you return the car within one hour of the agreed-upon time,
                  there will be no additional charges. However, if the delay
                  exceeds one hour, you will be charged for an extra day of
                  rental.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title>Can I extend my rental period?</template>
              <template #content>
                <p>
                  Yes, you can easily extend your rental. We offer a renewal
                  option through a payment link, or you can settle the payment
                  in cash or with a card.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >Is it possible to rent a car with a U.S. license or a license
                from another country?</template
              >
              <template #content>
                <p>
                  Yes, for tourists, an international driving license is
                  accepted, making it easy for you to rent a car.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >What is the minimum age to rent a car in Dubai?</template
              >
              <template #content>
                <p>
                  Drivers must be at least 21 years old to rent a vehicle in
                  Dubai.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >Are international driving licenses accepted in the
                UAE?</template
              >
              <template #content>
                <p>
                  Yes, international driving licenses are accepted throughout
                  the UAE.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title>Can I rent a car in Dubai at age 18?</template>
              <template #content>
                <p>No, the starting age is from 21 years old.</p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >What documents do I need to rent a car in Dubai?</template
              >
              <template #content>
                <p>
                  You’ll need a valid driver’s license, a passport or Emirates
                  ID, and a credit card for the security deposit.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >Is my foreign driver’s license valid in Dubai?</template
              >
              <template #content>
                <p>
                  Yes, most foreign driver’s licenses are accepted, but it’s
                  recommended to have an International Driving Permit (IDP) as
                  well.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title>Do I need insurance to rent a car?</template>
              <template #content>
                <p>
                  Basic insurance is already included. But anyway, it’s
                  advisable to check for additional coverage options for peace
                  of mind.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >Can I add an additional driver to my rental?</template
              >
              <template #content>
                <p>
                  Yes, additional drivers can be added for a fee, but they must
                  also meet rental requirements and be present at pickup.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title>How do I make a reservation?</template>
              <template #content>
                <p>Reservations can be made online through our website.</p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title>Can I rent a car if I’m a tourist?</template>
              <template #content>
                <p>
                  Yes, tourists can rent cars in Dubai, provided they have the
                  necessary documentation, including an international driving
                  permit.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >Are there any restrictions on driving in Dubai?</template
              >
              <template #content>
                <p>
                  Yes, certain areas like private estates and desert terrains
                  may have restrictions. Always check local regulations and your
                  rental agreement.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >What should I do if I lose the car keys?</template
              >
              <template #content>
                <p>
                  Contact the rental company immediately for assistance. You may
                  incur a replacement fee.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title>Can I rent a car for a few hours?</template>
              <template #content>
                <p>Yes, we offer hourly car rental.</p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >What is the process for returning the car?</template
              >
              <template #content>
                <p>
                  Return the car to the designated location, fill up the tank,
                  and complete any necessary paperwork with the staff.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >What should I do if my rental car breaks down?</template
              >
              <template #content>
                <p>
                  Contact the rental company’s roadside assistance for help and
                  follow their guidelines for vehicle issues.
                </p>
              </template>
            </UiSpoiler>
          </div>
        </div>

        <div class="faq-item">
          <h2 class="faq-item__title text-ui">Our Cars</h2>
          <div class="faq-item__content">
            <UiSpoiler>
              <template #title
                >Some essential tips for renting a car in Dubai</template
              >
              <template #content>
                <ol class="text-information__ol">
                  <li class="text-information__li">
                    Familiarize yourself with local traffic laws
                  </li>
                  <li class="text-information__li">
                    Choose reputable rental companies
                  </li>
                  <li class="text-information__li">
                    review rental terms and policies. Always read the fine print
                    regarding terms of use, insurance coverage, and other
                    important policies before signing.
                  </li>
                </ol>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title>What are the best cars for rent?</template>
              <template #content>
                <p>
                  The best car for you depends on your individual preferences
                  and planned activities. If you're looking for a comfortable
                  family getaway, we recommend our spacious SUVs. for a scenic
                  drive, consider opting for a stylish convertible. Ultimately,
                  choose a car that resonates with your desires and enjoy the
                  journey!
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >How do I get the value car hire in Dubai?
              </template>
              <template #content>
                <p>
                  Follow our website
                  <a :href="config.public.BASE_URL">{{
                    config.public.BASE_URL?.replace("https://", "")
                  }}</a
                  >. We provide competitive prices, starting from AED 139 per
                  day.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >What is the minimum cost of renting a car for one
                month?</template
              >
              <template #content>
                <p>A minimum of AED 1499.</p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title>Is monthly rent cost-effective?</template>
              <template #content>
                <p>Yes, it is. Monthly rental is cheaper than daily rent.</p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >Does your service offer life and health insurance?</template
              >
              <template #content>
                <p>
                  Unfortunately, we do not provide life or health insurance as
                  part of our rental service.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >Which cars are available for less than 150 AED daily?</template
              >
              <template #content>
                <p>
                  RentCarUAE provides a variety of budget-friendly options.
                  Simply navigate to the "Economy" section on our website to
                  explore affordable choices. for example, you can rent a JAC
                  JS4 or Geely Emgrand starting from just 150 AED per day.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >Do you provide accident and recovery service?</template
              >
              <template #content>
                <p>
                  Currently, we do not offer accident and recovery services.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >What type of cars are available for rent?</template
              >
              <template #content>
                <p>
                  We provide a range of vehicles from economy to luxury cars,
                  SUVs, and VANs.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title>Can I rent a car with a driver?</template>
              <template #content>
                <p>
                  Currently, we do not offer car rentals with a driver. However,
                  we are always exploring new service options to enhance your
                  experience.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title>Do you have a car leasing? </template>
              <template #content>
                <p>
                  Yes, we provide such a service. You can lease a car for 3, 6,
                  9, 12, and 24 months.
                </p>
                <figure>
                  <figcaption class="text-information__figcaption">
                    For car leasing, you should provide:
                  </figcaption>
                  <ul class="text-information__ul">
                    <li class="text-information__li">
                      - Passport / UAE Residence Visa, Emirates ID (for
                      residents)
                    </li>
                    <li class="text-information__li">
                      - UAE Driving License (for residents) / International
                      Driving Permit (IDP) (for tourists)
                    </li>
                    <li class="text-information__li">
                      - Employment letter, pay slips, or recent bank statements
                    </li>
                    <li class="text-information__li">- Credit Card</li>
                  </ul>
                </figure>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title>What are the benefits of car leasing?</template>
              <template #content>
                <p>
                  Firstly, you can choose from a range of leasing terms that
                  best fits your personal or business needs, from 3 months to
                  two years.
                </p>
                <br />
                <p>
                  Longer lease terms offer more economical monthly payments.
                </p>
                <br />
                <p>
                  Be assured to receive a decent level of support: our team is
                  here to ensure that your leasing experience is perfect.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >What happens if I drive the car off-road?</template
              >
              <template #content>
                <p>
                  Please be aware that off-road driving is strictly prohibited
                  for our rental vehicles. Engaging in off-road activities can
                  lead to significant damage and void your rental agreement, so
                  it's best to stick to paved roads for a safe and enjoyable
                  experience.
                </p>
              </template>
            </UiSpoiler>
          </div>
        </div>

        <div class="faq-item">
          <h2 class="faq-item__title text-ui">Payment</h2>
          <div class="faq-item__content">
            <UiSpoiler>
              <template #title
                >Can I rent a car without a deposit in Dubai?</template
              >
              <template #content>
                <p>
                  Yes, you can rent a vehicle without a traditional deposit.
                  When you choose to rent from us, you have the option to pay a
                  non-refundable fixed fee to our partners. This company acts as
                  a guarantor against potential damages, unpaid fines, or other
                  expenses that may occur, provided those issues aren't due to
                  our negligence. The amount you’ll need to pay varies based on
                  the car model and the rental duration.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title>Why are deposits required for rentals?</template>
              <template #content>
                <p>
                  Deposits are a standard practice in car rentals. They serve as
                  a safeguard against any fines or charges that may arise during
                  your rental period or after the vehicle has been returned.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title>How is the rental fee charged? </template>
              <template #content>
                <p>
                  We charge rental fees on an upfront basis, ensuring clarity
                  and transparency in the transaction.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >Who is responsible for traffic violations?</template
              >
              <template #content>
                <p>
                  The driver is accountable for any traffic violations incurred
                  during the rental period. We will notify you of any fines
                  issued by the police, detailing the type of violation and the
                  corresponding amount.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title>What about parking charges?</template>
              <template #content>
                <p>
                  While renting a car, customers are responsible for paying any
                  parking charges incurred during the rental period.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title>Can I freeze my contract?</template>
              <template #content>
                <p>
                  Unfortunately, we do not offer the option to freeze rental
                  contracts at this time.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title>What types of payment do you accept?</template>
              <template #content>
                <p>
                  Credit cards are typically required for the deposit; indeed,
                  we accept all payment methods.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >What should I do if I get a traffic ticket?</template
              >
              <template #content>
                <p>
                  You will be responsible for paying any traffic fines incurred
                  during your rental period.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >What happens if the car is damaged during my rental?</template
              >
              <template #content>
                <p>
                  If any damage occurs to the rental vehicle during your time
                  with it, you will need to report the incident to the rental
                  company as soon as possible. Depending on your insurance
                  coverage, you may be liable for repair fees, so it’s crucial
                  to understand your policy and the procedures in place for
                  handling such situations.
                </p>
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title>Will I earn bonuses for my rentals?</template>
              <template #content>
                <p>
                  Yes! We offer a 5% discount on your next rental as a thank you
                  for your continued business.
                </p>
              </template>
            </UiSpoiler>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const breadcrumbs = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "FAQ",
  },
];

const config = useRuntimeConfig();
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/text-information";

.faq {
  padding-bottom: 100px;

  &-list {
    display: grid;
    row-gap: 80px;
    margin-top: 40px;
  }

  &-item {
    display: flex;
    align-items: flex-start;
    grid-gap: 20px;

    &__title {
      padding-top: 12px;
      min-width: 240px;
    }

    &__content {
      display: grid;
      flex-grow: 1;
      row-gap: 20px;
      width: 100%;
      max-width: 484px;
    }
  }

  @media (max-width: 920px) {
    padding-bottom: 40px;

    &__h1 {
      margin-bottom: 8px;
    }

    &-list {
      row-gap: 40px;
      margin-top: 20px;
    }

    &-item {
      flex-direction: column;

      &__title {
        width: fit-content;
      }

      &__content {
        max-width: 100%;
      }
    }
  }
}
</style>

<style lang="scss">
.faq-page {
  .spoiler {
    &:first-child {
      .spoiler__switch {
        padding: 20px 0;
      }
    }

    &__switch {
      border-bottom: 1px solid var(--color-text20);
      flex-direction: row-reverse;
      justify-content: space-between;
      padding-bottom: 20px;

      &.active {
        border-bottom: transparent;
        padding-bottom: 0;
      }
    }

    &__title {
      font-size: 16px;
      font-weight: 700;
    }

    &__content {
      font-size: 16px;
      padding-left: 0;
    }
  }
}
</style>
