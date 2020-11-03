import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { networks_API } from '../components/main/compose-message/mailTransferConfig';
declare let require: any;
const Web3 = require('web3');
const contract = require('@truffle/contract');

declare let window: any;

@Injectable(
  {
    providedIn: 'root'
  }
)
export class Web3Service {
  public web3: any;
  private accounts: string[];
  public ready = false;

  public contract: any;
  public memeHash: '';
  public networkId;
  public account;

  public accountsObservable = new Subject<string[]>();

  constructor() {
    this.bootstrapWeb3();
  }

  public async bootstrapWeb3() {
    // if (window.ethereum) {
    //   window.web3 = new Web3(window.ethereum);
    //   await window.ethereum.enable();
    // } else if (window.web3) {
    //   this.web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:8545");
    //   this.networkId = await this.web3.eth.net.getId();
    // } else {
    //   window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    // }
    this.web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:8545");
    const accounts = await this.web3.eth.getAccounts();
    this.account = accounts[0];

    this.networkId = await this.web3.eth.net.getId();
  }

  async loadContract(LIST_ABI) {
    let TODO_LIST_ADDRESS = networks_API[this.networkId].address;
    return await new this.web3.eth.Contract(LIST_ABI, TODO_LIST_ADDRESS);

  }

  async getAccount(numberOfAccount) {
    const accounts = await this.web3.eth.getAccounts();
    this.account = accounts[numberOfAccount];
    return this.account
  }


}
