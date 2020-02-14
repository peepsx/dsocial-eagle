const url = process.env.REACT_APP_API_URL;

export const API = {
    facebook_detail         : url+'/facebook/facebook_detail',
    google_detai            : url+'/google/google-detail',
    twitter_detail          : url+'/twitter/twitter-details',
    instagram_detail        : url+'/instagram/instagram-details',
    user_share_validation   : url+'/validation/share-social-status',
    arisen_user_detail      : url+'/users/users-details'
}