import { completeProfile } from "../api/url";
import { userCompleteAuth } from "../api/headers";

export function changeAvatar() {
    const avatarBtn = document.getElementById("change-avatar");
    const avatarContainer = document.getElementById("avatar-container");
    const avatarForm = document.getElementById("change-avatar-form");

    avatarBtn.addEventListener('click', (e) => {
        avatarContainer.classList.toggle('avatar-containerVisble');
    })

    avatarForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const avatarUrl = avatarForm[0].value;
        const name = localStorage.getItem('name');
        const url  = `${completeProfile}${name}/media`;
        const method = 'PUT'
        const body = {
            "avatar": avatarUrl,
        }
        const token = localStorage.getItem('accessToken');

        updateAvatar(url, body, method, token);
    })

}

async function updateAvatar(url, body, method, token) {
    const response = await fetch(url, userCompleteAuth(method, body, token))
    const json = await response.json();

    if (json.avatar) {
        window.location.reload();
    }
}
