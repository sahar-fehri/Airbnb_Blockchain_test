var Channel = artifacts.require("Channel");

var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

contract('Channel', function(accounts) {



    it("should deploy the contract and return the instance", function() {
        return Channel.deployed().then(function(instance) {
            mychannel = instance
            return mychannel;
        }).then(function(_c) {
            console.log("the contract address is :", mychannel.address);

        }).then(function () {
            return mychannel.channelSender.call();
        }).then(function (_channelS) {
            console.log("channel Sender is ", _channelS)
        }).then(function () {
            return mychannel.channelRecipient.call();
        }).then(function (_channelR) {
            console.log("Channel Receipt:", _channelR)
        })
    });


    it('ecrecover result matches address', async function() {

        var address = accounts[0];
        var instance = await Channel.deployed()
        var msg = '0x8CbaC5e4d803bE2A3A5cd3DbE7174504c6DD0c1C'

        var h = web3.sha3(msg)
        var sig = web3.eth.sign(address, h)
       // var r = `0x${sig.slice(0, 64)}`
       // var s = `0x${sig.slice(64, 128)}`
       //  var v = web3.toDecimal(sig.slice(128, 130)) + 27
        var r = sig.slice(0, 66)
        var s = '0x' + sig.slice(66, 130)
        var k =  sig.slice(130, 132)
        var v = web3.toDecimal(k)+27
        console.log("this is acc de 0 :", address)
        //var result = await instance.testRecovery.call(h, v, r, s)
        var result = web3.eth.personal.ecRecover(h, sig )
        assert.equal(result, address)
    });

    // it("ecrecover1: Signed messages should return signing address",  function(acc) {
    //
    //     const message = web3.sha3('Message to sign here.')
    //     const unlockedAccount = accounts[0]
    //     const signature = web3.eth.sign(unlockedAccount, message)
    //
    //     r = signature.substr(0, 66)
    //     s = '0x' + signature.substr(66, 64)
    //     v = '0x' + signature.substr(130, 2)
    //
    //     const recoveredAddress =  mychannel.ecrecover1(message, v, r, s)
    //    // recoveredAddress.assert.equal(unlockedAccount,'The recovered address should match the signing address')
    //     assert.equal(recoveredAddress, unlockedAccount, "The recovered address should match the signing address");
    // })


});