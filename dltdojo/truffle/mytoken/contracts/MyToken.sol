pragma solidity ^0.4.10;

import 'zeppelin/contracts/token/MintableToken.sol';

contract MyToken is MintableToken {
    string public name = "My Token";
    string public symbol = "MYT";
    uint public decimals = 0;
    uint public INITIAL_SUPPLY = 21000000;
    // 
	function MyToken() {
		totalSupply = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
	}
}