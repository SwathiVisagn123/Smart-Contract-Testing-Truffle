// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract setGet {
    string public item;

    function set(string memory _item) public {
        item=_item;
    }
    function get() public view returns (string memory) {
        return item;
    }

}