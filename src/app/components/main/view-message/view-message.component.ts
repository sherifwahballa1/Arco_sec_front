import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ComposeMessageComponent } from '../compose-message/compose-message.component';
import { TokenService } from '../../../core/authentication/token.service';
import { ArcosecService } from '../../../core/services/arcosec.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.css']
})
export class ViewMessageComponent implements OnInit {

  myEmailAddress: string = '';

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private arcoService: ArcosecService,
    private socket: Socket
  ) { }

  ngOnInit() {
    if (this.tokenService.token) {
      this.arcoService.getProfile().subscribe(data => {
        this.myEmailAddress = data['email'].toString();
        this.socket.emit('joinRequest', { sender: this.myEmailAddress });
      });
    }

    this.socket.on('newMailRequest', (data) => {
      console.log('data: ', data);
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

}
