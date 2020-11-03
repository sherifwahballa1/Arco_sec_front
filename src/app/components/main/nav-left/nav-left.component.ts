import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { TokenService } from '../../../core/authentication/token.service';
import { ArcosecService } from '../../../core/services/arcosec.service';
import { ComposeMessageComponent } from '../compose-message/compose-message.component';

@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.css']
})
export class NavLeftComponent implements OnInit {

  myEmailAddress: string = '';
  allMails: [];
  numberOfMessage: number = 0;
  m: Boolean = false;

  constructor(
    public dialog: MatDialog,
    private arcoService: ArcosecService,
    private socket: Socket,
    private tokenService: TokenService,
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

  openMessage() {
    const dialogRef = this.dialog.open(ComposeMessageComponent, {
      width: '950px',
      height: '530px',
      data: {name: 'sherif', age: '25'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  getInbox() {
    this.arcoService.getInboxMails().subscribe(data => {
      this.allMails = data[0].inbox;
      this.numberOfMessage = this.allMails.filter((value) => value['isRead'] === false).length;
      this.m = false;
    });
  }

  inboxMails() {
    this.router.navigate(['/home']);
    // this.getInbox();
   }

   getSentMails() {
    this.arcoService.getSentMails().subscribe(data => {
      this.allMails = data[0].sentMails;
      this.m = true;
    });
  }

}
