import { isLoggedIn } from "../templates/nav.js"
import { logoutButton } from "../functions/logout.js";
import { createListingForm } from "../listings/createListing.js";
import { changeAvatar } from "../functions/updateAvatar.js";

isLoggedIn();
logoutButton();

const noListings = document.getElementById("no-listings");

function createProfile(profile) {

    const section = document.getElementById("userdetails");
    const doc = section.contentEditable.cloneNode(true);

    const name = profile.name;
    const email = profile.email;
    const avatar = profile.avatar;
    const credits = profile.credits;

    doc.querySelector("username").innerText = name;
    doc.getElementById("email").innerText = email;
    doc.getElementById("avatar").src = avatar;
    doc.getElementById("credits").innerText = 'Credits: ${credits}';

    const profileContainer = document.getElementById("profile");
    profileContainer.append(doc);

   const createListingBtn = document.getElementById("create-listing");
   createListingBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const listingContainer = document.getElementById("form-create-listing");
    listingContainer.classList.toggle('makeVisible');
   })

   createListingForm();
   changeAvatar();


}

createProfile();

