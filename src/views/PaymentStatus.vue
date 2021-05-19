<template>
  <div>
    <payment-successful />
  </div>
</template>

<script>
// @ is an alias to /src
import PaymentSuccessful from "@/components/PaymentSuccessful.vue";

export default {
  name: "PaymentStatus",
  components: {
    PaymentSuccessful,
  },
};
</script>
