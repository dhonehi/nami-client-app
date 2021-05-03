const BASE_URL = 'https://namisushi.ru/api/'

export const patchUserInfo = (userInfo, sessionId) => {
    return fetch(BASE_URL + 'user', {
        method: 'PATCH',
        headers: {
            'Cookie': sessionId
        },
        body: userInfo
    })
}

export const getUserInfo = (sessionId) => {
    return fetch(BASE_URL + 'user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Cookie': sessionId
        },
    })
}

export const signup = (registrData) => {
    return fetch(BASE_URL + 'signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(registrData)
    })
}

export const signout = (sessionId) => {
    return fetch(BASE_URL + 'signout', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Cookie': sessionId
        },
    })
}

export const signin = (loginData) => {
    return fetch(BASE_URL + 'signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(loginData)
    })
}
