pragma solidity >=0.4.22 <0.8.0;


contract MailTransfer {

mapping (address => uint) balances;

    constructor() public {
		balances[tx.origin] = 10000;
	}


    mapping (string => mailStruct) private _idToMail;
    
    struct mailStruct {
        string hashIPFS;
        address[] receiverAddresses;
    }

    event MailAdded(string randomNumber);

    function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}

    function addMail(string memory hashIPFS, string memory mailId,address[] memory receiverAddresses, string memory randomNumber)public {
        require(bytes(_idToMail[mailId].hashIPFS).length == 0, "duplicate mail id");
        require(receiverAddresses.length > 0, "receiverAddresses not allowed to be empty");
        mailStruct storage mail = _idToMail[mailId];
        mail.hashIPFS = hashIPFS;
        mail.receiverAddresses = receiverAddresses;
        mail.receiverAddresses.push(address(msg.sender));
        emit MailAdded(randomNumber);
    }

    function getHash(string memory mailId) public view returns (string memory){
        require(bytes(_idToMail[mailId].hashIPFS).length != 0, "this mail does not exist, please check again");
        bool canReceive = false;
        for (uint i = 0; i < _idToMail[mailId].receiverAddresses.length; i++) {
            if(_idToMail[mailId].receiverAddresses[i] == msg.sender) {
                canReceive = true;
            }
        }
        require(canReceive, "caller not allowed to receive this mail");
        return _idToMail[mailId].hashIPFS;
    }
}