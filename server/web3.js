let config = require('./config/ether');
const Web3 = require('web3');
if(typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider)
} else {
    web3 = new Web3(new Web3.providers.HttpProvider(config.ETHER_URL));
}

web3.eth.net.isListening()
            .then(connect => {
                if(!connect)
                    console.log('-------- Web3 Connection Failed ---------');
                else {
                    web3.eth.net.getId()
                        .then( id => {
                            web3.eth.getBlockNumber( (err, block) => {
                                if(err)
                                    console.log('ERROR WHILE REQUEST FOR NEW BLOCKS', err);
                                else
                                    console.log(`Latest Geth Block ': ${block} ' Network Id ': ${id}`);
                            })
                        })
                        .catch(e => console.log("ERROR IN GETTING ID", e))
                }
            })
            .catch(e => console.log("ERROR WHILE CONNECTED TO ETH NETWORK"));

module.exports = {
    web3
}