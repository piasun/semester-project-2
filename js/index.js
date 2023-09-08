import { auctionList } from "./listings/auctionlist.js";
import { getListings } from "./listings/listings.js";
import { displayErrorMessage } from "./functions/errormessage.js";
import { isLoggedIn } from "./templates/nav.js";
import { logoutButton } from "./functions/logout.js";

isLoggedIn();
logoutButton();
getListings();

