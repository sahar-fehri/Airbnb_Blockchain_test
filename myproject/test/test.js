var Channel = artifacts.require("Channel");

//var Web3 = require('web3')
//var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))


contract('Channel', function (accounts) {


    it("should deploy the contract and return the instance", function () {
        return Channel.new(2, 8, 2, {from: accounts[0]}).then(function (instance) {
            mychannel = instance
            return mychannel;
        }).then(function (result) {
            var value =  mychannel.value.call();
             var max = mychannel.max.call();
            return value

        }).then(function (value) {
            console.log(value)
            return mychannel.timeout.call();
        }).then(function(res){
            console.log(res)
            return mychannel.max.call()
        }).then(function (x) {
            console.log(x)
        }).then(function(){
            var addressA = accounts[1];
            var addressB = accounts[2];

            var myhash= web3.sha3(addressA,mychannel.address)
            return mychannel.reserve(addressA, myhash, {from:accounts[0]
            }).then(function () {
                    var sig = web3.eth.sign(addressA, myhash)


                    var r = sig.slice(0, 66)
                    var s = '0x' + sig.slice(66, 130)
                    var k =  sig.slice(130, 132)
                    var v = web3.toDecimal(k)+27
                console.log(addressA)
                    console.log(myhash)
                console.log(v)
                console.log(r)
                console.log(s)
                    console.log(web3.fromWei(web3.eth.getBalance(accounts[1]),'ether'))

                    var _value= 1;

                    //
                // return mychannel.open_channel(myhash,v,r,s,_value, {from: addressA, value : web3.fromWei(_value,'ether')})

            })
        })


    })

    // it("should deploy the contract and return the instance", function() {
    //     return Channel.deployed().then(function(instance) {
    //         mychannel = instance
    //         return mychannel;
    //     }).then(function(_c) {
    //         console.log("the contract address is :",  mychannel.address);
    //
    //     }).then(function () {
    //         return mychannel.channelSender.call();
    //     }).then(function (_channelS) {
    //         console.log("channel Sender is ", _channelS)
    //
    //     })
    // });


    // it('ecrecover result matches address', async function() {
    //
    //     var address = accounts[0];
    //     var instance = await Channel.deployed()
    //     var msg = '0x8CbaC5e4d803bE2A3A5cd3DbE7174504c6DD0c1C'
    //
    //     var h = web3.sha3(msg)
    //
    //     console.log("haaash", h)
    //     var sig = web3.eth.sign(address, h)
    //     // var r = `0x${sig.slice(0, 64)}`
    //     // var s = `0x${sig.slice(64, 128)}`
    //     //  var v = web3.toDecimal(sig.slice(128, 130)) + 27
    //     var r = sig.slice(0, 66)
    //     var s = '0x' + sig.slice(66, 130)
    //     var k =  sig.slice(130, 132)
    //     //"0x000A727D63644eF1F74f8443162eE32844de3960",5
    //
    //     var v = web3.toDecimal(k)+27
    //     console.log("this is acc de 0 :", address)
    //     // "0xe38d912e5b3f9731997644f985b4d246ce75ec73109c3cbeeaeb2ae437bba44f",28,"0x261e92df80512f5b9c9565c0ad35f0595267aed5433e5dc2cabe752d896eb89f","0x55576ab38952e4a82c88d2d87165f180c95cd9570c5c9217ddc81ab36f73d787"
    //
    //     console.log("------------------r",r)
    //     console.log("------------------s", s)
    //     console.log("-----------------v", v)
    //     var result = await instance.verify.call(h, v, r, s)
    //
    //     console.log(result)
    //     assert.equal(result, address)
    // });

    // it('should reserve house for users A and B', async function() {
    //   var addressA = "0xC4C6328405F00Fa4a93715D2349f76DF0c7E8b79";
    //   var addressB = "0xCCC6328405F00Fa4a93715D2349f76DF0c7E8b79";
    //   var table= [addressA,addressB];
    //   console.log("------------------------------",mychannel.timeout.call())
    //   var myhash= web3.sha3(addressB,addressA);
    //   console.log(table)
    //     return mychannel.reserve(table,myhash, {from: accounts[0]}).then(function (result) {
    //         for (var i = 0; i < result.logs.length; i++) {
    //             var log = result.logs[i];
    //
    //             if (log.event == "show_hash") {
    //                 // We found the event!
    //                 console.log("*********************************",log)
    //                 break;
    //             }
    //         }
    //     })
    //
    // })


});