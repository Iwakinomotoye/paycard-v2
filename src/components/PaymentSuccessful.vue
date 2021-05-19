<template>
  <div class="success-message" v-if="success">
    <img src="@/assets/images/success_icon.svg" alt="" />
    <h1>Transaction successful</h1>
    <div class="transaction-details">
      <p>Transaction ID</p>
      <p>1029453384</p>
    </div>
    <button class="next-btn">Download receipt</button>
  </div>
</template>

<script>
export default {
  name: "PaymentSuccessful",
  computed: {
    success() {
      if (this.$store.getters.paymentStatus === "success") {
        return true;
      }
      return false;
    },
  },
  beforeDestroy() {
    this.$store.dispatch("resetPaymentStatus");
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/button.scss";
.success-message {
  margin-top: 50px;
  text-align: center;
}
.success-message h1 {
  margin: 20px 0 15px;
}
.transaction-details {
  display: flex;
  justify-content: space-between;
  padding: 13px 0;
  border-bottom: 1px solid #070c11;
}
.transaction-details p:first-of-type {
  color: #455a64;
}
</style>
