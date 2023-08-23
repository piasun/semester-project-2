export function auctionList(bid) {
    const listingContainer = document.querySelector(".listings");
    listingContainer.innerHTML="";


//create list of auction listings
 for (let i = 0; i < bid.length; i++) {
        
                listingContainer.innerHTML += `<article class="card">
                                                <a href="specific-item.html?id=${bid[i].title}" class="listing">
                                                    <img src="${bid[i].media}" />
                                                    <h3>${bid[i].title}</h3>
                                                </a>
                                                <p class="bid_amount">Bids: ${bid[i]._count.bids}</p>
                                                <div class="category">
                                                    <div>#${bid[i].tags}</div>
                                                </div>
                                            </article>`
            

     }
} 
