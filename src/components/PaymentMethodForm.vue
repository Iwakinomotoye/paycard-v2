<template>
  <div class="payment-form" v-if="paymentMethodSelected">
    <p>Please enter your card details.</p>

    <div class="card-field-container">
      <div class="card-field">
        <input
          type="text"
          id="card-name"
          v-model="cardholderName"
          @input="cardNameLettersAndLength($event)"
          @blur="validateName($event)"
        />
        <label for="card-name">Cardholder name</label>
        <img src="@/assets/images/error.svg" alt="" class="error-icon" />
      </div>
      <p class="card-error" v-if="cardNameError">Invalid card name</p>
    </div>

    <div class="card-field-container">
      <div class="card-field">
        <input
          type="text"
          id="card-number"
          v-model="displayedCCDigits"
          maxlength="19"
          @input="setdisplayedCCDigits($event, false)"
          @blur="setdisplayedCCDigits($event, true)"
        />
        <label for="card-number">Card number</label>
        <div v-if="!cardDigitsError">
          <img src="@/assets/images/visa.svg" alt="" class="visa" />
          <img src="@/assets/images/master.svg" alt="" class="master" />
          <img src="@/assets/images/amex.svg" alt="" class="amex" />
        </div>
        <img src="@/assets/images/error.svg" alt="" class="error-icon" />
      </div>
      <p class="card-error" v-if="cardDigitsError">Invalid card number</p>
    </div>

    <div class="card-field-container">
      <div class="card-field">
        <input
          type="text"
          id="card-exp"
          v-model="cardExpDate"
          @input="checkExpDate($event)"
          @blur="validateExpDate($event)"
        />
        <label for="card-exp">Expiration date</label>
        <img src="@/assets/images/error.svg" alt="" class="error-icon" />
      </div>
      <p class="card-error" v-if="cardDateError">
        Invalid card expiration date
      </p>
    </div>

    <div class="card-field-container">
      <div class="card-field">
        <input
          type="text"
          id="card-cvv"
          maxlength="3"
          v-model="cardCvvNumber"
          @input="validateCvv($event, false)"
          @blur="validateCvv($event, true)"
        />
        <label for="card-cvv">CVV</label>
        <img src="@/assets/images/error.svg" alt="" class="error-icon" />
      </div>
      <p class="card-error" v-if="cardCvvError">Invalid card CVV number</p>
    </div>

    <button class="next-btn" @click="makePayment()">
      Pay {{ formattedPrice }} {{ currency }}
    </button>
  </div>
</template>

