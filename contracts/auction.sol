// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Auction {
    address public manager;
    address public seller;
    uint256 public latestBid;
    address payable public latestBidder;

    constructor() {
        manager = msg.sender;
    }

    function auction(uint256 bid) public {
        latestBid = bid * 1 ether;
        seller = msg.sender;
    }

    function bidFunc() public payable {
        require(msg.value > latestBid);

        if (latestBidder != address(0)) {
            latestBidder.transfer(latestBid);
        }
        latestBidder = payable(msg.sender);
        latestBid = msg.value;
    }

    function finishAuction() public restricted {
        payable(seller).transfer(address(this).balance);
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}
