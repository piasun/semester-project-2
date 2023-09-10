import { completeListings } from "../api/url.js";
import { isLoggedIn } from "../templates/nav.js";
import { logoutButton } from "../functions/logout.js";

isLoggedIn();
logoutButton();


const itemTitle = document.getElementById("itemTitle")
const itemContent = document.getElementById("itemContent");
const itemImage = document.getElementById("itemImage");
const itemMediaInput = document.getElementById("itemImage");
const endsBid = document.getElementById("endBid");
const submitItemBtn = document.querySelector(".submitItem");


const createListing = completeListings;

export async function addListing(url, data) {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        };
        //console.log("Url:", url,"Data:", data,"Options:", options);

        const response = await fetch(url, options);
        const answer = await response.json();
        console.log(answer);

        if (answer.id) {
            // window.location = "./index.html";
        }
    } catch (error) {
        console.log(error);
    }
}

//addListing(createListing);

const titleMsg = document.getElementById("titleMsg");
const descMsg = document.getElementById("descMsg");
const mediaMsg = document.getElementById("mediaMsg");
const endbidMsg = document.getElementById("endbidMsg");

submitItemBtn.addEventListener('click', createNewListingForm);
function createNewListingForm(event) {
    event.preventDefault();
    const title = itemTitle.value.trim();
    const description = itemContent.value.trim();
    const itemImg = itemImage.value.trim();
    const endsAt = endsBid.value.trim();
    const media = itemMediaInput.value.trim();
    console.log(title)

    console.log(media)

    const listingData = {
        title: title,
        description: description,
        media: [media],
        endsAt: endsAt,
    };
    console.log(listingData);

    const enteredTitle = title;
    titleMsg.innerHTML = "";
    if (enteredTitle.length < 1) {
        titleMsg.innerHTML = 'Your title has to be at least 1 or more characters.';
    }

    descMsg.innerHTML = "";
    const enteredDesc = description;
    if (enteredDesc.length < 1) {
        descMsg.innerHTML = 'Your description has to be at least 1 or more characters.';
    }

    const enteredMedia = itemImg;
    mediaMsg.innerHTML = "";
    let itemMedia = /\.(jpeg|jpg|gif|png|svg)$/;
    if (enteredMedia === "") {
        mediaMsg.innerHTML = "There is no image of the item";
    } else if (enteredMedia !== "" && !itemMedia.test(enteredMedia)) {
        mediaMsg.innerHTML = "Please enter a valid image url!";
    }

    endbidMsg.innerHTML = "";
    const enteredEndbid = endsAt;
    if (enteredEndbid === "") {
        endbidMsg.innerHTML = 'You have to add a date and time to end your auction!'
    }

    if (titleMsg.innerHTML === "" && descMsg.innerHTML === "" && mediaMsg.innerHTML === "") {
        console.log("Form is submitted!");
    }
    else {
        console.log("Are you sure you have everything right?");
    }
    addListing(createListing, listingData);
}