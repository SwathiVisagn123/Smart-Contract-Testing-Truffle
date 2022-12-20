const HelloTesting = artifacts.require("helloTesting"); 

contract("hello Testing",()=>{

   it("should check the print function",async()=>{

const helloTesting = await HelloTesting.deployed(); //Creating an instance of the contract

const result = await helloTesting.print();

assert(result == "Hello Testing");

   });
});