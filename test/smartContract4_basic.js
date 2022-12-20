const Conditionals = artifacts.require("conditionals");

contract("conditionals contract",()=>{

    let conditionals = null;
    before(async()=>{
    conditionals=await Conditionals.deployed();
    });

    it("Should verify if a is greater than b : positive scenario",async()=>{
        try{
        const result = await conditionals.check(10,9);
        assert(result.toNumber()===10);
        }

        catch{
            assert(false,"a should be greater than b");
        }
    });

    it("Should verify if a is greater than b : negative scenario",async()=>{
        try{
        const result = await conditionals.check(6,50);
        assert(result.toNumber()===6);
        }

        catch(e){
            assert(false,"a should be greater than b");
        }
    });

});