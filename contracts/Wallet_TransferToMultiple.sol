// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract TransferArray {
    address payable public owner;

    constructor(address payable _owner){
        owner=_owner;
    }

    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }

    function send(address payable[] memory to ,uint256[] memory amount) public payable ownerOnly {
        
    require(to.length == amount.length,"length of recipients and amount must be same");

    for(uint256 i=0;i<to.length;i++){
        to[i].transfer(amount[i]);
    }

    }
}