import axios from "axios";

export const addShoppingCartProduct = async function (productId, customerId, quantity) {
    let json = {
        "productId": productId,
        "customerId": customerId,
        "quantity": quantity
    }

    try {
        const response = await axios.post("/api/shopping-cart/create", json);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const getShoppingCartProducts = async function (id) {
    let json = {
        "id": id
    }

    try {
        const response = await axios.post("/api/shopping-cart/get", json)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const updateShoppingCartProduct = async function (productId, customerId, quantity) {
    const json = {
        "productId": productId,
        "customerId": customerId,
        "quantity": quantity
    }

    try {
        const response = await axios.post("/api/shopping-cart/update", json)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const deleteShoppingCartProduct = async function (productId, customerId) {
    const json = {
        "productId": productId,
        "customerId": customerId
    }

    try {
        const response = await axios.post("/api/shopping-cart/delete-item", json)
        return response.data
    } catch (err) {
        console.log(err)
    }
}