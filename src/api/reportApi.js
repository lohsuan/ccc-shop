import axios from "axios";

export const getProductSalesReport = async function (venderId, startTime, endTime) {
    let json = {
        "venderId": venderId,
        "startTime": startTime,
        "endTime": endTime
    }

    try {
        const response = await axios.post("/api/report/get-product-sales-report", json)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const getSalesReport = async function (venderId) {
    let json = {
        "venderId": venderId,
    }

    try {
        const response = await axios.post("/api/report/get-sales-report", json)
        return response.data
    } catch (err) {
        console.log(err)
    }
}
