import { completeLogin } from "../api/url.js";
import { isLoggedIn } from "../templates/nav.js";

isLoggedIn();

const emailInput = document.querySelector("email");
const passwordInput = document.querySelector("password");
const submitBtn = document.querySelector("#submit");


submitBtn.addEventListener("click", validateUser);

function validateUser(event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const signinData = {
        email: email,
        password: password,
    }

    signinUser(completeLogin, signinData);
};

const errormessage = document.querySelector(".error-message");

async function signinUser(url, data) {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        console.log(url, data, options)

        const response = await fetch (url, options);
        const answer = await response.json();

        localStorage.setItem('username', answer.name);
        localStorage.setItem('accessToken', answer.accessToken);

        if (response.status === 401) {
            errormessage.innerHTML = answer.errors[0].message;   
        } else if (response.status === 200) {
           window.location = "../index.html";
        }

    } catch(error) {
        console.warn(error);
    }
}