export function userNotAuth(method, body) {
    const getData = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    return getData;
}

export function userAuth(method, token) {
    const getData = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    return getData;
}

export function userCompleteAuth(method, body, token) {
    const getData = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    };
    return getData;
}