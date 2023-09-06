import { completeLogin } from "../api/url.js";
import { displayErrorMessage } from "../functions/errormessage.js";
import { isLoggedIn } from "../templates/nav.js";

isLoggedIn();

const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
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
                Authorization: `Bearer`,
            },
            body: JSON.stringify(data),
        };

        const response = await fetch (url, options);
        const result = await response.json();

        localStorage.setItem('username', result.name);
        localStorage.setItem('accessToken', result.accessToken);

        if (response.status === 200) {
            window.location = "profile.html";
        } else if (response.status === 401) {
            displayErrorMessage(errormessage);
        }

    } catch(error) {
        console.log(error);
    }
}