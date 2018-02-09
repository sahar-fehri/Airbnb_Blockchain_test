pragma solidity ^0.4.17;

contract Channel {

	address public channelSender;
	address public channelRecipient;
	uint public startDate;
	uint public channelTimeout;
	mapping (bytes32 => address) signatures;

	function Channel(address to, uint timeout) payable {
		channelRecipient = to;
		channelSender = msg.sender;
		startDate = now;
		channelTimeout = timeout;
	}

	function CloseChannel(bytes32 h, uint8 v, bytes32 r, bytes32 s, uint value){

		address signer;
		bytes32 proof;

		// get signer from signature
		signer = ecrecover(h, v, r, s);

		// signature is invalid, throw
		if (signer != channelSender && signer != channelRecipient) throw;

		proof = sha3(this, value);

		// signature is valid but doesn't match the data provided
		if (proof != h) throw;

		if (signatures[proof] == 0)
			signatures[proof] = signer;
		else if (signatures[proof] != signer){
			// channel completed, both signatures provided
			if (!channelRecipient.send(value)) throw;
			selfdestruct(channelSender);
		}

	}

	function ChannelTimeout(){
		if (startDate + channelTimeout > now)
			throw;

		selfdestruct(channelSender);
	}
	
	
	function testRecovery(bytes32 h, uint8 v, bytes32 r, bytes32 s) returns (address) {
       /* prefix might be needed for geth only
        * https://github.com/ethereum/go-ethereum/issues/3731
        */
        // bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        // h = sha3(prefix, h);
        address addr = ecrecover(h, v, r, s);

        return addr;
    }
	
	
	function ecrecover1(bytes32 msgHash, uint8 v, bytes32 r, bytes32 s) constant returns(address) {
      bytes memory prefix = "\x19Ethereum Signed Message:\n32";
      bytes32 prefixedHash = keccak256(prefix, msgHash);
      return ecrecover(prefixedHash, v, r, s);
  }
	
	function verify(bytes32 hash, uint8 v, bytes32 r, bytes32 s) constant returns(bool) {

        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(prefix, hash);
        return ecrecover(prefixedHash, v, r, s) == (msg.sender);
    }

}