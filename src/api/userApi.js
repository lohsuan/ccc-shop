import axios from "axios";

export const loginUser = async function (username, password) {
  // let json = {
  //   "username": username,
  //   "password": password
  // }
  let fakeUser = {
    "message": "Success!",
    "id": 3,
    "username": username,
    "password": password,
    "identity": "ADMIN",
    "phone": "0943214321",
    "email": "superman@gmail.com",
    "creditCard": "2222333-4444555",
    "address": "台北市大安區忠孝東路xxx號5F"
  }
  try {
    // const response = await axios.post("/api/user/login", json);
    // return response.data;
    return fakeUser;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createUser = async function (username, identity, password, phone, email, creditCard, address) {
  let json = {
    "username": username,
    "identity": identity,
    "password": password,
    "phone": phone,
    "email": email,
    "creditCard": creditCard,
    "address": address
  }

  try {
    const response = await axios.post("/api/user/create", json);
    return response.data;
  } catch (err) {
    console.log(err);
    alert("此使用者名稱已被使用，嘗試其他的試試 !")
    return null;
  }
};

export const updateUser = async function (id, username, identity, phone, email, creditCard, address) {
  let json = {
    "id": id,
    "username": username,
    "identity": identity,
    "phone": phone,
    "email": email,
    "creditCard": creditCard,
    "address": address
  }

  try {
    const response = await axios.post("/api/user/update", json);
    return response.data;
  } catch (err) {
    console.log(err);
    alert("此使用者名稱已被使用，嘗試其他的試試 !")
  }
};

export const getAllUser = async function () {
  try {
    // const response = await axios.get("/api/user/get-all");
    // return response.data.userList;
    return fakeUserList;
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async function (id) {
  let json = {
    "id": id,
  }

  try {
    const response = await axios.post("/api/user/delete", json);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

let fakeUserList = [
  {
    "id": 1,
    "username": "Admin",
    "identity": "ADMIN",
    "password": null,
    "phone": "0912341234",
    "email": "admin@gmail.com",
    "creditCard": "0000111-2222333",
    "address": "home"
  },
  {
    "id": 2,
    "username": "Apple",
    "identity": "STAFF",
    "password": null,
    "phone": "0912345678",
    "email": "apple@gmail.com",
    "creditCard": "1111222-3333444",
    "address": "台北市大安區忠孝東路xxx號5F"
  },
  {
    "id": 3,
    "username": "ASUS",
    "identity": "STAFF",
    "password": null,
    "phone": "0900112233",
    "email": "google@gmail.com",
    "creditCard": null,
    "address": "台北市大安區忠孝東路xxx號5F"
  },
  {
    "id": 4,
    "username": "Samsung",
    "identity": "STAFF",
    "password": null,
    "phone": "0909090909",
    "email": "acer@gmail.com",
    "creditCard": null,
    "address": "台北市大安區忠孝東路xxx號5F"
  },
  {
    "id": 5,
    "username": "Zachary",
    "identity": "CUSTOMER",
    "password": null,
    "phone": "0943214321",
    "email": "zachary@gmail.com",
    "creditCard": "2222333-4444555",
    "address": "台北市大安區忠孝東路xxx號5F"
  },
  {
    "id": 6,
    "username": "Mandy",
    "identity": "CUSTOMER",
    "password": null,
    "phone": "0987654321",
    "email": "mandy@gmail.com",
    "creditCard": null,
    "address": "台北市大安區忠孝東路xxx號5F"
  },
  {
    "id": 7,
    "username": "Patrick",
    "identity": "CUSTOMER",
    "password": null,
    "phone": "0943214321",
    "email": "patrick@gmail.com",
    "creditCard": "1122333-4444555",
    "address": "台北市大安區忠孝東路xxx號5F"
  },
  {
    "id": 8,
    "username": "Sandy",
    "identity": "CUSTOMER",
    "password": null,
    "phone": "0943214321",
    "email": "sandy@gmail.com",
    "creditCard": "8822333-4444555",
    "address": "台北市大安區忠孝東路xxx號5F"
  }
]