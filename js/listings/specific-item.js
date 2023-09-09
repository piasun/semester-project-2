import { displayErrorMessage } from "../functions/errormessage.js";
import { completeListings } from "../api/url.js";
import { isLoggedIn } from "../templates/nav.js";

isLoggedIn();

const itemContainer = document.querySelector(".item-details");
const specificItem = "?_seller=true&_bids=true";

let params = new URLSearchParams(document.location.search);
let id = params.get("id");


const getItemUrl = `${completeListings}/${id}/${specificItem}`;
//const makeBidUrl = `${completeListings}/${id}/bids`;

async function getItem(url) {

    try {
        const response = await fetch(url);
        const item = await response.json();

        console.log(item);

        const headTitle = document.querySelector ("title");
        headTitle.innerHTML = `${item.title}`; 

        createItemDetails(item);


    }
    catch (error) {
        const createDetailsHtml = document.querySelector(".item-details");
        displayErrorMessage(createDetailsHtml); 

    }
}

getItem(getItemUrl);

function createItemDetails(item) {

    
    itemContainer.innerHTML = `<div class="col-lg-4 col-md-6 col-sm-12">
                                    <div class="card mt-5">
                                        <img src="${item[i].media[0]}" class="card-img" alt=".." />
                                        <div class="listing_info">
                                            <h1>${item[i].title}</h1>
                                            <p class="bid_amount">Bids: ${item[i]._count.bids}</p>
                                            <div class="category">
                                                <div>#${item[i].tags}</div>
                                            </div>
                                            <div>
                                            <p>Auction ends:</p>
                                            <p class="timeLeft">${bidTime}</p>
                                            <p class="timeLeft">${deadline}</p>
                                            </div>
                                        </div>
                                    </div>
                                    </a>
                                </div>
                                `;
}


