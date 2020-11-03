import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ComposeMessageComponent } from '../compose-message/compose-message.component';
import { TokenService } from '../../../core/authentication/token.service';
import { ArcosecService } from '../../../core/services/arcosec.service';
import { Socket } from 'ngx-socket-io';
import { ActivatedRoute } from '@angular/router';
import { Web3Service } from '../../../util/web3.service';
import { LIST_ABI } from '../compose-message/mailTransferConfig';

declare let window: any;

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.css']
})
export class ViewMessageComponent implements OnInit {

  myEmailAddress: string = '';
  mailID: string = '';
  mail: any;
  url: string;
  isFile: Boolean = false;
  file: any;

  constructor(
    private tokenService: TokenService,
    private arcoService: ArcosecService,
    private socket: Socket,
    private activeRoute: ActivatedRoute,
    private web3Service: Web3Service
  ) {
    this.mailID = this.activeRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (this.tokenService.token) {
      this.arcoService.getProfile().subscribe(data => {
        this.myEmailAddress = data['email'].toString();
        this.socket.emit('joinRequest', { sender: this.myEmailAddress });
      });
    }

    this.getMailById();
  }

  getMailById() {
    this.arcoService.getMailByID(this.mailID).subscribe(data => {
      this.mail = data;
      this.getFile();
    });
  }

  async getFile() {
    let mailTransferApi = await this.web3Service.loadContract(LIST_ABI);
    this.file = await mailTransferApi.methods.getHash(this.mailID).call();
    this.url = 'https://ipfs.infura.io/ipfs/' + this.file;
    this.file = 'https://ipfs.infura.io/ipfs/' + this.file;
    // window.open(`https://ipfs.infura.io/ipfs/${this.file}`, '_blank');
    this.isFile = true;
  }
}
