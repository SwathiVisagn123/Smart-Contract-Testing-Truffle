const SetGet = artifacts.require("setGet");

contract("SetGet Contract",()=>{
    it("Should validate the item varible value",async()=>{ 

        //create instance of smart contract
const setGet = await SetGet.deployed();

       //pass value through the set function 
await setGet.set("I am a Smart Contract Tester");

      //fetch the value through get function
const item = await setGet.get();

     //assert if the value set and returned are equal
assert(item==="I am a Smart Contract Tester");
    });
});