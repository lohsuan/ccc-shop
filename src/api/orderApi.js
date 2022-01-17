import axios from "axios";

export const createOrder = async function (orderData) {
    let json = {
        "customerId": orderData.customerId,
        "shippingFee": orderData.shippingFee,
        "recipientName": orderData.recipientName,
        "shippingAddress": orderData.shippingAddress,
        "paymentMethod": orderData.paymentMethod,
        "creditCardId": orderData.creditCardId,
        "shippingDiscountCode": orderData.shippingDiscountCode,
        "seasoningDiscountCode": orderData.seasoningDiscountCode,
        "totalPrice": orderData.totalPrice,
        "orderItems": orderData.orderItems
    }

    try {
        const response = await axios.post("/api/order/create", json)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const getCustomerOrders = async function (customerId) {
    let json = {
        "customerId": parseInt(customerId, 10)
    }
    json
    try {
        // const response = await axios.post("/api/order/get-customer", json)
        // return response.data.orderList
        return fakeCustomerOrder.orderList
    } catch (err) {
        console.log(err)
    }
}

export const getVenderOrders = async function (venderId) {
    let json = {
        "venderId": parseInt(venderId, 10)
    }
    json
    try {
        // const response = await axios.post("/api/order/get-vender", json)
        // return response.data.orderList
        return fakeVenderOrder.orderList; 
    } catch (err) {
        console.log(err)
    }
}

export const updateOrders = async function (orderId, status) {
    // orderId
    // status
    // time
    let json = {
        "orderId": orderId, "status": status, "time": Date.now()
    }

    try {
        const response = await axios.post("/api/order/update", json)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

let fakeCustomerOrder = {
    "message": "Success!",
    "orderList": [
      {
        "id": 2,
        "customerId": 5,
        "shippingFee": 500,
        "recipientName": "Zachary",
        "shippingAddress": "台北市大安區忠孝東路xxx號5F",
        "status": "RECEIVED",
        "paymentMethod": "CASH",
        "creditCardId": null,
        "orderTime": "2021-11-01T04:34:56.000+00:00",
        "shippingTime": "2021-11-02T04:34:56.000+00:00",
        "deliveryTime": "2021-11-05T04:34:56.000+00:00",
        "seasoningDiscountCode": 0,
        "shippingDiscountCode": 0,
        "totalPrice": 17480,
        "orderItems": {
          "Galaxy Z Fold3 5G": 1,
          "Galaxy Tab A7": 2
        },
        "orderDate": "2021-11-01 12:34",
        "shippingDate": "2021-11-02 12:34",
        "deliveryDate": "2021-11-05 12:34"
      },
      {
        "id": 4,
        "customerId": 5,
        "shippingFee": 300,
        "recipientName": "Zack",
        "shippingAddress": "台北市大安區忠孝東路xxx號5F",
        "status": "SHIPPING",
        "paymentMethod": "CREDIT_CARD",
        "creditCardId": "2222333-4444555",
        "orderTime": "2021-12-19T04:34:56.000+00:00",
        "shippingTime": "2021-12-20T04:34:56.000+00:00",
        "deliveryTime": null,
        "seasoningDiscountCode": 0,
        "shippingDiscountCode": 0,
        "totalPrice": 15200,
        "orderItems": {
          "iPad mini": 1
        },
        "orderDate": "2021-12-19 12:34",
        "shippingDate": "2021-12-20 12:34",
        "deliveryDate": null
      },
      {
        "id": 5,
        "customerId": 5,
        "shippingFee": 0,
        "recipientName": "Zachary",
        "shippingAddress": "台北市大安區忠孝東路xxx號5F",
        "status": "ORDER",
        "paymentMethod": "CASH",
        "creditCardId": null,
        "orderTime": "2021-12-25T04:34:56.000+00:00",
        "shippingTime": null,
        "deliveryTime": null,
        "seasoningDiscountCode": 0,
        "shippingDiscountCode": 3,
        "totalPrice": 36000,
        "orderItems": {
          "Galaxy Book Pro 360": 3
        },
        "orderDate": "2021-12-25 12:34",
        "shippingDate": null,
        "deliveryDate": null
      },
      {
        "id": 6,
        "customerId": 5,
        "shippingFee": 300,
        "recipientName": "ZackZack",
        "shippingAddress": "台北市大安區忠孝東路xxx號5F",
        "status": "ORDER",
        "paymentMethod": "CASH",
        "creditCardId": null,
        "orderTime": "2021-12-28T04:34:56.000+00:00",
        "shippingTime": null,
        "deliveryTime": null,
        "seasoningDiscountCode": 0,
        "shippingDiscountCode": 0,
        "totalPrice": 106100,
        "orderItems": {
          "iMac": 1,
          "iPhone 13 Pro": 1,
          "Macbook Pro": 1
        },
        "orderDate": "2021-12-28 12:34",
        "shippingDate": null,
        "deliveryDate": null
      }
    ]
  }

  let fakeVenderOrder = {
    "message": "Success!",
    "orderList": [
      {
        "id": 1,
        "customerId": 6,
        "shippingFee": 100,
        "recipientName": "Mandy",
        "shippingAddress": "台北市大安區忠孝東路xxx號5F",
        "status": "RECEIVED",
        "paymentMethod": "MOBILE",
        "creditCardId": null,
        "orderTime": "2020-09-21T04:34:56.000+00:00",
        "shippingTime": "2020-09-23T04:34:56.000+00:00",
        "deliveryTime": "2020-09-25T04:34:56.000+00:00",
        "seasoningDiscountCode": 1,
        "shippingDiscountCode": 0,
        "totalPrice": 19810,
        "orderItems": {
          "ROG Phone 5s Pro": 3,
          "Zenfone 8": 1,
          "S700TA": 2
        },
        "orderDate": "2020-09-21 12:34",
        "shippingDate": "2020-09-23 12:34",
        "deliveryDate": "2020-09-25 12:34"
      },
      {
        "id": 3,
        "customerId": 6,
        "shippingFee": 120,
        "recipientName": "Sandy",
        "shippingAddress": "台北市大安區忠孝東路xxx號5F",
        "status": "DELIVERED",
        "paymentMethod": "CREDIT_CARD",
        "creditCardId": "9999888-7777666",
        "orderTime": "2021-11-25T04:34:56.000+00:00",
        "shippingTime": "2021-11-27T04:34:56.000+00:00",
        "deliveryTime": "2021-11-30T04:34:56.000+00:00",
        "seasoningDiscountCode": 0,
        "shippingDiscountCode": 0,
        "totalPrice": 45120,
        "orderItems": {
          "TUF Dash F15": 1
        },
        "orderDate": "2021-11-25 12:34",
        "shippingDate": "2021-11-27 12:34",
        "deliveryDate": "2021-11-30 12:34"
      },
      {
        "id": 10,
        "customerId": 13,
        "shippingFee": 0,
        "recipientName": "cliu",
        "shippingAddress": "六教",
        "status": "ORDER",
        "paymentMethod": "CASH",
        "creditCardId": "",
        "orderTime": "2022-01-12T09:44:14.000+00:00",
        "shippingTime": null,
        "deliveryTime": null,
        "seasoningDiscountCode": 6,
        "shippingDiscountCode": 4,
        "totalPrice": 165564,
        "orderItems": {
          "Zenfone 8": 12
        },
        "orderDate": "2022-01-12 17:44",
        "shippingDate": null,
        "deliveryDate": null
      }
    ]
  }