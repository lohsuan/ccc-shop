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
    try {
        const response = await axios.post("/api/order/get-customer", json)
        return response.data.orderList
    } catch (err) {
        console.log(err)
    }
}

export const getVenderOrders = async function (venderId) {
    let json = {
        "venderId": parseInt(venderId, 10)
    }
    try {
        const response = await axios.post("/api/order/get-vender", json)
        return response.data.orderList
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

// {
//     "id": 2,
//     "customerId": 5,
//     "shippingFee": 0,
//     "recipientName": "Zachary",
//     "shippingAddress": "台北市大安區忠孝東路xxx號5F",
//     "status": "RECEIVED",
//     "paymentMethod": "CASH",
//     "creditCardId": null,
//     "orderTime": "2021-11-11T12:34:56.000+00:00",
//     "shippingTime": "2021-11-12T12:34:56.000+00:00",
//     "deliveryTime": "2021-11-15T12:34:56.000+00:00",
//     "seasoningDiscountCode": 0,
//     "shippingDiscountCode": 2,
//     "totalPrice": 16980,
//     "orderItems": {
//       "13": 2
//     }
//   },