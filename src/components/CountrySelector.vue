<template>
  <div id="pay">
    <div class="picker-container">
      <label for="countries">Select Countries</label>

      <select
        class="selectpicker countrypicker"
        id="countries"
        data-flag="true"
        data-live-search="true"
        data-width="200px"
        :data-default="this.countryCode"
        v-on:change="selectCountry()"
      ></select>
    </div>
  </div>
</template>

<script>
import paymentMethods from "../services/paymentMethod";
import getCurrency from "../services/getCurrency";

export default {
  name: "CountrySelector",
  computed: {
    countryCode() {
      return this.$store.getters.countryCode;
    },
  },
  methods: {
    selectCountry() {
      const value = window.$(".countrypicker option:selected")[0].value;

      this.$store.dispatch("setCountryCode", value);
      this.$store.dispatch("resetPaymentMethod");
      this.fetchPaymentMethod();
      this.fetchCurrency();
    },
    fetchPaymentMethod() {
      paymentMethods(this.countryCode).then((data) => {
        this.$store.dispatch("setPaymentMethodList", data);
      });
    },

    fetchCurrency() {
      getCurrency(this.countryCode).then((data) => {
        this.$store.dispatch("setCurrency", data);
      });
    },
  },
  mounted() {
    window.$(".countrypicker").countrypicker();
    window
      .$(".countrypicker")
      .prepend("<option value=''>Select Country</option>");
    window.$(".selectpicker").selectpicker("");
    window
      .$(".countrypicker .dropdown-menu.inner")
      .css({ "max-width": "84.375vw" });

    if (!this.$store.getters.currency) {
      this.fetchCurrency();
    }
    if (!Array.isArray(this.$store.getters.paymentMethodList)) {
      this.fetchPaymentMethod();
    }
  },
};
</script>

<style lang="scss" scoped>
#pay {
  max-width: 100%;
  position: relative;
}
label {
  display: block;
}
.dropdown-backdrop {
  width: 200px !important;
}
.countrypicker .dropdown-menu.open {
  min-width: unset;
  max-width: 80vw;
}
.countrypicker .dropdown-menu.open > * {
  max-width: 80%;
}
.dropdown-menu.open > * {
  max-width: 80%;
}
</style>
