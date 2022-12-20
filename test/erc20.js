const {expectRevert,expectEvent} = require('@openzeppelin/test-helpers');
const Token = artifacts.require("Block"); //name of the contract in the erc20.sol

contract("erc20",(accounts)=>{

let token =null;
const initialBalance = web3.utils.toBN(web3.utils.toWei("1")); //converting to wei and BN for assertion below

beforeEach(async()=>{
    token = await Token.new("Block","BLK",18,initialBalance);
});

it("Should return the exact total supply",async()=>{
    const totalSupply = await token.totalSupply(); //returned as BN object
    assert(totalSupply.eq(initialBalance));
});

//how accounts[0] is taken as the founder ??
it("Should return the correct balance",async()=>{
   const balance = await token.balanceOf(accounts[0]);
   assert(balance.eq(initialBalance));
});

it("Should transfer the tokens",async()=>{
   //all calculations happen as BN objects
   const value = web3.utils.toBN(100);
   const receipt = await token.transfer(accounts[1],value);//how can we pass BN object as parameter ?
   const Balance = await token.balanceOf(accounts[0]);//returns BN object
   assert(Balance.eq(initialBalance.sub(value)));
   expectEvent(receipt,"Transfer",{from : accounts[0],to: accounts[1],tokens: value});
});

it("Should not transfer if balance is low",async()=>{
   await expectRevert(token.transfer(accounts[1],web3.utils.toWei("10")),"Insufficient balance");//owner has 1 ether [initialized above];but we are sending 10 ethers
});

it("Should validate approval of tokens and transferFrom function",async()=>{
   let allowance;
   let receipt;

   allowance = await token.allowance(accounts[0],accounts[1]);
   assert(allowance.isZero()); //allowance will be zero before approve

   //accounts[1] can spend/transfer upto 100 tokens from accounts[0] to any other account;this approval is given by accounts[0] to accounts[1]
   const value = web3.utils.toBN(100)
   receipt = await token.approve(accounts[1],value); //accounts[0] has approved accounts[1] to spend 100 from its account
   allowance = await token.allowance(accounts[0],accounts[1]);
   assert(allowance.eq(value)); //allowance to be equal to approved value

   expectEvent(receipt,"Approval",{
      tokenOwner: accounts[0],
      spender : accounts[1],
      tokens : value
   });


   receipt = await token.transferFrom(accounts[0], accounts[2], value, {from : accounts[1]}); //accounts[1] spent all of the allowance alloted by account[0]
   allowance = await token.allowance(accounts[0],accounts[1]);
   console.log("Allowance is "+allowance)

   const balance1 = await token.balanceOf(accounts[0]);
   const balance2 = await token.balanceOf(accounts[2]);
   assert(balance1.eq(initialBalance.sub(value)));
   assert(balance2.eq(value));
  
});

it("Should not allow transferFrom without approval",async()=>{
  await expectRevert(token.transferFrom(accounts[0] , accounts[2] , 100 , { from : accounts[1]}),"Allowance too low");
});


});
