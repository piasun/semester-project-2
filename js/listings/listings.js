import { completeListings } from "../api/url.js";
import { displayErrorMessage } from "../functions/errormessage.js";
import { isLoggedIn } from "../templates/nav.js";
import { logoutButton } from "../functions/logout.js";

isLoggedIn();
logoutButton();

let itemUrl = completeListings;

let allAuctions = [];

async function getListings (url) {
    try {
        const accessToken = localStorage.getItem('accessToken'); 
        const options = {
            method: 'GET', 
            headers : {
                Authorization: `Bearer ${accessToken}`,
            }
        }

        const response = await fetch(url, options); 
        const result = await response.json();
    
        allAuctions = result;
        getAllAuction(result, outElement)

    } catch(error) {
        const outElement = document.getElementById("listings");
        displayErrorMessage(outElement); 
    }
}   

getListings(itemUrl);

const outElement = document.getElementById("listings");

function getAllAuction(list, out){
    
    out.innerHTML = "";
    let content = "";

    for (let item of list) {

   const itemImg =
   item.media.length === 0 || item.media == "undefined"
   ? 
    "/images/No-Image-Placeholder.svg.png"
    : `${item.media[0]}`;

//layout for timesettings
    let date = new Date(item.endsAt);
    let now = new Date().getTime();
    let distance = date - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    let bidTime = "";
    bidTime = days + "d " + hours + "h " + minutes + "m ";

   
    if (distance < 0) {
      bidTime = "EXPIRED";
    }

//Single Auction layout with timetable
let dateWrite = new Date(item.endsAt);
let deadline = dateWrite.toLocaleString("default", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });

        content += `
        <div class="col-lg-4 col-md-6 col-sm-12">
            <a href="/specific-item.html?id=${item.id}" class="text-decoration-none"> 
               <div class="card mt-5">
                 <img src="${itemImg}" class="card-img-top card-img" alt="..">
        
                 <div class="card-body">
                 <h4 class="card-title">${item.title}</h4>
                   <div class="d-flex mt-1 pt-2 justify-content-between">
                       <div>
                          <p>Bids:</p>
                          <p>${item._count.bids}</p>
                        </div>
                        <div>
                          <p>Auction ends: </p>
                          <p class="timer">${bidTime}</p>
                          <p class="timer">${deadline}</p>
                         </div>
                    </div>
                    </a> 
                 </div>
               </div>
          </div>`;
    }
    out.innerHTML = content;

        //TIMER
        const timer = document.getElementsByClassName("timer");
        for(let i = 0; i < timer.length; i++) {

        let bidEnding = timer[i].innerHTML;
        
        if (bidEnding !== "EXPIRED") {
        timer[i].classList.add("not-expired");
        } else {
             timer[i].classList.add("expired");
        }    
    }
}

const searchField = document.getElementById("search-listings");
searchField.addEventListener("keyup", filterListings);

function filterListings () {
    const filterListings = searchField.value.toLocaleLowerCase();

    const search = collection.filter((item) => {
        const title = item.title.toLocaleLowerCase();
        return title.includes(filterListings);
    })

    getAllAuction(search, outElement);
}

