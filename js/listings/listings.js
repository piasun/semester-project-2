import { auctionList } from "./auctionlist.js";
import { completeListings } from "../api/url.js";
import { displayErrorMessage } from "../functions/errormessage.js";

let url = completeListings;

async function getListings() {
    try {

        const response = await fetch(url);
        const bid = await response.json();
        console.log(bid);

        auctionList(bid);

    } catch {
        const listingContainer = document.querySelector(".listings");
        displayErrorMessage(listingContainer);
        console.log(error);
    }
   
}

getListings();