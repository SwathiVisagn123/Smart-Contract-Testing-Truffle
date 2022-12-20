const TransferArray = artifacts.require("TransferArray");

contract("Transfer Array Contract",(accounts)=>{
let transferArray = null;

before(async()=>{
    transferArray = await TransferArray.deployed();
});

it("Should check if transfer works correctly",async()=>{

const recipients = [ accounts[1], accounts[2], accounts[3] ];
const amounts = [ 10, 20, 30 ];


const beforeTransfer = await Promise.all(
recipients.map((recipients)=>{
    return web3.eth.getBalance(recipients);
})
);

console.log(beforeTransfer);

await transferArray.send(recipients,amounts,{from : accounts[0], value : 90});

const afterTransfer = await Promise.all(
recipients.map((recipients)=>{
    return web3.eth.getBalance(recipients);
})
);

console.log(afterTransfer);

recipients.forEach((item,i)=>{
    const _before = web3.utils.toBN(beforeTransfer[i]);
    const _after = web3.utils.toBN(afterTransfer[i]);
    assert( _after.sub(_before).toNumber() == amounts[i]);
});
});

it("should not allow transfer if array lengths not equal", async()=>{
    const recipients = [ accounts[1], accounts[2], accounts[3] ];
    const amounts1 = [ 10, 20 ];
  try{
    await transferArray.send(recipients,amounts1,{from : accounts[0], value : 90});
  }

  catch(error){
    assert(error.message.includes("length of recipients and amount must be same"));
    return;
  };

  assert(false);

});

});