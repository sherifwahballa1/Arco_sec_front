// var assert = require('assert');

let MailTransfer = artifacts.require("./MailTransfer.sol");

contract('MailTransfer', function (accounts) {
    let mailTransferInstance;
    let account;
    let balance;
    let hashIPFS = "QmZtmD2qt6fJot32nabSP3CUjicnypEBz7bHVDhPQt9aAy";
    let mailId = '22';
    let receiverAddresses = [accounts[1], accounts[2], accounts[3]];
    let randomNumber = '32';

    describe('addMail', () => {
        beforeEach(async () => {
            mailTransferInstance = await MailTransfer.deployed();
            account = accounts[0];
            balance = await mailTransferInstance.getBalance.call(account);
        })

        it("should Add Mail", async () => {

            let mail = await mailTransferInstance.addMail(hashIPFS, '22', receiverAddresses, randomNumber)
            // console.log(mail);
            assert.equal(randomNumber, mail.logs[0].args.randomNumber, 'email send and set successfullty');
        });

        it("duplicate mail id", async () => {

            try {
                let mail = await mailTransferInstance.addMail(hashIPFS, '35', receiverAddresses, randomNumber);
                mail = await mailTransferInstance.addMail(hashIPFS, '35', receiverAddresses, randomNumber);

            } catch (error) {
                assert.equal(error.reason, 'duplicate mail id');

            }

        });

        it("wrong random number ", async () => {

            let mail = await mailTransferInstance.addMail(hashIPFS, '33', receiverAddresses, randomNumber);
            assert.notEqual('222', mail.logs[0].args.randomNumber)

        });

        it("no receiverAddresses", async () => {

            try {
                let mail = await mailTransferInstance.addMail(hashIPFS, '43', [], randomNumber);
            } catch (error) {
                // console.log(error, 'receiverAddresses');
                assert.equal(error.reason, 'receiverAddresses not allowed to be empty');
            }
        });
    });

    describe('getHash', () => {

        it('getHash should return hash ', async () => {
            let mail = await mailTransferInstance.getHash('22');
            console.log(mail, 'mail');

            assert.equal(hashIPFS, mail)
        });

        it(' should return this mail does not exist, please check again ', async () => {

            try {
                let mail = await mailTransferInstance.getHash('2232');
            } catch (error) {
                // console.log(error);
                assert.equal(error.reason, 'this mail does not exist, please check again');

            }

        });

    });
});


