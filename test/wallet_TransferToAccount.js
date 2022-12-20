const SendTo = artifacts.require("sendTo");

contract("Transfer Contract", (accounts)=>{

let sendTo = null;

before(async()=>{

sendTo = await SendTo.deployed();

});

it("Should check the transfer", async()=>{

    const before = await web3.eth.getBalance( accounts[1] );

    await sendTo.transfer( accounts[1], 15 , { from: accounts[0], value : 80} );

    const after = await web3.eth.getBalance( accounts[1] );

    const _before = web3.utils.toBN(before);

    const _after = web3.utils.toBN(after);

    assert(_after.sub(_before).toNumber() == 15 );

});

it("Should verify if only owner can transfer : negative scenario", async()=>{
   
    try {
        await sendTo.transfer( accounts[1] , 15 , {from : accounts[2], value : 80} );
    }

    catch(e) {
        assert(false,"Only Owner can Transfer");
    }

});

});