import axios from "axios";

export const loginUser = async function (username, password) {
  // let json = {
  //   "username": username,
  //   "password": password
  // }
  let defaultUser = {
    "message": "Success!",
    "id": 5,
    "username": username,
    "password": password,
    "identity": "CUSTOMER",
    "phone": "0943214321",
    "email": "superman@gmail.com",
    "creditCard": "2222333-4444555",
    "address": "台北市大安區忠孝東路xxx號5F"
  }
  try {
    // const response = await axios.post("/api/user/login", json);
    // return response.data;
    return defaultUser;
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
  // export const getAllUser = function () {
  // var users = [
  //   {
  //     id: "0",
  //     username: "Frozen",
  //     identity: "admin",
  //     password: "12321312",
  //     email: "fds@ggg",
  //     phone: "0912312312",
  //     creditCard: "123123123",
  //     address: "home",
  //   },
  //   {
  //     id: "1",
  //     username: "Ice",
  //     identity: "staff",
  //     password: "1232131",
  //     email: "hello@g",
  //     phone: "0912312312",
  //     creditCard: "12312312312",
  //     address: "my address",
  //   },
  // ];

  try {
    const response = await axios.get("/api/user/get-all");
    return response.data.userList;
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