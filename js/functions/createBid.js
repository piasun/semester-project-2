export async function createBid(url, data) {
    try {
        const accessToken = localStorage.getItem("accessToken");
        //console.log(accessToken);
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        };
        //console.log(url, data, options);
        const response = await fetch(url, options);
        //console.log(response);
        const result = await response.json();
        const bidErrorMsg = document.getElementById("bid-error-msg");
        if (response.status === 200) {
          window.location.reload();
        } else {
          bidErrorMsg.innerHTML ="Something went wrong, please try again";
        }
        console.log(answer);
      } catch (error) {
        console.log(error);
      }
    }

    function createBidForm(event) {
        event.preventDefault();
        const bidInput = document.getElementById("create-bid-input").value.trim();
        const bidInputMsg = document.getElementById("create-bid-msg");
        //console.log("Bid elements:", bidInput, bidInputMsg);
        const bidToSend = parseInt(bidInput);
        //console.log("bidToSend:", bidToSend);
      
        let bidData = {
          amount: bidToSend,
        };
      
        if (!isNaN(bidToSend)) {
          //console.log("value is a number");
        } else {
          bidInputMsg.innerHTML = "Bid has to be a number.";
        }
    
          // Checking if user is logged in
          function isLoggedin() {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                
               alert("You have to sign in to place a bid!");
               window.location.href = "./login.html";
            }
          }
          
            isLoggedin();
      
        createBid(makeBidUrl, bidData);
      }