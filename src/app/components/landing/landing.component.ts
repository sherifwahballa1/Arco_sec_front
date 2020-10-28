import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  loginFlag = false;
  signupFlag = false;
  login: any;
  sigup: any;

  constructor() {
    this.login = 'loginPutton';
    this.sigup = 'sigupPutton';
  }

  ngOnInit() {
  }

  openLogincom() {
    this.loginFlag = true;
    this.signupFlag = false;
    this.login = 'loginActive';
    this.sigup = 'sigupnotActive';
  }
  openSignupcom() {
    this.signupFlag = true;
    this.loginFlag = false;
    this.login = 'loginnotActive';
    this.sigup = 'sigupActive';
  }
  onClosed(event: any) {
  }

}
