import { completeProfile } from "../api/url.js";
import { isLoggedIn } from "../templates/nav.js"
import { logoutButton } from "../functions/logout.js";

isLoggedIn();
logoutButton();

const username = localStorage.getItem('username');

const profileUrl = `${completeProfile}${username}?_listings=true`;
//const updateAvatarUrl = `${completeProfile}${username}/media`;
//const userBidsUrl = `${completeProfile}${username}/bids?_listings=true`;

let profileAccount = [];

const noListings = document.getElementById("no-listings");

async function getProfile(url) {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }

        const response = await fetch(url, options);
        const profile = await response.json()
        const credits = profile.credits;
        const signedIn = localStorage.getItem("accessToken");
        if (signedIn) {
            document.getElementById("credits").innerHTML = `Credits:
           ${credits} 
           `;
        }
        profileAccount = profile
        profileOverview(profileAccount)

    } catch (error) {
        console.log(error);
    }
}

getProfile(profileUrl);



function profileOverview(user) {

    const userImg = user.avatar;
    const signedIn = localStorage.getItem("accessToken");
    if (signedIn) {
        document.getElementById("user-avatar").src = `${userImg}`;
    }

    const userName = document.getElementById("username");
    userName.innerHTML = `${user.name}`

    const useremail = document.getElementById("email");
    useremail.innerHTML = `${user.email}`

    const userCredits = document.getElementById("credits");
    userCredits.innerHTML = `Credits: ${user.credits}`

    console.log(user)
    if (user.listings.length === 0) {
        noListings.innerHTML = "You have no listings";
    } else {
        noListings.innerHTML = `${user.listings.length} listings`;
        for (let i = 0; i < user.listings.length; i++) {
            noListings.innerHTML += `<p>${user.listings[i].title}</p>`;
        }
    }


}