import axios from "axios";

export default function (countryCode) {
  return new Promise((resolve, reject) => {
    axios
      .get("https://restcountries.eu/rest/v2/alpha/" + countryCode)
      .then((data) => {
        return resolve(data.data.currencies[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
