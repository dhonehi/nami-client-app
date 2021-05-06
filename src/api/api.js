import io from 'socket.io-client/dist/socket.io'

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

export const getUserOrders = (sessionId) => {
    return fetch(BASE_URL + 'orders', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Cookie': `${sessionId}`
        }
    })
}

export const getOrderProducts = (orderId, sessionId) => {
    return fetch(BASE_URL + 'order/' + orderId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Cookie': `${sessionId}`
        }
    })
}

export const sendOrder = (order, sessionId) => {
    return fetch(BASE_URL + 'order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Cookie': `${sessionId}`
        },
        body: JSON.stringify(order)
    })
}

export const connectToWs = (sessionId) => {
    return io('https://namisushi.ru/', {
        jsonp: false,
        path: '/ws',
        extraHeaders: {
            'Cookie': `${sessionId}`
        }
    });
}
