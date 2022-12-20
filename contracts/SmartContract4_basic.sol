// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract conditionals {

//a simple function that checks a>b, if true returns c ,else returns "a should be greater than b".

    function check(uint a, uint b) public pure returns (uint){
        uint c;
        require(a>b,"a should be greater than b");
        c=a;
        return c;
    }
}