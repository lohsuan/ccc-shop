import axios from "axios";

//get-current
export const getCurrentSpecialDiscount = async function () {
    try {
        // const response = await axios.get("/api/special_discount/get-current");
        // return response.data;
        return fakeSpeatialDiscount;
    } catch (err) {
        console.log(err);
    }
};

export const getCurrentShippingDiscount = async function () {
    try {
        // const response = await axios.get("/api/shipping_discount/get-current");
        // return response.data;
        return fakeShippingDiscount;
    } catch (err) {
        console.log(err);
    }
};

export const getCurrentSeasoningsDiscount = async function () {
    try {
        // const response = await axios.get("/api/seasonings_discount/get-current");
        // return response.data;
        return fakeSeasoningDiscount;
    } catch (err) {
        console.log(err);
    }
};

//create
export const createSeasoningsDiscount = async function (venderId, policyDescription, startTime, endTime, discountRate) {
    let json = {
        "venderId": parseInt(venderId, 10),
        "policyDescription": policyDescription,
        "startTime": startTime,
        "endTime": endTime,
        "discountRate": parseFloat(discountRate)
    }

    try {
        const response = await axios.post("/api/seasonings_discount/create", json);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const createShippingDiscount = async function (venderId, policyDescription, startTime, endTime, targetPrice) {
    let json = {
        "venderId": parseInt(venderId, 10),
        "policyDescription": policyDescription,
        "startTime": startTime,
        "endTime": endTime,
        "targetPrice": targetPrice
    }

    try {
        const response = await axios.post("/api/shipping_discount/create", json);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const createSpecialDiscount = async function (venderId, policyDescription, startTime, endTime, category, discountRate) {
    let json = {
        "venderId": parseInt(venderId, 10),
        "policyDescription": policyDescription,
        "startTime": startTime,
        "endTime": endTime,
        "category": category,
        "discountRate": parseFloat(discountRate)
    }

    try {
        const response = await axios.post("/api/special_discount/create", json);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}


//get_vender

export const getVenderSeasoningsDiscounts = async function (venderId) {
    let json = {
        "venderId": parseInt(venderId, 10)
    }

    try {
        const response = await axios.post("/api/seasonings_discount/get-vender", json);
        return response.data.seasoningsDiscountList
    } catch (err) {
        console.log(err);
    }
};

export const getVenderShippingDiscounts = async function (venderId) {
    let json = {
        "venderId": parseInt(venderId, 10)
    }

    try {
        const response = await axios.post("/api/shipping_discount/get-vender", json);
        return response.data.shippingDiscountList
    } catch (err) {
        console.log(err);
    }
};

export const getVenderSpecialDiscounts = async function (venderId) {
    let json = {
        "venderId": parseInt(venderId, 10)
    }

    try {
        const response = await axios.post("/api/special_discount/get-vender", json);
        return response.data.specialDiscountList
    } catch (err) {
        console.log(err);
    }
};

//edit
export const editSeasoningsDiscount = async function (discountCode, venderId, policyDescription, startTime, endTime, discountRate) {
    let json = {
        "discountCode": parseInt(discountCode, 10),
        "venderId": parseInt(venderId, 10),
        "policyDescription": policyDescription,
        "startTime": startTime,
        "endTime": endTime,
        "discountRate": parseFloat(discountRate)
    }

    try {
        const response = await axios.post("/api/seasonings_discount/edit", json);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const editShippingDiscount = async function (discountCode, venderId, policyDescription, startTime, endTime, targetPrice) {
    let json = {
        "discountCode": parseInt(discountCode, 10),
        "venderId": parseInt(venderId, 10),
        "policyDescription": policyDescription,
        "startTime": startTime,
        "endTime": endTime,
        "targetPrice": targetPrice
    }

    try {
        const response = await axios.post("/api/shipping_discount/edit", json);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const editSpecialDiscount = async function (discountCode, venderId, policyDescription, startTime, endTime, category, discountRate) {
    let json = {
        "discountCode": parseInt(discountCode, 10),
        "venderId": parseInt(venderId, 10),
        "policyDescription": policyDescription,
        "startTime": startTime,
        "endTime": endTime,
        "category": category,
        "discountRate": parseFloat(discountRate)
    }

    try {
        const response = await axios.post("/api/special_discount/edit", json);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}


let fakeSpeatialDiscount = {
    "message": "Success!",
    "specialDiscountList": [
      {
        "discountCode": 4,
        "venderId": 3,
        "venderName": "ASUS",
        "policyDescription": "ASUS手機 全面9折",
        "startTime": "2021-12-28T16:00:00.000+00:00",
        "endTime": "2022-01-31T15:59:59.000+00:00",
        "category": "PHONE",
        "discountRate": 0.9,
        "startDate": "2021-12-29 00:00",
        "endDate": "2022-01-31 23:59"
      },
      {
        "discountCode": 5,
        "venderId": 2,
        "venderName": "Apple",
        "policyDescription": "新年特惠！Apple平板全面9折！",
        "startTime": "2021-12-28T16:00:00.000+00:00",
        "endTime": "2022-01-31T15:59:59.000+00:00",
        "category": "TABLET",
        "discountRate": 0.9,
        "startDate": "2021-12-29 00:00",
        "endDate": "2022-01-31 23:59"
      }
    ]
  }

  let fakeShippingDiscount = {
    "message": "Success!",
    "shippingDiscountList": [
      {
        "discountCode": 4,
        "venderId": 3,
        "venderName": "ASUS",
        "policyDescription": "新年到！ ASUS全館商品滿58888免運！",
        "startTime": "2021-12-28T16:00:00.000+00:00",
        "endTime": "2022-01-31T15:59:59.000+00:00",
        "targetPrice": 58888,
        "startDate": "2021-12-29 00:00",
        "endDate": "2022-01-31 23:59"
      }
    ]
  }

  let fakeSeasoningDiscount = {
    "message": "Success!",
    "seasoningsDiscountList": [
      {
        "discountCode": 5,
        "venderId": 4,
        "venderName": "Samsung",
        "policyDescription": "新年買起來！虎年1月Samsung全系列商品85折優惠！",
        "startTime": "2021-12-31T16:00:00.000+00:00",
        "endTime": "2022-01-31T15:59:59.000+00:00",
        "discountRate": 0.85,
        "startDate": "2022-01-01 00:00",
        "endDate": "2022-01-31 23:59"
      }
    ]
  }