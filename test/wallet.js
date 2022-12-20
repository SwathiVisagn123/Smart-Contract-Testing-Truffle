const Wallet = artifacts.require("Wallet");

contract("Wallet Contract",(accounts)=>{

    // creating instance of the contract
    let wallet = null;
    before(async()=>{
    wallet = await Wallet.deployed();
    });

    //validating constructor function
    it("Should set the owner of the contract as accounts[0] from Ganache",async()=>{
      
    //calling default getter function for owner variable
     const address = await wallet.owner();

     //assert owner of contract is same as accounts[0] from ganache, as we have passed this as constructor parameter in miration file
     assert(address===accounts[0]);
    });

    it("Should deposit the balance to contract address",async()=>{

       //template to call a payable function using web3.js library in truffle; should always have parameter from and value 
       //100 ethers deposited from owner of contract
       await wallet.deposit({from:accounts[0],value:100});

       //check contract balance using web3 library->eth module->getBalance() function; balance returned in string
       //wallet.address is <contract_name>.address
       const amount = await web3.eth.getBalance(wallet.address);

       //converting string to integer and assert
       assert(parseInt(amount)==100);

    });

    it("Should return the balance of contract address",async()=>{
        
        //calling balanceOf to get contract balance
        const balance =await wallet.balanceOf();
        //getting contract balance using web3.js function
        const amount = await web3.eth.getBalance(wallet.address);
        //asserting
        assert(parseInt(balance)==parseInt(amount));
    })
});