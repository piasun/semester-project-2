import { isLoggedIn } from "../templates/nav.js"
import { logoutButton } from "../functions/logout.js";

isLoggedIn();
logoutButton();

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
        profileOverview(profileAccount, detailsElement)
    } catch(error) {
        console.log(error);
    }
}   

getProfile(profileUrl);

const detailsElement = document.getElementById("user-info");

function profileOverview(user, details) {

    details.innerHTML = "";

    const userImg = user.avatar !=""? `${user.avatar}`:"https://robohash.org/0e1907e79a1a36ee245672467e77792e?set=set4&bgset=&size=400x400";
    const avatar = document.getElementById("avatar");
    avatar.src = '${userImg}';
        console.log(userImg);

    const userName = document.getElementById("username");
    userName.innerHTML = `${user.name}`;

    const userCredits = document.getElementById("credits");
    userCredits.innerHTML = `${user.credits}`;

    let userDetails = "";
    userDetails +=` <div class="mb-5 text-white"> 
                        <h1 class="mt-0 mb-0">${user.name}</h1> 
                    </div> `;
    
    details.innerHTML = userDetails;

    if(user.listings.length === 0) {
        noListings.innerHTML = "You have no listings"
    }

}


