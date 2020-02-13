export const fbAction = (fbData) => {
    return {
        type: 'FB_DATA',
        payload: fbData
    }
}

export const twitAction = (twitData) => {
    return {
        type: 'TWIT_DATA',
        payload: twitData
    }
}