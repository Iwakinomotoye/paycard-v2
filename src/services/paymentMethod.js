import axios from "axios";

export default function (countryCode) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "https://api.paymentwall.com/api/payment-systems/?key=131b3e2f6e5b9cbe0230cbb78dde2fbf&country_code=" +
          countryCode +
          "&sign_version=2"
      )
      .then((data) => {
        return resolve(data.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
