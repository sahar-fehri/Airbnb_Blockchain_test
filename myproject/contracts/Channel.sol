pragma solidity ^0.4.17;

contract Channel {

	address public channelSender;
	uint public startDate;
	uint public value;
	uint public maxcalls =0;
	uint public timeout;
	uint public max;
	
	enum House { available , rented, reserved }
	House stateHouse;
	enum existsNot { donotexist, pending , allowed }
	
	mapping(address => existsNot) public allowance;   // Who is allowed to access house
	mapping (bytes32 => address) public signatures;
	
	event show_hash(bytes32);
	event exceeded_max_allowed(string);
	event show_stateHouse(string);


	
	function Channel(uint _value, uint _timeout, uint _max)public {
	    value = _value;
	    timeout = _timeout;
	    max = _max;
	    startDate = now;
	    channelSender = msg.sender;
	    
	}
	
	
	function reserve(address _ad,bytes32 _hash ) public {
	   
	  
	        allowance[_ad] = existsNot.pending;
	        //show_hash(_hash);
	        stateHouse = House.reserved;
	      //  show_stateHouse("stateHouse is reserved");
	}
	
    	
    function open_channel(bytes32 hash, uint8 v , bytes32 r , bytes32 s , uint _value) payable {
      uint somme;
      if(maxcalls<max){
          
         // somme += msg.value;
             // verify if the one who called the function is someone in the mapping and has put the exact value he said he would put
        if((allowance[msg.sender] == existsNot.pending) && (_value == msg.value) && (verify(hash,v,r,s)==msg.sender)){
                allowance[msg.sender] == existsNot.allowed; // grant access
                maxcalls ++;
                somme = this.balance + _value;
                 if (maxcalls == max){
                     if( somme == value){
                           stateHouse = House.rented;}
                           else{
                               // value not met 
                               maxcalls--;
                           }
              
                 }
                
             }
             
      }
      
     
    }
    
    
    
        function is_allowed()public returns(bool) {
            if(stateHouse == House.rented){
                if(allowance[msg.sender] == existsNot.allowed){
                    return true;
                }
                else{
                    return false;
                }
            
            }else{
                show_stateHouse("this house is not rented");
            }
            
        }


	
	function CloseChannel(bytes32 h, uint8 v, bytes32 r, bytes32 s, uint value){

        address signer;
        bytes32 proof;
        
        // get signer from signature
        signer = verify(h, v, r, s);
        
        // signature is invalid, throw
        if (allowance[signer] !=  existsNot.allowed && signer != channelSender) throw;
        
        proof = sha3(this, value);
        
        // signature is valid but doesn't match the data provided
        if (proof != h) throw;
        
        if (signatures[proof] == 0)
            signatures[proof] = signer;
        else if (signatures[proof] != signer){
        // channel completed, both signatures provided
            if (!channelSender.send(value)) throw;
        
        }

}

	function ChannelTimeout(){
		if (startDate + timeout > now)
			throw;

		selfdestruct(channelSender);
	}
	


	function verify(bytes32 hash, uint8 v, bytes32 r, bytes32 s)  constant returns(address) {

        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(prefix, hash);
        return ecrecover(prefixedHash, v, r, s);
    }

}