export function auctionList(bid) {
    const listingContainer = document.querySelector(".listings");
    listingContainer.innerHTML="";


//create list of auction listings
 for (let i = 0; i < bid.length; i++) {
        
                listingContainer.innerHTML += `
                                        <div class="col-lg-4 col-md-6 col-sm-12">
                                            <a href="specific-item.html?id=${bid[i].id}" class="listing">
                                            <div class="card mt-5">
                                                <img src="${bid[i].media[0]}" class="card-img" alt=".." />
                                                <div class="listing_info">
                                                    <h3>${bid[i].title}</h3>
                                                    <p class="bid_amount">Bids: ${bid[i]._count.bids}</p>
                                                    <div class="category">
                                                        <div>#${bid[i].tags}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            </a>
                                        </div>`
            

     }
} 
