const BASE_URL = 'https://namisushi.ru/api/'

export const patchUserInfo = (userInfo) => {
    return fetch(BASE_URL + 'user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(userInfo)
    })
}
