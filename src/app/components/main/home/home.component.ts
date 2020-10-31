import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ComposeMessageComponent } from '../compose-message/compose-message.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
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
