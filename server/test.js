var telegram = require('telegram-bot-api')
var api = new telegram({
    token: '874385567:AAHXt-cIt3AquJXqM4vUlMnX5_4ebMAZasc'
});

api.getMe()
.then(function(data)
{
console.log('login data',data);
})
.catch(function(err)
{
console.log(err);
});