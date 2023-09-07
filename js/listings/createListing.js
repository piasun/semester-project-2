import { completeListings } from "../api/url";

const itemTitle = document.querySelector(".itemTitle");
const itemContent = document.querySelector(".itemContent");
const itemImg = document.querySelector(".itemImage");
const endsBid = document.querySelector(".endBid");
const submitItem = document.querySelector(".submitItem");

const createListing = completeListings;

export async function createNewListing(url, data) {
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

createNewListing(createListing);