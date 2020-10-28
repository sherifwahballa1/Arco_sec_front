import { Component, OnInit } from '@angular/core';
import { Buffer } from 'buffer';
import { Web3Service } from '../../util/web3.service';
const ipfsClient = require('ipfs-http-client');
const memeJsonData = require('../../../../build/contracts/Meme.json');

declare let require: any;
declare let window: any;


@Component({
  selector: 'app-meme',
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.css']
})
export class MemeComponent implements OnInit {

  public ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

  public accounts: string[];
  private account: string = null;
  public contract: any;
  private buffer: any;

  memeHash: string;
  cid: any;
  web3: any;

  constructor(private web3Service: Web3Service) {
    // console.log('Constructor: ' + web3Service);
  }

   ngOnInit() {
   }

  // async ngAfterContentInit() {
  //   await this.getFromService();
  // }

  getFromService = async () => {
    this.web3 = await this.web3Service.bootstrapWeb3();
    this.loadBlockchainData();
  }


   loadBlockchainData = async() => {
    this.accounts = await this.web3.eth.getAccounts();
    this.account = this.accounts[0];

    // Get the contract instance.
    let networkId = await this.web3.eth.net.getId();
    networkId = '5777';
    const deployedNetwork = memeJsonData.networks[networkId];
    this.contract = new this.web3.eth.Contract(
      memeJsonData.abi,
      deployedNetwork && deployedNetwork.address,
    );
    console.log(deployedNetwork);

    if (deployedNetwork) {
      this.contract = new this.web3.eth.Contract(memeJsonData.abi, deployedNetwork.address);
      console.log('Here');
      // const memeHash = await this.contract.methods.get().call();
      // console.log('yes');
      // if (memeHash !== null) {
      //   this.memeHash = memeHash;
      // }

    } else {
      window.alert('Smart contract not deployed to detected network.');
    }

  }


  captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    console.log(file);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.buffer = new Buffer(reader.result);
      console.log('buffer', this.buffer);
    }
  }

  onSubmit = async(event) => {
    console.log(this.account);
    event.preventDefault();
    console.log("Submitting file to ipfs...");

    const result = await this.ipfs.add(this.buffer, { recursive: true });
    if (result) {
      console.log('Ipfs result', result);
      this.cid = result.cid;
      console.log(this.account);
      const sendTo = await this.contract.methods.set(result.path).send({ from: this.account });
      console.log(sendTo);
      window.alert("File Uploaded Successfully");
    } else {
      console.log('Error');
    }
  }


}
