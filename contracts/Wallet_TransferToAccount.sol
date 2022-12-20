// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract sendTo {

address payable public owner;

constructor(address payable _owner){
  owner=_owner;
}

function transfer(address payable to , uint256 amount ) public payable {

require(msg.sender == owner, "Only Owner can do the transfer");

to.transfer(amount);

}

}