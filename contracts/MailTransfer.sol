pragma solidity >=0.4.22 <=0.7.0;


contract MailTransfer {

    struct mailStruct {
        string hashIPFS;
        address[] receiverAddresses;
    }

    mapping (string => mailStruct) private _idToMail;
    event MailAdded(string randomNumber);

    function addMail(string memory hashIPFS, string memory mailId,
                    address[] memory receiverAddresses, string memory randomNumber)
                    public {
        mailStruct storage mail = _idToMail[mailId];
        mail.hashIPFS = hashIPFS;
        mail.receiverAddresses = receiverAddresses;
        emit MailAdded(randomNumber);
    }

    function getHash(string memory mailId) public view returns (string memory){
        bool canReceive = false;
        for (uint i = 0; i < _idToMail[mailId].receiverAddresses.length; i++) {
            if(_idToMail[mailId].receiverAddresses[i] == msg.sender) {
                canReceive = true;
            }
        }
        require(canReceive);
        return _idToMail[mailId].hashIPFS;
    }
}