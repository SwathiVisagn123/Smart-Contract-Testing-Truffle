const DynamicArray = artifacts.require("dynamicArray");

contract("Dynamic Array Contract", () => {
 let dynamicArray = null;

    before(async()=>{
        dynamicArray = await DynamicArray.deployed();
    })

    it("Should insert an item into array successfully", async()=>{
        

       await dynamicArray.insertByMultiplication(3,50);
       const item = await dynamicArray.array(0);
       assert(item.toNumber()===(3*50));

    });

    it("Should return the length of the array successfuly", async()=>{

        await dynamicArray.insertByMultiplication(4,50);
        const length = await dynamicArray.length();
        assert(length.toNumber()===2);
    });

    it("Should retrieve the value from array id successfully", async()=>{
  

        const item = await dynamicArray.getItemById(0);
        assert(item.toNumber()===(3*50));

    });

    it("Should assert the entire array of elements", async()=>{
        
        const arr = await dynamicArray.getAll();
        const elements=arr.map((elements)=>elements.toNumber());
        assert.deepEqual(elements,[150,200]);

    });
});