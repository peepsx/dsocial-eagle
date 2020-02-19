import Axios from "axios"

export const getFbPageToken = (id, userAccessToken) => {
    console.log('access token and id insife page token', id, userAccessToken);
    Axios.get(`https://graph.facebook.com/${id}/accounts?access_token=${userAccessToken}`)
        .then(res => {
            console.log('Page access toke and id ', res);
            if (res.data && res.data.data) {
                getFbPageCount(res.data.data[0].id, res.data.data[0].access_token)
            }
        })
        .catch(err => console.log('Error page', err))
}

export const getFbPageCount = (id, pageAccessToken) => {
    console.log('access token and id insife count', id, pageAccessToken);
    Axios.get(`https://graph.facebook.com/${id}/?fields=fan_count&access_token=${pageAccessToken}`)
        .then(res => console.log('page count', res))
        .catch(err => console.error('page count error', err))
}