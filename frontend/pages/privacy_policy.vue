<template>
  <div class="text-information">
    <div class="container">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <div class="text-information__inner">
        <h1 class="h1">Privacy policy</h1>
        <h2>1. Information we may collect</h2>
        <p>
          To provide our services to the customers Rentcaruae.com need to
          collect certain information from clients, such as: personal data,
          including but not limited to Name, contact numbers, email address and
          residential address, location, payment details, as well as information
          collected automatically by service providers to evaluate statistics
          and update our website accordingly, this can include your IP Address,
          browser used, language settings, hardware used, operating system,
          clicks, pages visited, cookie files, information on your activity when
          using the website, IP geolocation, webvisors information. Our website
          uses cookies and other identifiers. By using yeti.ae website and
          services you agree to the handling of your information. We might also
          collect other information that is provided to us by phone or by text
          messages or email, including whatsapp, facebook or any other
          application or by filling the forms on our website including booking,
          contact me form or automatic webchat messages.
        </p>
        <br />
        <h2>2. Use of Information</h2>
        <ul class="text-information__ul">
          <li class="text-information__li">
            To provide you with information about your booking, your rent,
            delivery, payments, additional services or any other car rental
            related information
          </li>
          <li class="text-information__li">
            To provide you with current offers through advertisement
          </li>
          <li class="text-information__li">
            To improve our website and our services
          </li>
        </ul>
        <br />
        <h2>3. We may share your information</h2>
        <ul class="text-information__ul">
          <li class="text-information__li">
            To Governmental authorities and other third parties. To offer you
            services we can provide your information to UAE governmental
            authorities and other third parties if required to perform our
            services or required by law. This includes but not limited by RTA,
            Police, Courts, Insurance companies, governmental and private
            hospitals.
          </li>
          <li class="text-information__li">
            Marketing and promotion. We may provide your information to our
            advertisement provider in order to inform you about our offers.
          </li>
          <li class="text-information__li">
            Links. Please note that our website can have some links to other
            websites and if you follow a link you will enter another website,
            which has other privacy policy. Rentcaruae.com is not responsible
            for other websites privacy policies.
          </li>
          <li class="text-information__li">
            Online payment. Rentcaruae.com is not storing any client’s payment
            card information on our website, For payments done through
            Credit/Debit Card all details will be provided directly to payment
            gateway provider through secure connection.
          </li>
        </ul>
        <p>
          Privacy policy can be changed from time to time and we will post the
          recent version on our website. It is your obligation to check the
          Privacy Policy if you continue using our website.
        </p>
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
    name: "Privacy policy",
  },
];

useSeoMeta({
  title: "Privacy policy",
});
</script>

<style lang="scss" scoped>
@forward "./../assets/scss/components/text-information";

.text-information {
  &__inner {
    padding-bottom: 100px;
  }

  @media (max-width: 1024px) {
    &__inner {
      padding-bottom: 40px;
    }
  }
}
</style>
