const { expectRevert, time } = require('@openzeppelin/test-helpers') ;
const Loan = artifacts.require("Loan");

contract("Loan", (accounts) => { 
    let loan; 
    const amount = 1000; 
    const interest = 100; 
    const duration = 100;

const [borrower, lender] = [accounts[1], accounts[0]]; 

before(async()=>{
    loan = await Loan.deployed();
});

it("Should not allow unauthorised lender to lend", async ()=>{

   await expectRevert( loan.lend({ from: borrower , value : amount}) , "Only authorized lender can lend" );

});

it("Should allow exact amount to be lent", async()=>{

    await expectRevert( loan.lend( {from: lender , value : amount-10}),"Lender should lend exact amount");

});

it("Should successfully lend the amount", async()=>{

    const before = web3.utils.toBN(await web3.eth.getBalance(borrower));

    await loan.lend( { from:lender, value: amount} );

    const after = web3.utils.toBN(await web3.eth.getBalance(borrower));

    assert(after.sub(before).toNumber() == amount);
});

it("Should payback only by borrower", async()=>{

await expectRevert(loan.payBack( { from: lender , value: amount+interest}),"Only authorized borrower can pay back" );

});

it("Should payback only the exact amount" , async()=>{

    await expectRevert(loan.payBack( {from: borrower , value : amount}), "should pay back with interest");

});

it("Should not reimburse if loan is not matured" , async()=>{

    await expectRevert(loan.payBack( {from : borrower, value : amount+interest}),"Loan not expired yet"); //duration:100; end time: timestamp + 100 ; still too long time left to mature

});

it("Should reimburse succesfully" , async()=>{

    time.increase(duration+10); //timestamp + duration + 10 ; which means making block time to cross the end time
    
    const before = web3.utils.toBN(await web3.eth.getBalance(lender));
    await loan.payBack( {from: borrower, value :amount+interest}); //payback will happen
    const after = web3.utils.toBN(await web3.eth.getBalance(lender));
    const state = await loan.state(); 
    assert(state.toNumber() === 2);
    assert(after.sub(before).toNumber() === amount + interest);

});

});