pragma solidity ^0.6.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/MailTransfer.sol";

contract TestMailTransfer {

    

  function testInitialBalanceUsingDeployedContract() public {
    MailTransfer mailTransfer = MailTransfer(DeployedAddresses.MailTransfer());

    uint expected = 10000;

    Assert.equal(mailTransfer.getBalance(tx.origin), expected, "Owner should have 10000 Ethrt initially");
  }
}
