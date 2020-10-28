import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/authentication/auth.service';
import { AccessService } from '../../../core/http/access/access.service';
import { HelperService } from '../../../core/services/helper.service';
import { ArcosecService } from '../../../core/services/arcosec.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  regex1 = '^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?![_.])$';
  regex2 = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d$@$!%*?&]{8,30}$';

  forgetFlag = false;

  constructor(
    private accessHttpService: AccessService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private arcoService: ArcosecService,
    private helper: HelperService,
    private router: Router
  ) { }


  ngOnInit() {
    this.loginForm = this.initLoginForm();
  }


  initLoginForm() {
    return this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  submitLoginForm() {
    if (this.loginForm.valid) {
      this.authService.logoutTemp();
      this.authService.logout();
      this.accessHttpService.access(this.loginForm.value).subscribe(data => {
        this.authService.logIn(data);
      }, err => {
        this.helper.alert("Email or Password invalid", true);
      });
    } else {
      if (this.loginForm.get('email').errors && this.loginForm.get('email').errors.required) {
        return this.helper.alert("Email required", true);
      } else if (
        this.loginForm.get('email').errors &&
        (this.loginForm.get('email').errors.email)
        ) {
        return this.helper.alert("Enter Valid Email", true);
      } else if (this.loginForm.get('password').errors && this.loginForm.get('password').errors.required) {
        return this.helper.alert("Password required", true);
      } else {
        this.helper.alert("Enter Email and Password", true);
      }
    }
  }

  GoToForgetPassword() {
    this.authService.logoutTemp();
    this.authService.logout();
    if (this.loginForm.get('email').value !== '' || this.loginForm.get('email').value !== undefined && this.loginForm.get('email').valid) {
      this.arcoService.forgetPassword(this.loginForm.get('email').value).subscribe(token => {
        this.authService.logInTemp(token);
        this.router.navigate(['/forget'], { replaceUrl: true });
      }, err => {
        console.log(err);
        this.helper.alert(err, true);
      });
    } else {
      this.forgetFlag = true;
      this.helper.alert("Please Enter Valid Email Address", true);
    }
  }
}
