const axios = require('axios');

const baseUrl =  "https://marta-bff-dot-marta-tech.appspot.com/breezecard/";

export const getBreezeCardInfo = (cardNumber) => {
  axios.get(baseUrl + cardNumber)
      .then((response) => {
        console.log(response);
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
};
