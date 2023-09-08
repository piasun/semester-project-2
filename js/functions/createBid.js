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
          bidErrorMsg.innerHTML = result.errors[0].message;
        }
        console.log(answer);
      } catch (error) {
        console.log(error);
      }
    }