<script>
export default {
  name: "PaymentMethodForm",
  data() {
    return {
      displayedCCDigits: "",
      CCDigits: null,
      cardholderName: "",
      cardExpDate: null,
      cardCvvNumber: null,
      cardDigitsError: false,
      cardNameError: false,
      cardDateError: false,
      cardCvvError: false,
    };
  },
  props: {
    price: {
      type: Number,
      required: true,
    },
  },
  computed: {
    currency() {
      return this.$store.getters.getCurrency;
    },
    formattedPrice() {
      let price = this.price.toLocaleString(undefined, {
        minimumFractionDigits: 2,
      });
      return price;
    },
    paymentMethodSelected() {
      const paymentMethod = this.$store.getters.paymentMethod;
      if (
        paymentMethod &&
        paymentMethod.name &&
        paymentMethod.name.length > 0
      ) {
        this.resetForm();
        return true;
      }
      return false;
    },
  },
  methods: {
    resetForm() {
      this.displayedCCDigits = "";
      this.CCDigits = null;
      this.cardholderName = "";
      this.cardExpDate = null;
      this.cardCvvNumber = null;
    },
    cardNameLettersAndLength({ target }) {
      target.className = "";
      this.cardNameError = false;
      if (target.value.length === 0) return;

      if (!/^[a-zA-Z ]+$/.test(target.value)) {
        target.classList.add("invalid");
        this.cardNameError = true;
      } else {
        if (/\s/.test(target.value) && !/^[a-zA-Z]{3,}\s/.test(target.value)) {
          target.classList.add("invalid");
          this.cardNameError = true;
        } else {
          target.classList.remove("invalid");
          this.cardNameError = false;
        }
      }
    },
    validateName({ target }) {
      this.cardNameLettersAndLength({ target });

      if (!/^[a-zA-Z]{3,}\s[a-zA-Z]{3,}$/.test(target.value)) {
        target.classList.add("invalid");
        this.cardNameError = true;
      } else {
        target.classList.remove("invalid");
        target.classList.add("filled");
        this.cardNameError = false;
      }
    },
    setdisplayedCCDigits({ target }, blur) {
      this.CCDigits = this.displayedCCDigits.split(" ").join("");

      this.validatedisplayedCCDigits({ target }, blur);

      this.displayedCCDigits = this.displayedCCDigits
        .toString()
        .replace(/(\d{4})+(?=(\d))/g, "$1 ");
    },
    validatedisplayedCCDigits({ target }, blur) {
      target.className = "";
      this.cardDigitsError = false;

      if (!blur && this.displayedCCDigits.length === 0) return;

      if (isNaN(this.CCDigits)) {
        target.classList.add("invalid");
        this.cardDigitsError = true;
      }

      if (/^[0-9]{4,}$/.test(this.CCDigits)) {
        this.detectCardType({ target });
      }

      if (blur & !/^[0-9]{15,}$/.test(this.CCDigits)) {
        target.classList.add("invalid");
        this.cardDigitsError = true;
      }

      if (/^[0-9]{15,}$/.test(this.CCDigits)) {
        this.validateWithLuhn({ target });
      }
    },
    validateWithLuhn({ target }) {
      let arr = [];
      for (let i = 0; i < this.CCDigits.length; i++) {
        let number = Number(this.CCDigits[i]);
        arr.push(number);
      }
      let arr2 = [];
      for (let j = arr.length - 1; j >= 0; j--) {
        let doubledElement = arr[j];
        if (j % 2 == 0) {
          doubledElement = arr[j] * 2;
        }
        if (doubledElement > 9) {
          doubledElement = doubledElement - 9;
        }
        arr2.push(doubledElement);
      }
      const sum = arr2.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });
      if (sum % 10 == 0) {
        target.classList.add("filled");
      } else {
        target.classList.add("invalid");
        this.cardDigitsError = true;
      }
    },
    detectCardType({ target }) {
      const cardType = target;

      cardType.classList.remove("is-master");
      cardType.classList.remove("is-amex");
      cardType.classList.remove("is-visa");

      if (this.CCDigits[0] == "4") {
        cardType.classList.add("is-visa");
      } else if (this.CCDigits[0] == "5") {
        cardType.classList.add("is-master");
      } else if (this.CCDigits[0] == "3") {
        cardType.classList.add("is-amex");
      } else {
        cardType.classList.add("invalid");
        return (this.cardDigitsError = true);
      }
    },
    checkExpDate({ target }) {
      target.className = "";
      this.cardDateError = false;

      if (target.value.length === 0) return;

      if (
        /^[0-9/]+$/.test(target.value) &&
        /^\d+\/?/.test(target.value) &&
        !/^\d{3,}\/?/.test(target.value) &&
        !/^\d{1}\//.test(target.value) &&
        !/^\d{2}\/{2,}/.test(target.value) &&
        !/^\d{2}\/\d{5,}/.test(target.value)
      )
        return;
      this.validateExpDate({ target });
    },
    validateExpDate({ target }) {
      if (/^\d{2}\/\d{2,4}$/.test(target.value)) {
        let givenDate = target.value.split("/");
        const givenMonth = givenDate[0];
        let givenYear = givenDate[1];

        if (+givenMonth > 0 && +givenMonth <= 12) {
          if (givenYear.length === 2) {
            givenYear = "20" + givenYear;
          }

          givenDate = new Date(+givenYear, +givenMonth, 0, 23, 59, 59);

          const today = new Date();

          if (today.getTime() < givenDate.getTime()) {
            target.classList.remove("invalid");
            target.classList.add("filled");
            return (this.cardDateError = false);
          }
        }
      }
      target.classList.add("invalid");
      this.cardDateError = true;
    },
    validateCvv({ target }, blur) {
      target.className = "";
      this.cardCvvError = false;

      if (!blur && /^\d{0,3}$/.test(target.value)) return;

      if (blur && /^\d{3}$/.test(target.value)) {
        target.classList.add("filled");
        return (this.cardCvvError = false);
      }

      target.classList.add("invalid");
      this.cardCvvError = true;
    },
    makePayment() {
      this.validateName({ target: document.querySelector("#card-name") });
      this.setdisplayedCCDigits(
        { target: document.querySelector("#card-number") },
        true
      );
      this.validateExpDate({ target: document.querySelector("#card-exp") });
      this.validateCvv({ target: document.querySelector("#card-cvv") }, true);

      if (
        this.cardDigitsError === false &&
        this.cardNameError === false &&
        this.cardDateError === false &&
        this.cardCvvError === false
      ) {
        this.$store.dispatch("setPaymentStatus", "success");
        this.$router.push("/payment-status");
      }
    },
  },
  beforeDestroy() {
    this.$store.dispatch("resetPaymentMethod");
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/button.scss";
.payment-form {
  margin-top: 20px;
  margin-bottom: 50px;
}
.card-field-container {
  margin-top: 17px;
}
.card-field {
  max-width: 311px;
  width: 100%;
  height: 56px;
  position: relative;
}
.visa,
.master,
.amex,
.error-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.1;
}
.amex {
  right: 14px;
}
.master {
  right: 47.5px;
}
.visa {
  right: 80.85px;
}
.error-icon {
  opacity: 1;
  right: 14px;
  display: none;
}
.card-field input.is-visa ~ div .visa,
.card-field input.is-master ~ div .master,
.card-field input.is-amex ~ div .amex {
  opacity: 1;
}
.card-field input {
  width: 100%;
  height: 100%;
  border: 1px solid #c8d4ea;
  border-radius: 6px;
  padding: 20px 16px 0;
  font-size: 16px;
  line-height: 19.5px;
  color: #070c11;
}
.card-field input::-ms-clear {
  display: none;
}
.card-field input:focus {
  border: 1px solid #1169ff;
  outline: 0;
}
.card-field input.filled {
  border: 1px solid #23c5ac;
}
.card-field input.invalid {
  border: 1px solid #ff0000;
}
.card-field label {
  font-size: 16px;
  line-height: 20px;
  color: #68879a;
  position: absolute;
  left: 16px;
  top: 18px;
  font-weight: normal;
  transition: all 0.5s ease;
}
.card-field input:focus ~ label,
.card-field input.filled ~ label,
.card-field input.invalid ~ label {
  font-size: 12px;
  line-height: 15px;
  top: 8px;
}
.card-field input:focus ~ label {
  color: #1169ff;
}
.card-field input.invalid ~ label {
  color: #ff0000;
}
.card-field input.filled ~ label {
  color: #68879a;
}
.card-error {
  color: #ff0000;
  font-size: 12px;
  line-height: 15px;
  margin-left: 10px;
}
.card-field input.invalid ~ .error-icon {
  display: inline-block;
}
</style>
