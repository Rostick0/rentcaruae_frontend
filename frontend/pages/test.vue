<template>
  <div>
    <h1>Purchase Cat {{ catId }}</h1>
    <div>
      <p>Select your favorite cat and proceed to checkout.</p>
    </div>

    <!-- Payment form for Stripe Payment Element -->
    <form @submit.prevent="pay">
      <div
        class="border border-gray-500 p-2 rounded-sm"
        id="payment-element"
      ></div>
      <p
        id="payment-error"
        role="alert"
        class="text-red-700 text-center font-semibold"
      ></p>
      <button
        :disabled="isProcessing"
        type="submit"
        class="mt-4 bg-gradient-to-r from-[#FE630C] to-[#FF3200] w-full text-white text-[21px] font-semibold p-1.5 rounded-full"
        :class="isProcessing ? 'opacity-70' : 'opacity-100'"
        id="processing"
        aria-label="loading"
      >
        <p v-if="isProcessing">I'm processing payment</p>
        <div v-else>Buy Now</div>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { loadStripe } from "@stripe/stripe-js";
import { useRuntimeConfig } from "#app";

// Accessing environment variables
const config = useRuntimeConfig();
const stripePk = config.public.STRIPE_PUBLIC_KEY;

const route = useRoute();
const catId = route.params.catId; // Get the cat ID from the URL
const isProcessing = ref(false);
let stripe;
let elements;
let paymentElement;
let clientSecret;

const total = 2000; // Example fixed amount for purchasing a cat in cents ($20)

onMounted(async () => {
  await initializeStripe();
});

const initializeStripe = async () => {
  stripe = await loadStripe(stripePk);

  // Create a payment intent on your server
  const res = await fetch("/api/stripe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: total, // Fixed amount in cents
    }),
  });

  const result = await res.json();
  clientSecret = result.client_secret;

  elements = stripe.elements({ clientSecret });

  // Create and mount the Payment Element
  paymentElement = elements.create("payment");
  paymentElement.mount("#payment-element");

  isProcessing.value = false;
};

const pay = async () => {
  isProcessing.value = true;

  try {
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1234567890",
          },
        },
      },
      redirect: "if_required", // Stay on the same page unless redirect is necessary
    });

    if (error) {
      console.error("Payment error:", error);
      document.querySelector("#payment-error").textContent = error.message;
      isProcessing.value = false;
    } else {
      console.log("Payment succeeded");
      // Handle post-payment success actions, like showing a success message
    }
  } catch (error) {
    console.error("Payment processing error:", error);
    document.querySelector("#payment-error").textContent =
      "An error occurred. Please try again.";
    isProcessing.value = false;
  }
};
</script>

<style scoped>
/* Add any styles you want to apply to the purchase page */
</style>
