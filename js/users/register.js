import { completeRegister } from "../api/url.js"
import { isLoggedIn } from "../templates/nav.js"

isLoggedIn();

//DOM elements
const userReg = document.getElementById("name");
const emailReg = document.getElementById("email");
const avatarReg = document.getElementById("avatar");
const passwordReg = document.getElementById("password");
const submitReg = document.getElementById("submit");

let registerUrl = completeRegister;

submitReg.addEventListener("click", validateUser)

function validateUser(event) {
    event.preventDefault();

    const username = userReg.value.trim();
    const email = emailReg.value.trim();
    const avatar = avatarReg.value.trim();
    const password = passwordReg.value.trim();
   

   const newUser = {
       name: username,
       email: email,
       avatar: avatar,
       password: password,
   }

   regNewUser(registerUrl, newUser);
   
}

async function regNewUser(url, data) {
    const errorMessage = document.getElementById("errorMessage")

    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer`,
            },
            body: JSON.stringify(data),
        };
        
        const response = await fetch (url, options);
        const result = await response.json();

        if (response.status === 201) {
            window.location = "profile.html";
        } else if (result.errors[0].message === "Profile already exists") {
            errorMessage.innerHTML = `This profile already exists!`;
        }
    } catch (error) {
        console.log(error);
    }

}

//Validate form

//form messages inputs
const nameInput = document.getElementById("name-msg");
const emailInput = document.getElementById("email-msg");
const avatarInput = document.getElementById("avatar-msg");
const passwordInput = document.getElementById("password-msg");

submitReg.addEventListener('click', validateForm);
function validateForm() {
    const username = userReg.value.trim();
    const email = emailReg.value.trim();
    const password = passwordReg.value.trim();
    const avatar = avatarReg.value.trim();

    nameInput.innerHTML = "";
    const enteredName = username;

    if (enteredName.length < 4) {
        nameInput.innerHTML += `Your username must be minimum 4 characters!` 
    }

    emailInput.innerHTML = "";
    const enteredEmail = email;
    let emailAdress = /\S+@\S+\.\S+/;
    if (!emailAdress.test(enteredEmail)) {
        emailInput.innerHTML += "Please enter a valid email"
    }

    if (
        !(
            enteredEmail.includes("@stud.noroff.no") ||
            enteredEmail.includes("@noroff.no") 
        )
     ) {
        emailInput.innerHTML += "Email must include @stud.noroff.no or @noroff.no";
     }

    const enteredAvatar = avatar;
    avatarInput.innerHTML = "";
    let avatarImg = /\.(jpeg|jpg|gif|png|svg)$/;
    if (enteredAvatar === "") {
        avatarInput.innerHTML = "https://robohash.org/0e1907e79a1a36ee245672467e77792e?set=set4&bgset=&size=400x400";
    } else if (!enteredAvatar.value == "" && !avatarImg.test(enteredAvatar))
    { avatarReg.innerHTML = "Please enter a valid avatar url!";}

    passwordInput.innerHTML = "";
    const enteredPassword = password;
    if (enteredPassword.length < 8) {
        passwordInput.innerHTML += 'The password must be at least 8 characters!';
    }

    if (nameInput.innerHTML === "" && emailInput.innerHTML === "" && avatarInput === "" && passwordInput.innerHTML === "") {
     }
     else {
        console.log("Please correct the data in the form");
    }

}