import { completeListings } from "../api/url.js";
import { displayErrorMessage } from "../functions/errormessage.js";
import { isLoggedIn } from "../templates/nav.js"

const accessToken = document.getElementById('accessToken');

if(!accessToken) {
    location.href = "/";
}

isLoggedIn();

const form = document.querySelector("form");
const itemTitle = document.querySelector("#itemTitle");
const itemContent = document.querySelector("#itemContent");
const itemImage = document.querySelector("#summary");
const bidEnds = document.querySelector(".bidEnds");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const title = itemTitle.value.trim();
    const description = itemContent.value.trim();
    const media = itemImage.value.trim();
    const endsAt = bidEnds.value.trim();

    if(title.length === 0 || description.length === 0 || media.length === 0 || endsAt.length === 0) {
        return displayMessage("warning", "Please supply proper values", "message-container");
    }

    createBid(title, description, media, endsAt);
}

async function createBid(title, description, media) {
    const url = completeListings;

    const data = JSON.stringify({ title: title, description: description, media: media, endsAt: endsAt});

    const accessToken = document.getElementById('accessToken');

    const options = {
        method: "POST", 
        body: data, 
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if(json.created_at) {
            displayMessage("success", "Article added succesfully", ".message-container")
            form.reset();
        }

        if(json.error) {
            displayMessage("error", "json.message", ".message-container")
        }

    }
    catch (error) {
        displayMessage("error", "An error occured", ".message-container")

    }


}