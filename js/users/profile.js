import { completeProfile } from "../api/url.js";
//import { completeListings } from "../api/url";
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
        profileOverview(profileAccount)

    } catch(error) {
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

    if(user.listings.length === 0) {
        noListings.innerHTML = "You have no listings"
    }

}


const itemTitle = document.querySelector(".itemTitle");
const itemContent = document.querySelector(".itemContent");
const itemImage = document.querySelector(".itemImage");
const endsBid = document.querySelector(".endBid");
const submitItemBtn = document.querySelector(".submitItem");

const createListing = completeListings;

async function addListing(url, data) {
    try {
        const accessToken = localStorage.getItem('accessToken'); 
        const options = {
            method: 'POST', 
            headers : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        };
       console.log("Url:", url,"Data:", data,"Options:", options);

        const response = await fetch(url, options); 
        const answer = await response.json();

        if (answer.id) {
            window.location = "./index.html";
          }
    } catch(error) {
        console.log(error);
    }
}

addListing(createListing);