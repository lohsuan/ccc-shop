import axios from "axios";

export const getValuations = async function (productId) {
  let json = {
    "productId": productId
  }

  console.log("getValuations", json);

  let fakeValuation = [
    {
      "customerName": "Patrick",
      "comment": "not so good for me :(",
      "rating": 2
    },
    {
      "customerName": "Sandy",
      "comment": "Excellent!!.",
      "rating": 4
    }
  ]

  try {
    // const response = await axios.post("/api/valuation/get", json);
    // return response.data.valuationList;
    return fakeValuation;
  } catch (err) {
    console.log(err);
  }
};

export const getCustomerValuations = async function (customerId, productId) {
  let json = {
    "customerId": customerId,
    "productId": productId
  }

  try {
    const response = await axios.post("/api/valuation/get-customer", json);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const createValuation = async function (customerId, productId, comment, rating) {
  let json = {
    "customerId": customerId,
    "productId": productId,
    "comment": comment,
    "rating": rating
  }

  try {
    const response = await axios.post("/api/valuation/create", json);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};