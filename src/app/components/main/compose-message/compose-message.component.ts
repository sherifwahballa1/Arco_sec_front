import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ArcosecService } from '../../../core/services/arcosec.service';
import { Socket } from 'ngx-socket-io';
import { TokenService } from '../../../core/authentication/token.service';
import { IpfsService } from '../../../core/ipfs/ipfs.service';
import { IpfsDaemonServiceService } from '../../../services/ipfs/ipfs-daemon-service.service';
import { MailService } from '../../../core/services/mail.service';
import { Web3Service } from '../../../util/web3.service'
import { LIST_ABI, networks_API } from './mailTransferConfig';


@Component({
  selector: 'app-compose-message',
  templateUrl: './compose-message.component.html',
  styleUrls: ['./compose-message.component.css']
})
export class ComposeMessageComponent implements OnInit {
  sendEmailForm: FormGroup;
  public fileSrc: any;
  isFileExists = false;
  fileName: '';
  isFileNameExists = false;
  allMails: any;
  emailValue: string = '';

  myEmailAddress: string = '';

  @ViewChild('mySelect', { static: true }) mySelect: any;

  constructor(
    private formBuilder: FormBuilder,
    private arcoService: ArcosecService,
    private socket: Socket,
    private tokenService: TokenService,
    public ipfsService: IpfsService,
    public dialogRef: MatDialogRef<ComposeMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private IpfsDaemonServiceService: IpfsDaemonServiceService,
    private MailService: MailService,
    private web3Service: Web3Service
  ) { }

  ngOnInit() {
    this.sendEmailForm = this.initSendEmailForm();
    if (this.tokenService.token) {
      this.arcoService.getProfile().subscribe(data => {
        this.myEmailAddress = data['email'].toString();
      });
    }
  }

  initSendEmailForm() {
    return this.formBuilder.group({
      receipeintEmail: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', []),
      body: new FormControl('', []),
      documentTags: this.formBuilder.array([this.createTag()])
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onFileChange(e) {
    if (e.target.value !== null) {
      if (/\.(jpe?g|png|gif|pdf)$/i.test(e.target.files[0].name) === false) {
        this.isFileNameExists = true;
        this.fileName = e.target.files[0].name;
        this.isFileExists = false;
        this.fileSrc = '';
      } else {
        let reader = new FileReader();
        // this.fileSrc = e.target.files;
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (_event) => {
          this.isFileExists = true;
          this.fileSrc = reader.result;
          this.isFileNameExists = false;
          this.fileName = '';
        }
      }

    }
  }

  searchbyEmail(e) {
    this.arcoService.getEmails(e).subscribe(data => {
      this.mySelect.open();
      this.allMails = data;
    }, err => {
      console.log(err);
    });
  }

  emailSelected(e) {
    this.sendEmailForm.patchValue({
      receipeintEmail: e.value
    });
  }

  get documentTags() {
    const items = this.sendEmailForm.get('documentTags') as FormArray;
    return this.sendEmailForm.get('documentTags') as FormArray;
  };


  addNewTag() {
    this.documentTags.push(this.createTag());
  }

  deleteTag(i) {
    this.documentTags.removeAt(i);
  }

  createTag(): FormGroup {
    return this.formBuilder.group({
      name: '',
      value: ''
    });
  }
  async sendMail() {

    //make loading here 

    if (!this.sendEmailForm.valid) {
      return this.sendEmailForm.markAllAsTouched();

    }

    let ipfsHash;
    if (this.fileSrc) {
      //send ipfs get hash 
      ipfsHash = await this.IpfsDaemonServiceService.addFile(this.fileSrc).toPromise()

    }

    //add mail to inbox and outbox

    // let mailId = await this.MailService.createEmail(this.sendEmailForm.value).toPromise();

    //set in contract 


    let mailTransferApi = await this.web3Service.loadContract(LIST_ABI);
    console.log(mailTransferApi, 'mailTransferApi');

    if (this.fileSrc) {
      let addMail = await mailTransferApi.methods.addMail(ipfsHash, '83', ['0xe621E2203D2Ccb87FeF9e40e694E3F5185280362'], '23').send({ from: "0xe621E2203D2Ccb87FeF9e40e694E3F5185280362", gas: 6721975, gasPrice: '30000000' })
      // let addMail = await mailTransferApi.methods.addMail(ipfsHash, '8', ['0xe621E2203D2Ccb87FeF9e40e694E3F5185280362'], '23').call({ from: "0xe621E2203D2Ccb87FeF9e40e694E3F5185280362" })
      // console.log(addMail.events.MailAdded.returnValues.randomNumber, 'addMail');
      console.log(addMail, 'addMail');
    }

    let file = await mailTransferApi.methods.getHash('83').call({ from: "0xe621E2203D2Ccb87FeF9e40e694E3F5185280362" });
    let url = 'https://ipfs.io/ipfs/' + file
    console.log(url);
    // this.IpfsDaemonServiceService.getFile(file).subscribe(data => {

    //   console.log(data, 'fileIpfs');
    // })



    // mailTransferApi.methods.addMail(ipfsHash, mailId,, '23').send({ from: this.account }).once('receipt', (receipt) => {
    //   console.log(receipt, 'receipt');
    //   this.createForm.reset();
    //   this.listOfTasks();
    // })


    //listen to event

    //fire socket

    // this.socket.emit('mailRequest', { sender: this.myEmailAddress, receiver: this.sendEmailForm.get('receipeintEmail').value });
  }

}
