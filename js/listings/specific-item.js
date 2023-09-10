import { displayErrorMessage } from "../functions/errormessage.js";
import { completeListings } from "../api/url.js";
import { isLoggedIn } from "../templates/nav.js";
import { logoutButton } from "../functions/logout.js";

isLoggedIn();
logoutButton();

const specificItem = "?_seller=true&_bids=true";
const deleteUrl = `${completeListings}`;

let params = new URLSearchParams(document.location.search);
let id = params.get("id");

const getItemUrl = `${completeListings}/${id}/${specificItem}`;
const makeBidUrl = `${completeListings}/${id}/bids`;

console.log(getItemUrl);

let singleAuction = [];

async function getItem(url) {

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


        const headTitle = document.querySelector ("title");
        headTitle.innerHTML = `${result.title}`; 

        singleAuction = result;
        listSingleAuction(result, outElement);
        
    }
    catch (error) {
        const outElement = document.getElementById("item-details");
        displayErrorMessage(outElement); 

    }
}

getItem(getItemUrl);

const outElement = document.getElementById("item-details");

function listSingleAuction(item, out){
    
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

  // Display the highest bid
    const allBids = item.bids;
    let highestBid = 0;
  
    function getHighestBid(allBids) {
      if (allBids.length !== 0) {
        highestBid = allBids
          .map((o) => o.amount)
          .reduce(function (a, b) {
            return Math.max(a, b);
          });
      }
    }
    getHighestBid(allBids);

    const numberOfBids = document.getElementById("number-of-bids")
    numberOfBids.innerHTML = `Highest bid: ${highestBid}`;

    //get specific item

    const itemImg =
    item.media.length === 0 || item.media === "undefined"
    ? 
      "/images/No-Image-Placeholder.svg.png"
      : `${item.media[0]}`;
  
        let newItem = "";
        newItem += `
                      <div class="mb-5 col-lg-12 col-md-8">
                      <img src="${itemImg}" class="card-img-top card-img" alt="..">
                      </div>

                      <h2 class="my-4">${item.title}</h2>
                      <p>${item.description}</p>

                      <div class="card-body d-flex">
                        <p>Auction ends: </p>
                        <p class="timer">${bidTime}</p>
                     </div>
                     <h2 class="mt-4">Bidders: (${item._count.bids})</h2>
            `;
      const sendBidBtn = document.getElementById("create-bid-btn");
      sendBidBtn.addEventListener("click", createBidForm);
    
    out.innerHTML = newItem;
    console.log(newItem);

//Timer
    const timer = document.querySelector(".timer");
    let bidEnding = timer.innerHTML;
    if (bidEnding !== "EXPIRED") {
        timer[i].classList.add("not-expired");
    } else {
            timer[i].classList.add("expired");
    }    


  //make Bid
  const makeBid = document.getElementById("make-a-bid");
  const myBid = document.getElementById("my-bid");
  const userNotSignedIn = document.getElementById("user-not-signedin");
  const bidExpired = document.getElementById("bid-expired");
 

  function displayBid() {
    const accessToken = localStorage.getItem("accessToken");
    const userName = localStorage.getItem("username");
    if (accessToken && userName !== item.seller.name) {
        myBid.style.display="none";
        userNotSignedIn.style.display="none";
        bidExpired.style.display="none";        
    } 
    else if (accessToken && userName === item.seller.name) {
        makeBid.style.display="none";
        userNotSignedIn.style.display="none";
        bidExpired.style.display="none"; 
    }
    else if (!accessToken) {
        makeBid.style.display="none";
        myBid.style.display="none";
        bidExpired.style.display="none";
    }
    else if (timer.innerHTML="EXPIRED") {
        makeBid.style.display="none";
        myBid.style.display="none";
        userNotSignedIn.style.display="none";
    }
       
    }

    displayBid()

          //Delete Bid
          const deleteBid = document.getElementById("delete-bid-btn");
          deleteBid.addEventListener("click", () => {
               if ( confirm('Are you sure you want to delete your bid?')){
                   deleteInputs(item.id);
               }
         }) 
}

// Delete Inputs
async function deleteInputs (id) {
    const url = `${deleteUrl}${id}`;
     try {
        const accessToken = localStorage.getItem('accessToken'); 
        const options = {
            method: 'DELETE', 
            headers : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };
        

        const response = await fetch(url, options); 
        //console.log("Delete response:", response);
        //const answer = await response.json();
        //console.log("Delete answer:", answer);
        if (response.status === 204) {
            window.location = "/index.html";
          }    } catch(error) {
         console.log(error);
    }
}


//List out all bids
async function getSingleBids (url) {
    try {
        const accessToken = localStorage.getItem('accessToken'); 
        const options = {
            method: 'GET', 
            headers : {
                Authorization: `Bearer ${accessToken}`,
            }
        }

        const response = await fetch(url, options); 
        const bids = await response.json();
     
        const result = bids.bids
        allBids(result, biddersElement)   

    } catch(error) {
        console.log(error);
    }
}   

getSingleBids(getItemUrl);

const biddersElement = document.getElementById("bid-container")

function allBids(list, bidders) {
    bidders.innerHTML = "";
    let newItem = "";

    list.sort(function(a, b){
        return b.amount - a.amount
    })
 
    for (let bid of list) {
        newItem += `
        <ul class="list-unstyled bidder mt-3">
                          <li class="d-flex justify-content-between align-items-center">
                              <div class="d-flex align-items-center">
                                  <span>@</span>
                                  <div class="d-flex align-items-center">
                                      <img src="">
                                      <span>${bid.bidderName}</span>
                                  </div>
                              </div>
                              <span class="price">${bid.amount}</span>
                          </li>
                      </ul>`
    } 
    bidders.innerHTML = newItem;
}


//make a Bid 
async function createBid(url, data) {
    try {
      const accessToken = localStorage.getItem("accessToken");
     
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      };
   
      const response = await fetch(url, options);
      const result = await response.json();

      const bidErrorMsg = document.getElementById("bid-error-msg");
      if (response.status === 200) {
        window.location.reload();
      } else {
        bidErrorMsg.innerHTML = result .errors[0].message;
      }
      console.log(result );
    } catch (error) {
      console.log(error);
    }
}

//Validate bid

function createBidForm(event) {
    event.preventDefault();
    const bidInput = document.getElementById("create-bid-input").value.trim();
    const bidInputMsg = document.getElementById("create-bid-msg");

    const bidToSend = parseInt(bidInput);
  
    let bidData = {
      amount: bidToSend,
    };
  
    if (!isNaN(bidToSend)) {
    } else {
      bidInputMsg.innerHTML = "Bid has to be a number.";
    }

      function isLoggedin() {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            
           alert("You have to sign in to place a bid!");
           window.location.href = "/signin.html";
        }
      }
      
        isLoggedin();
  
    createBid(makeBidUrl, bidData);
  }


