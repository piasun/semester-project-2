import { displayErrorMessage } from "../functions/errormessage.js";
import { completeListings } from "../api/url.js";
import { createBid } from "../functions/createBid.js";
import { isLoggedIn } from "../templates/nav.js";

isLoggedIn();

const itemContainer = document.querySelector(".item-details");
const specificItem = "?_seller=true&_bids=true";

let params = new URLSearchParams(document.location.search);
let id = params.get("id");


const getItemUrl = `${completeListings}/${id}/${specificItem}`;
const makeBidUrl = `${completeListings}/${id}/bids`;

async function getItem(url) {

    try {
        const response = await fetch(url);
        const item = await response.json();

        console.log(item);

        const headTitle = document.querySelector ("title");
        headTitle.innerHTML = `${item.title}`; 

        createDetailsHtml(item);


    }
    catch (error) {
        const createDetailsHtml = document.querySelector(".item-details");
        displayErrorMessage(createDetailsHtml); 

    }
}

getItem(getItemUrl);

function createDetailsHtml(item) {
    itemContainer.innerHTML = `<h1>${item.title}</h1>
                                <img src="${item.media[0]}" class="card-img" alt=".." />
                                <div class="listing_info">
                                    <p class="bid_amount">Bids: ${item._count.bids}</p>
                                    <div class="category">
                                        <div>#${item.tags}</div>
                                    </div>
                                </div>
                                <div>
                                <div class="bid-container">
                                <p class="bid-error-msg"></p>
                                <button class="make-bid">Make Bid</button>
                                </div>
                                </div>
                                `;

    const createBidBtn = document.querySelector(".make-bid");
    createBidBtn.addEventListener('click', (e) => {
        e.preventDefault();
        createBid(makeBidUrl);
        console.log(createBid);
    })
}


