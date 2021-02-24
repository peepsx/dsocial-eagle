const status = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://signup.dsocial.network/'
export const env = {
    liveStatus                      : status,
    API_URL                         : process.env.REACT_APP_API_URL,
    SERVER_LESS                     : process.env.SERVER_LESS
}
