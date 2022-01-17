import axios from "axios";

export const getProduct = async function (id) {
  let json = {
    "id": id
  }

  try {
    const response = await axios.post("/api/product/get", json);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllProducts = async function () {
  try {
    // const response = await axios.get("/api/product/get-all");
    // return response.data;
    return defaultProducts;
  } catch (err) {
    console.log(err);
  }
};

export const createProduct = async function (name, venderId, category, price, stock, warehouseAddress, description, pictureURL) {
  let json = {
    "name": name,
    "venderId": venderId,
    "category": category,
    "price": price,
    "stock": stock,
    "warehouseAddress": warehouseAddress,
    "description": description,
    "pictureURL": pictureURL,
  }

  try {
    const response = await axios.post("/api/product/create", json);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteProduct = async function (id) {
  let json = {
    "id": id
  }

  try {
    const response = await axios.post("/api/product/delete", json);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = async function (name, venderId, category, price, stock, warehouseAddress, description, pictureURL, id) {
  let json = {
    "name": name,
    "venderId": venderId,
    "category": category,
    "price": price,
    "stock": stock,
    "warehouseAddress": warehouseAddress,
    "description": description,
    "pictureURL": pictureURL,
    "existFlag": 1,
    "id": id
  }

  try {
    const response = await axios.post("/api/product/update", json);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

let defaultProducts = {
  "message": "Success!",
  "productList": [
    {
      "id": 1,
      "venderId": 2,
      "name": "Macbook Pro",
      "category": "NOTEBOOK",
      "price": 54700,
      "stock": 152,
      "warehouseAddress": "XX市XX區XX路XX號XX樓",
      "description": "這是很厲害的蘋果筆電",
      "pictureURL": "https://attach.setn.com/newsimages/2021/10/19/3367537-PH.jpg",
      "venderName": "Apple",
      "rate": 3,
      "existFlag": true
    },
    {
      "id": 2,
      "venderId": 2,
      "name": "iMac",
      "category": "COMPUTER",
      "price": 72900,
      "stock": 48,
      "warehouseAddress": "XX市XX區XX路XX號XX樓",
      "description": "這是很厲害的蘋果電腦",
      "pictureURL": "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/imac-og-202008?wid=600&hei=315&fmt=jpeg&qlt=95&.v=1594849639000",
      "venderName": "Apple",
      "rate": 4.5,
      "existFlag": true
    },
    {
      "id": 3,
      "venderId": 2,
      "name": "iPhone 13 Pro",
      "category": "PHONE",
      "price": 32900,
      "stock": 198,
      "warehouseAddress": "XX市XX區XX路XX號XX樓",
      "description": "這是很貴的蘋果手機",
      "pictureURL": "https://web-eshop.cdn.hinet.net/eShop%20Images/Product/phones/000100004254/154632-C50321583002.jpg",
      "venderName": "Apple",
      "rate": 5,
      "existFlag": true
    },
    {
      "id": 4,
      "venderId": 2,
      "name": "iPad mini",
      "category": "TABLET",
      "price": 14900,
      "stock": 123,
      "warehouseAddress": "XX市XX區XX路XX號XX樓",
      "description": "這是很好用的蘋果平板",
      "pictureURL": "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-mini-select-202109_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=80&.v=1631751019000",
      "venderName": "Apple",
      "rate": 4,
      "existFlag": true
    },
    {
      "id": 5,
      "venderId": 2,
      "name": "iPhone SE",
      "category": "PHONE",
      "price": 14500,
      "stock": 37,
      "warehouseAddress": "XX市XX區XX路XX號XX樓",
      "description": "這是比較便宜的蘋果手機",
      "pictureURL": "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_new-iphone-se-white_04152020_big.jpg.large.jpg",
      "venderName": "Apple",
      "rate": 5,
      "existFlag": false
    },
    {
      "id": 6,
      "venderId": 3,
      "name": "ChromePad CT100",
      "category": "TABLET",
      "price": 9500,
      "stock": 23,
      "warehouseAddress": "XX市XX區XX路XX號XX樓",
      "description": "這是很好用的華碩平板",
      "pictureURL": "https://www.asus.com/media/global/gallery/MxNQtIeWKR9EANan_setting_xxx_0_90_end_2000.png",
      "venderName": "ASUS",
      "rate": 5,
      "existFlag": true
    },
    {
      "id": 7,
      "venderId": 3,
      "name": "Zenfone 8",
      "category": "PHONE",
      "price": 21900,
      "stock": 264,
      "warehouseAddress": "XX市XX區XX路XX號XX樓",
      "description": "這是比較便宜的華碩手機",
      "pictureURL": "https://dlcdnwebimgs.asus.com/gain/c05b6491-6d2b-48f0-81f0-d268840208d6/",
      "venderName": "ASUS",
      "rate": 5,
      "existFlag": true
    },
    {
      "id": 8,
      "venderId": 3,
      "name": "ROG Phone 5s Pro",
      "category": "PHONE",
      "price": 37990,
      "stock": 120,
      "warehouseAddress": "XX市XX區XX路XX號XX樓",
      "description": "這是很貴的華碩手機",
      "pictureURL": "https://dlcdnwebimgs.asus.com/gain/885B6C14-4A95-44AE-9073-602451A79511/w1000/h732",
      "venderName": "ASUS",
      "rate": 0,
      "existFlag": true
    },
    {
      "id": 9,
      "venderId": 3,
      "name": "TUF Dash F15",
      "category": "NOTEBOOK",
      "price": 45000,
      "stock": 326,
      "warehouseAddress": "XX市XX區XX路XX號XX樓",
      "description": "這是很好用的華碩筆電",
      "pictureURL": "https://dlcdnwebimgs.asus.com/gain/15d0f62e-8b6b-4acd-b938-1bfbd908cb67/",
      "venderName": "ASUS",
      "rate": 0,
      "existFlag": true
    },
    {
      "id": 10,
      "venderId": 3,
      "name": "S700TA",
      "category": "COMPUTER",
      "price": 27000,
      "stock": 8,
      "warehouseAddress": "XX市XX區XX路XX號XX樓",
      "description": "這是很厲害的華碩電腦",
      "pictureURL": "https://www.asus.com/media/global/gallery/spghwb4k7042hglq_setting_xxx_0_90_end_2000.png",
      "venderName": "ASUS",
      "rate": 4,
      "existFlag": true
    },
    {
      "id": 11,
      "venderId": 4,
      "name": "Galaxy Book Pro 360",
      "category": "NOTEBOOK",
      "price": 12000,
      "stock": 28,
      "warehouseAddress": "XX市XX區XX路XX號XX樓",
      "description": "這是很好用的三星筆電",
      "pictureURL": "https://images.samsung.com/is/image/samsung/p6pim/uk/feature/155011270/uk-feature-thin-as-a-smartphone--powerful-as-a-pc-505622468?$FB_TYPE_A_MO_JPG$",
      "venderName": "Samsung",
      "rate": 5,
      "existFlag": true
    },
    {
      "id": 12,
      "venderId": 4,
      "name": "Galaxy Z Fold3 5G",
      "category": "PHONE",
      "price": 56888,
      "stock": 380,
      "warehouseAddress": "XX市XX區XX路XX號XX樓",
      "description": "這是很貴的三星手機",
      "pictureURL": "https://images.samsung.com/ca/smartphones/galaxy-z-fold3-5g/buy/zfold3_carousel_productimage_phantomsilver_mo.jpg?imwidth=720",
      "venderName": "Samsung",
      "rate": 5,
      "existFlag": true
    },
    {
      "id": 13,
      "venderId": 4,
      "name": "Galaxy Tab A7",
      "category": "TABLET",
      "price": 8490,
      "stock": 230,
      "warehouseAddress": "XX市XX區XX路XX號XX樓",
      "description": "這是比較便宜的三星平板",
      "pictureURL": "https://images.samsung.com/is/image/samsung/tw-galaxy-tab-a7-t500-sm-t500nzaebri-frontgray-319595330?$720_576_PNG$",
      "venderName": "Samsung",
      "rate": 4,
      "existFlag": true
    },
    {
      "id": 14,
      "venderId": 4,
      "name": "Galaxy Note20 5G",
      "category": "PHONE",
      "price": 32900,
      "stock": 54,
      "warehouseAddress": "XX市XX區XX路XX號XX樓",
      "description": "這是比較便宜的三星手機",
      "pictureURL": "https://images.samsung.com/is/image/samsung/tw/galaxy-note20/gallery/tw-galaxy-note20-5g-n981-sm-n9810zagbri-frontmysticgray-thumb-272461109",
      "venderName": "Samsung",
      "rate": 0,
      "existFlag": true
    },
    {
      "id": 15,
      "venderId": 4,
      "name": "Galaxy Tab S7+ 5G",
      "category": "TABLET",
      "price": 34990,
      "stock": 28,
      "warehouseAddress": "XX市XX區XX路XX號XX樓",
      "description": "這是很貴的三星平板",
      "pictureURL": "https://images.samsung.com/is/image/samsung/p5/tw/tablets/galaxy-tab-s7/images/galaxy-tab-s7-s7plus-keyboard-spen-mystic-bronze-mo.jpg",
      "venderName": "Samsung",
      "rate": 0,
      "existFlag": true
    }
  ]
}