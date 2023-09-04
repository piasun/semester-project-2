import { completeRegister } from "../api/url.js"

const userReg = document.getElementById("name");
const emailReg = document.getElementById("email");
const avatarReg = document.getElementById("avatar");
const passwordReg = document.getElementById("password");
const submitReg = document.getElementById("submit");

let url = completeRegister;

function registerUser(event) {
    event.preventDefault();

    const username = userReg.value.trim();
    const email = emailReg.value.trim();
    const password = passwordReg.value.trim();
    const avatar = avatarReg.value.trim();

   const newUser = {
       name: username,
       email: email,
       password: password,
       avatar: avatar,
   }

   registerUser(url, newUser);
}
console.log(newUser);