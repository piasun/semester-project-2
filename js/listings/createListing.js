import { completeListings } from "../api/url";
import { createListing } from "../api/createListings";

export function createListingForm() {
    const method = 'POST';
    const form = document.getElementById("form-create-listing");
    const url = completeListings;
    console.log(url);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const body = {
            "title": form[0].value,
            "description": form[1].value,
            "image": form[2].value,
            "expires": new Date(form[3].value),
        }

        const method = 'POST';
        const token = localStorage.getItem('accesToken');
        createListing(url, method, body, token);
    })
}