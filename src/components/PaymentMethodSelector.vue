<template>
  <div>
    <h2>Payment Methods</h2>
    <p>Select one of the payment methods below:</p>
    <div class="payment-methods">
      <div
        class="payment-method"
        v-for="paymentMethod of paymentMethods"
        :key="paymentMethod.id"
      >
        <button
          @click="changeSelectedMethod(paymentMethod)"
          :class="[
            paymentMethod.id === paymentMethodId ? 'selected' : '',
            'payment-card',
          ]"
        >
          <img
            :class="paymentMethod.img_class"
            :src="paymentMethod.img_url"
            alt=""
          />
        </button>
        <p>{{ paymentMethod.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentMethodSelector",
  computed: {
    paymentMethods() {
      return this.$store.getters.paymentMethodList;
    },
    paymentMethodId() {
      return this.$store.getters.paymentMethod.id;
    },
  },
  methods: {
    changeSelectedMethod(paymentMethod) {
      this.$store.dispatch("setSelectedPaymentMethod", paymentMethod);
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  font-family: Montserrat;
  color: #070c11;
  margin-bottom: 10px;
}
.payment-methods {
  display: flex;
  flex-wrap: wrap;
}
.payment-method {
  margin-right: 16px;
}
.payment-method button {
  width: 110px;
  height: 72px;
  background: #ffffff;
  border: 1px solid #f2f7ff;
  box-shadow: 0px 5px 12px rgba(94, 104, 123, 0.2);
  border-radius: 4px;
  margin-bottom: 12px;
}
.payment-method p {
  text-align: center;
  font-size: 12px;
  line-height: 13px;
  font-weight: 500;
}
.payment-method button img {
  max-width: 94px;
  height: 38px;
}
.payment-method button.selected {
  border: 2px solid #f2f7ff;
  box-shadow: 0px 5px 12px rgba(42, 245, 214, 0.4);
}
</style>
