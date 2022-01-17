import { getShoppingCartProducts, updateShoppingCartProduct, deleteShoppingCartProduct } from "../../api/shoppingCartApi";

// selectedProducts = {
//     {
//         venderName: "venderName",
//         selectedItemFlags: [
//             {
//                 id: 1,
//                 selected: false
//             }
//         ]
//     }
// }

const state = {
    cartProducts: [],
    selectedProducts: []
}

const getters = {
    // eslint-disable-next-line no-unused-vars
    getShopTotalPrice(state, getters, rootState, rootGetters) {
        return (venderName) => {
            const shopIndex = state.cartProducts.findIndex(shop => shop.venderName === venderName)
            const shopItems = state.cartProducts[shopIndex].items
            let totalPrice = 0
            for (let index = 0; index < shopItems.length; index++) {
                if (!state.selectedProducts[shopIndex].selectedItemFlags[index].selected) continue
                const discountRate = rootGetters["discountStore/getProductSpecialDiscountRate"](shopItems[index].venderName, shopItems[index].category)
                totalPrice += shopItems[index].price * shopItems[index].quantity * discountRate
            }
            return totalPrice
        }
    },
    checkShoppingCartHasProduct(state) {
       return (venderName, productId) => {
           const shopIndex = state.cartProducts.findIndex(shop => shop.venderName === venderName)
           if (shopIndex === -1) return false
           const productIndex = state.cartProducts[shopIndex].items.findIndex(item => item.id === productId)
           return productIndex !== -1
       }
    },
    getSelectedVenderProducts() {
        return (venderName) => {
            const shopIndex = state.cartProducts.findIndex(shop => shop.venderName === venderName)
            if (shopIndex === -1) return null

            const shopItems = state.cartProducts[shopIndex].items
            const selectedItems = []
            for (let index = 0; index < shopItems.length; index++) {
                if (state.selectedProducts[shopIndex].selectedItemFlags[index].selected) {
                    selectedItems.push(shopItems[index])
                }
            }
            return selectedItems
        }
    },
    // deprecated
    getShoppingCartTotalPrice(state) {
        let totalPrice = 0
        for (const shop of state.cartProducts) {
            for (const item of shop.items) {
                totalPrice += item.price * item.quantity
            }
        }
        return totalPrice
    }
}

const actions = {
    async loadUserCartProducts({ commit, rootState }) {
        const customerId = rootState.userStore.id
        const cartData = await getShoppingCartProducts(customerId)
        commit('updateAllUserCartState', cartData.shoppingCartItems)
    },
    async updateCartProductQuantity({ commit }, productData) {
        commit('updateProductState', productData)
    },
    async updateCartProductSelected({ commit }, productData) {
        commit('updateProductSelected', productData)
    },
    async deleteCartProduct({ commit, rootState }, productId) {
        const customerId = rootState.userStore.id
        await deleteShoppingCartProduct(productId, customerId)
        const cartData = await getShoppingCartProducts(customerId)
        commit('updateAllUserCartState', cartData.shoppingCartItems)
    },
    async updateCartStateToBackend({ state, rootState }) {
        const customerId = rootState.userStore.id
        for (const shop of state.cartProducts) {
            for (const item of shop.items) {
                await updateShoppingCartProduct(item.id, customerId, item.quantity)
            }
        }
    }
}

const mutations = {
    updateAllUserCartState(state, shoppingCartProducts) {
        state.cartProducts = shoppingCartProducts

        state.selectedProducts = []
        for (const shop of state.cartProducts) {
            const shopSelectedItems = {
                venderName: shop.venderName,
                selectedItemFlags: []
            }
            for (const item of shop.items) {
                const itemFlag = {
                    id: item.id,
                    selected: false
                }
                shopSelectedItems.selectedItemFlags.push(itemFlag)
            }
            state.selectedProducts.push(shopSelectedItems)
        }
    },
    updateProductState(state, productData) {
        const shopIndex = state.cartProducts.findIndex(shop => shop.venderName === productData.venderName)
        const productIndex = state.cartProducts[shopIndex].items.findIndex(item => item.id === productData.productId)
        state.cartProducts[shopIndex].items[productIndex].quantity = productData.quantity
    },
    updateProductSelected(state, productData) {
        const shopIndex = state.cartProducts.findIndex(shop => shop.venderName === productData.venderName)
        const productIndex = state.cartProducts[shopIndex].items.findIndex(item => item.id === productData.productId)
        state.selectedProducts[shopIndex].selectedItemFlags[productIndex].selected = productData.selected
    }
}

export default { namespaced: true, state, getters, actions, mutations };