// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.9.0;

contract Loan {

address payable public borrower;
address payable public lender;
uint256 amount;
uint256 interest;
uint256 duration;
uint256 end;

constructor(address payable _borrower,address payable _lender,uint256 _amount,uint256 _interest,uint256 _duration){
borrower = _borrower;
lender = _lender;
amount = _amount;
interest = _interest;
duration = _duration;
}

enum State { PENDING , ACTIVE , CLOSED}
State public state = State.PENDING;

function lend() public payable {

require(msg.sender == lender , "Only authorized lender can lend");
require(msg.value == amount , "Lender should lend exact amount");
changeState(State.ACTIVE);
borrower.transfer(amount);


}

function payBack() public payable {

require(msg.sender == borrower , "Only authorized borrower can pay back");
require(msg.value == amount + interest , "should pay back with interest");
changeState(State.CLOSED);
lender.transfer(amount + interest);


}

function changeState(State to) internal {

require(to != state , "Cannot change to same state");
require(to != State.PENDING , "Cannot revert to PENDING state");

if(to == State.ACTIVE)
{
   require (state == State.PENDING , "State must be in Pending to change to Active");
   state = State.ACTIVE;
   end = block.timestamp + duration;
}
if(to == State.CLOSED)
{
    require(state == State.ACTIVE, "State must be in Active to change to Closed");
    require(block.timestamp >= end , "Loan not expired yet");
    state = State.CLOSED;
}
}

}


