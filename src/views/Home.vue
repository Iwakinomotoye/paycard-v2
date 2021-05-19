<template>
  <div class="home">
    <country-selector />
    <payment-method-selector />
    <payment-method-form :price="5" />
  </div>
</template>

<script>
// @ is an alias to /src
import CountrySelector from "@/components/CountrySelector.vue";
import PaymentMethodSelector from "@/components/PaymentMethodSelector.vue";
import PaymentMethodForm from "@/components/PaymentMethodForm.vue";

export default {
  name: "Home",
  components: {
    CountrySelector,
    PaymentMethodSelector,
    PaymentMethodForm,
  },
};
</script>
