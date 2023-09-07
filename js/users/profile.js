import { completeProfile } from "../api/url.js";
import { isLoggedIn } from "../templates/nav.js"
import { logoutButton } from "../functions/logout.js";

isLoggedIn();
logoutButton();

const username = localStorage.getItem('username');

const profileUrl = `${completeProfile}${username}?_listings=true`;
const updateAvatarUrl = `${completeProfile}${username}/media`;
const userBidsUrl = `${completeProfile}${username}/bids?_listings=true`;

let profileAccount = [];

async function getProfile (url) {
    try {
        const accessToken = localStorage.getItem('accessToken'); 
        const options = {
            method: 'GET', 
            headers : {
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
        profileOverview(profileAccount, userDetails)
    } catch(error) {
        console.log(error);
    }
}   

getProfile(profileUrl);

const userDetails = document.getElementById("user-info");


