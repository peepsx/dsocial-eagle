const status = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://air.arisen.network'
export const env = {
    liveStatus                      : status,
    twitter_consumer_key            : process.env.REACT_APP_TWITTER_CONSUMER_KEY,
    twitter_consumer_secret_key     : process.env.REACT_APP_TWITTER_CONSUMER_SECRET_KEY,
    instagram_client_id             : process.env.REACT_APP_INSTAGRAM_CLIENT_ID,
    instagram_client_secret_id      : process.env.REACT_APP_INSTAGRAM_CLIENT_SECRET_ID,
    google_client_id                : process.env.REACT_APP_GOOGLE_CLIENT_ID,
    youtube_channel_id              : process.env.REACT_APP_YOUTUBE_CHANNEL_ID,
    callback_url                    : process.env.REACT_APP_CALLBACK_URL,
    telegram_bot_hash               : process.env.REACT_APP_TELEGRAM_BOT_HASH,
    telegram_chat_id                : -1001334359449,
    facebook_client_id              : process.env.REACT_APP_FACEBOOK_CLIENT_ID,
    API_URL                         : process.env.REACT_APP_API_URL,
    google_site_url                 : process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_URL
}
