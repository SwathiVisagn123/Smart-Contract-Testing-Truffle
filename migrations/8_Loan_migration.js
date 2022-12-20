const loan = artifacts.require("Loan");

module.exports= function(deployer,_network,accounts){
    deployer.deploy(loan,accounts[1],accounts[0],1000,100,100);
}