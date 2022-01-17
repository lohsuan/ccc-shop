import {
    getCurrentSeasoningsDiscount,
    getCurrentSpecialDiscount,
    getCurrentShippingDiscount,
} from "../../api/discountApi";

const state = {
    seasoningsDiscounts: [],
    specialDiscounts: [],
    shippingDiscounts: [],
    staffSeasoningsDiscounts: [],
}

//////// shippingDiscounts: []
// discountCode
// endTime
// policyDescription
// startTime
// targetPrice
// venderId
// venderName
//////////

//////// seasoningsDiscountList: []
// discountCode
// discountRate
// endTime
// policyDescription
// startTime
// venderId
// venderName
//////////

//////// specialDiscountList: []
// venderId
// venderName
// policyDescription
// startTime
// endTime
// category
// discountRate
//////////

const getters = {
    getVenderShippingDiscount(state) {
        return (venderName) => {
            return state.shippingDiscounts.filter(discount => venderName === discount.venderName)
        }
    },
    getVenderSeasoningDiscount(state) {
        return (venderName) => {
            return state.seasoningsDiscounts.filter(discount => venderName === discount.venderName)
        }
    },
    getVenderSpecialDiscount(state) {
        return (venderName) => {
            return state.specialDiscounts.filter(discount => venderName === discount.venderName)
        }
    },
    getProductSpecialDiscountRate(state) {
        return (venderName, category) => {
            let discountRate = 1
            const discounts = state.specialDiscounts.filter(discount => venderName === discount.venderName)
            for (let discount of discounts) {
                if (discount.category === category && discount.discountRate < discountRate) {
                    discountRate = discount.discountRate
                }
            }
            return discountRate
        }
    }
}

const actions = {
    async loadCurrentShippingDiscount({commit}) {
        const shippingDiscounts = await getCurrentShippingDiscount()
        commit('loadCurrentShippingDiscountData', shippingDiscounts.shippingDiscountList)
    },
    async loadCurrentSeasoningDiscount({commit}) {
        const seasoningsDiscounts = await getCurrentSeasoningsDiscount()
        commit('loadCurrentSeasoningDiscountData', seasoningsDiscounts.seasoningsDiscountList)
    },
    async loadCurrentSpecialDiscount({commit}) {
        const specialDiscounts = await getCurrentSpecialDiscount()
        commit('loadCurrentSpecialDiscountData', specialDiscounts.specialDiscountList)
    },
}

const mutations = {
    loadCurrentSeasoningDiscountData(state, seasoningsDiscounts) {
        state.seasoningsDiscounts = seasoningsDiscounts
    },
    loadCurrentSpecialDiscountData(state, specialDiscounts) {
        state.specialDiscounts = specialDiscounts
    },
    loadCurrentShippingDiscountData(state, shippingDiscounts) {
        state.shippingDiscounts = shippingDiscounts
    },
}

export default {namespaced: true, state, getters, actions, mutations};