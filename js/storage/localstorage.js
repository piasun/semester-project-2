export function clearStorage() {
    localStorage.clear();
}

export function saveToken(key, token) {
    localStorage.setItem(key, token);
}