export function auctionList(bid) {
    const listingContainer = document.querySelector(".listings");
    listingContainer.innerHTML="";


//create list of auction listings
 for (let i = 0; i < bid.length; i++) {

    let endDate = new Date(bid.endsAt);
    let now = new Date().getTime();
    let distance = endDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    let bidTime = "";
    bidTime = days + "d " + hours + "h " + minutes + "m ";

   
    if (distance < 0) {
      bidTime = "CLOSED";
    }

    let dateWrite = new Date(bid.endsAt);
    let deadline = dateWrite.toLocaleString("default", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
        
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
                                                    <div>
                                                    <p>Auction ends:</p>
                                                    <p class="timeLeft">${bidTime}</p>
                                                    <p class="timeLeft">${deadline}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            </a>
                                        </div>`
            

     }

     const timeLeft = document.getElementsByClassName("timeLeft");
     for(let i = 0; i < timeLeft.length; i++) {

     let bidEnding = timeLeft[i].innerHTML;
     
     if (bidEnding !== "CLOSED") {
        timeLeft[i].classList.add("not-expired");
     } else {
        timeLeft[i].classList.add("expired");
     }    
 }
} 
