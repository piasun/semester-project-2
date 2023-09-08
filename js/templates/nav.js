//DOM elements - Navigation

const signInNav = document.getElementById("signin-nav");
const signOutNav = document.getElementById("signout-nav");
const profileNav = document.getElementById("profile-nav");
const registerNav = document.getElementById("register-nav");

//check if user is logged in

export function isLoggedIn() {
    const accessToken = localStorage.getItem("accessToken");
    if(!accessToken) {
        signOutNav.style.display="none";
        profileNav.style.display="none";
    }
    else {
        signInNav.style.display="none";
        registerNav.style.display="none";
    }
}
isLoggedIn();
