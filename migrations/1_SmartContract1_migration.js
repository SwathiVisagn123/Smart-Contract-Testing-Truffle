const HelloTesting = artifacts.require("helloTesting");

module.exports = function(deployer){
    deployer.deploy(HelloTesting);
}