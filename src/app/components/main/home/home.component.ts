import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ComposeMessageComponent } from '../compose-message/compose-message.component';
import { TokenService } from '../../../core/authentication/token.service';
import { ArcosecService } from '../../../core/services/arcosec.service';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  myEmailAddress: string = '';
  allMails: [];
  numberOfMessage: number = 0;
  m: Boolean = false;

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private arcoService: ArcosecService,
    private socket: Socket,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.tokenService.token) {
      this.arcoService.getProfile().subscribe(data => {
        this.myEmailAddress = data['email'].toString();
        this.socket.emit('joinRequest', { sender: this.myEmailAddress });
      });
      this.getInbox();

    }

    this.socket.on('newMailRequest', (data) => {
      this.getInbox();
    });
  }

  getInbox() {
    this.arcoService.getInboxMails().subscribe(data => {
      this.allMails = data[0].inbox;
      this.numberOfMessage = this.allMails.filter((value) => value['isRead'] === false).length;
      this.m = false;
    });
  }

  // openMessage() {
  //   const dialogRef = this.dialog.open(ComposeMessageComponent, {
  //     width: '950px',
  //     height: '530px',
  //     data: {name: 'sherif', age: '25'}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     // this.animal = result;
  //   });
  // }

  viewMessage(mailID) {
    // todo
    // event.preventDefault()
    this.router.navigate([`/message/${mailID}`]).then(() => {
      // this.getInbox();
    });
  }

  // getSentMails() {
  //   this.arcoService.getSentMails().subscribe(data => {
  //     this.allMails = data[0].sentMails;
  //     this.m = true;
  //   });
  // }
  // inboxMails() {
  //  this.getInbox();
  // }
}
