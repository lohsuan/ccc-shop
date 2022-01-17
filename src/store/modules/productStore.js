import { getAllProducts } from "../../api/productApi";

//   id: "",
// "venderId": 2,
// "name": "iPhone SE",
// "category": "PHONE",
// "price": 14500,
// "stock": 37,
// "warehouseAddress": "XX市XX區XX路XX號XX樓",
// "description": "這是比較便宜的蘋果手機",
// "pictureURL": "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_new-iphone-se-white_04152020_big.jpg.large.jpg",
// "venderName": "Apple",
// "rate": 5

const state = {
    products: [],
}

const getters = {
    searchProductsByText(state) {
        return (searchText) => {
            const products = []
            searchText = searchText.toLowerCase()
            for (const product of state.products) {
                const keywords = [product.category, product.name, product.venderName, product.description]
                for (const keyword of keywords) {
                    if (!keyword) continue
                    if (keyword.toLowerCase().includes(searchText)) {
                        products.push(product)
                        break
                    }
                }
            }
            return products
        }
    }
}

const actions = {
    async loadAllProducts({ commit }) {
        const productsData = await getAllProducts();
        commit('updateProductsData', productsData.productList);
    }
}

const mutations = {
    updateProductsData(state, productsData) {
        state.products = productsData
    }
}

export default { namespaced: true, state, getters, actions, mutations };