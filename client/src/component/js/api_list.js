const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' :  process.env.REACT_APP_API_URL;

export const API = {
    ip_check                : url+'/',
    facebook_detail         : url+'/facebook/facebook_detail',
    google_detai            : url+'/google/google-detail',
    twitter_detail          : url+'/twitter/twitter-details',
    instagram_detail        : url+'/instagram/instagram-details',
    user_share_validation   : url+'/validation/share-social-status',
    arisen_user_detail      : url+'/users/users-details',
    telegram_user_detail    : url+'/details/telegram',
    validation_follower     : url+'/validation/follower',
    registerUser            : url+'/users/register',
    passPhrase              : url+'/users/pass/phrase',
    share_with_fb           : url+'/validation//share-facebook-media',
    email_verifier          : url+'/verify/send-email'
}