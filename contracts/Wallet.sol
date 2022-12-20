// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract Wallet {
    //getter function is created by default for owner declared as public state varibale
    address payable public owner;

    //the owner address has to be passed as parameter before contract is deployed
    constructor(address payable _owner){
    owner=_owner;
    }

    //payable functions can accept ether payments to contract address
    function deposit() payable public {}

    //checks balanceof the contract
    function balanceOf() public view returns(uint) {
        return address(this).balance;
    }


}