// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

//refer to https://docs.openzeppelin.com/contracts/2.x/api/token/erc20

interface ERC20Interface{
    //returns total number of tokens in existence
    function totalSupply() external view returns (uint);

    //returns amount of tokens owned by account
    function balanceOf(address tokenOwner) external view returns (uint balance);

    //moves amount of tokens from caller's account to the 'to' address (recipient)
    function transfer(address to, uint tokens) external returns (bool success);

    //returns amount of tokens spender is allowed to spend on behalf of owner; this is zero by default; changes when approve and transferFrom is called
    function allowance(address tokenOwner, address spender) external view returns (uint remaining) ;

    //sets the amount of tokens as the allowance of spender over caller's tokens;emits approval event
    function approve(address spender, uint tokens) external returns (bool success);

    //transferFrom uses allowance mechanism, this will move tokens 'from' to 'to' and deducts token from allowance
    //moves the amount of tokens 'from' sender 'to' recipent and amount is deducted from the caller's allowance set for spender;Emits a transfer event
    function transferFrom(address from, address to, uint tokens) external returns (bool success);

    //events
    event Transfer(address indexed from,address indexed to,uint tokens); //will be emitted by transferFrom
    event Approval(address indexed tokenOwner,address indexed spender,uint tokens); //will be emitted by Approve
}

contract Block is ERC20Interface {

    //declaring state variables
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public _totalSupply;
    mapping(address=>uint) public balances;
    mapping(address=>mapping(address=>uint)) allowed; //nested mapping for approval: address 1 allows address A to spend n tokens
    

   //intialise 
    constructor(string memory _name,string memory _symbol,uint8 _decimals, uint256 initialSupply){
        name = _name;
        symbol = _symbol;
        _totalSupply = initialSupply;
        balances[msg.sender]=_totalSupply;
        decimals=_decimals;
    }

    function balanceOf(address tokenOwner) public view override returns (uint tokens){
        return balances[tokenOwner];
    }

    //founder to tokenOwner(as founder is only person who has total supply)
    function transfer(address to,uint tokens) public override returns (bool success){

        require(balances[msg.sender]>=tokens,"Insufficient balance");
        balances[to]+=tokens; //balances[to]=balances[to]+tokens;
        balances[msg.sender]-=tokens; //balances[msg.sender]=balances[msg.sender]-tokens;
        emit Transfer(msg.sender,to,tokens);
        return true;
    }

    // tokenOwner approves certain tokens to spender over tokenOwner's tokens. tokenOwner is caller from this function.
    function approve(address spender,uint tokens) public override returns(bool success){
        require(tokens>0);
        require(balances[msg.sender]>=tokens,"Insufficient balance");
        allowed[msg.sender][spender]=tokens;
        emit Approval(msg.sender,spender,tokens);
        return true; 
    }

    //returns token allowance from nested mapping
    function allowance(address tokenOwner,address spender) public view override returns(uint noOftokens){
        return allowed[tokenOwner][spender];
    }

    //transfer tokens from tokenOwner to spender and the tokens must be <=approved tokens
    function transferFrom(address from,address to,uint tokens) public override returns(bool success){
        require(allowed[from][msg.sender]>=tokens,"Allowance too low"); //checks allowance between from and msg.sender is >=tokens
        require(balances[from]>=tokens,"Insufficient Balance");
        balances[to]+=tokens; 
        balances[from]-=tokens; 
        return true;
    }

    function totalSupply() public view override returns(uint256){
     return _totalSupply;
    }

}

//TOKEN CREATION

//Connect metamask to testnet, address on metamask will show on the Account of Remix
//Deploy the contract on testnet, confirm transaction on metamask, can see the transaction on etherscan now
//Once transaction is success;copy the contract address;Goto Metamask=>assets=>import tokens=>paste token contract address
//Enter token decimal and import custom token
//The address of founder on metamask now will get the total supply of 100000
//Now we can transfer these tokens to another address using transfer function which we can see on Metamask UI