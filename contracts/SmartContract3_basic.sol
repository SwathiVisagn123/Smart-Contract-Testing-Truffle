// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract dynamicArray {

uint256[] public array; //dynamic array, a default getter method for array is created by solidity as it's declared public

function insertByMultiplication(uint256 id, uint256 item) public {
    array.push(id * item);
}

function length() public view returns(uint256){
    return array.length;
}

function getItemById(uint256 id) public view returns (uint256 item) {
    return array[id];
}

function getAll() public view returns(uint256[] memory){
    return array;
}

}