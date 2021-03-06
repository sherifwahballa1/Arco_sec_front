// pragma solidity ^0.7.0;

pragma solidity >=0.5.0 <0.8.0;
// pragma experimental ABIEncoderV2;


contract MailTransfer {

    mapping (string => mailStruct) private _idToMail;
    struct mailStruct {
        string hashIPFS;
        address [] receiverAddresses;
    }

    event MailAdded(string randomNumber);

    // function addMail(string memory hashIPFS, string memory mailId,
    //                 address receiverAddresses, string memory randomNumber)
    //                 public {
    //     require(bytes(_idToMail[mailId].hashIPFS).length == 0, "duplicate mail id");
    //     mailStruct storage mail = _idToMail[mailId];
    //     mail.hashIPFS = hashIPFS;
    //     // mail.receiverAddresses = receiverAddresses;
    //     mail.receiverAddresses.push(receiverAddresses);
    //     mail.receiverAddresses.push(msg.sender);
    //     emit MailAdded(randomNumber);
    // }
    function addMail(string memory hashIPFS, string memory mailId,string memory randomNumber) public {
        require(bytes(_idToMail[mailId].hashIPFS).length == 0, "duplicate mail id");
        mailStruct storage mail = _idToMail[mailId];
        mail.hashIPFS = hashIPFS;
        // mail.receiverAddresses = receiverAddresses;
        // mail.receiverAddresses.push(receiverAddresses);
        // mail.receiverAddresses.push(msg.sender);
        emit MailAdded(randomNumber);
    }

    function getHash(string memory mailId) public view returns (string memory){
        require(bytes(_idToMail[mailId].hashIPFS).length != 0, "this mail does not exist, please check again");
        // bool canReceive = false;
        // for (uint i = 0; i < _idToMail[mailId].receiverAddresses.length; i++) {
        //     if(_idToMail[mailId].receiverAddresses[i] == msg.sender) {
        //         canReceive = true;
        //     }
        // }
        // require(canReceive, "caller not allowed to receive this mail");
        return _idToMail[mailId].hashIPFS;
    }
}