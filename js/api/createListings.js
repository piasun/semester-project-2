import { userCompleteAuth } from "./headers.js";
import { displayErrorMessage } from "../functions/errormessage";

export async function createListing(url, method, body, token) {

    const response = await fetch(url, userCompleteAuth(method, body, token))
    const json = await response.json();

    if (json.id) {
        window.location.reload();
    } else {
        const errors = json.errors;
        displayErrorMessage(errors);
    }
}
