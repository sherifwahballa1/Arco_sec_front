import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AccessService } from '../../core/http/access/access.service';
import { AuthService } from '../../core/authentication/auth.service';
import { HelperService } from '../../core/services/helper.service';
import { ArcosecService } from '../../core/services/arcosec.service';
import { Router } from '@angular/router';
import { PasswordValidator } from '../../core/validation/password.validator';

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

  // login form
  loginForm: FormGroup;
  regex1 = '^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?![_.])$';
  regex2 = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d$@$!%*?&]{8,30}$';
  forgetFlag = false;
  clickedLogin = false;
  clickedForgetPassword = false;

  // signup
  signupForm: FormGroup;
  clickedSignup = false;

  constructor(
    private accessHttpService: AccessService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private helper: HelperService,
    private arcoService: ArcosecService,
    private router: Router
  ) {
    // this.login = 'loginPutton';
    // this.sigup = 'sigupPutton';
  }

  ngOnInit() {
    this.loginForm = this.initLoginForm();
    this.signupForm = this.initSignupForm();

    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
  }

  initLoginForm() {
    return this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  initSignupForm() {
    return this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
        Validators.pattern('^[A-Za-z0-9]+$')
      ]),
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(/(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]]
    }, { validator: PasswordValidator });
  }

  submitLogin() {
    this.clickedLogin = true;
    this.signupForm.disable();
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
    this.clickedLogin = false;
  }

  GoToForgetPassword() {
    this.signupForm.disable();
    this.authService.logoutTemp();
    this.authService.logout();
    if (this.loginForm.get('email').value !== '' || this.loginForm.get('email').value !== undefined && this.loginForm.get('email').valid) {
      this.arcoService.forgetPassword(this.loginForm.get('email').value).subscribe(token => {
        this.authService.logInTemp(token);
        this.router.navigate(['/verify/password'], { replaceUrl: true });
      }, err => {
        console.log(err);
        this.helper.alert(err, true);
      });
    } else {
      this.forgetFlag = true;
      this.helper.alert("Please Enter Valid Email Address", true);
    }
    this.signupForm.enable();
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  async submitSignup() {
    this.clickedSignup = true;
    this.authService.logoutTemp();
    if (this.signupForm.valid) {
      const signData = {
        name: this.signupForm.value.name,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
      };
      await this.arcoService.signup(signData).subscribe(async (data) => {
        if (data && data['token'] !== undefined) {
          await this.authService.logInTemp(data);

          await this.sendVerification();

         this.router.navigate(['/verify/user'], { replaceUrl: true });
        } else {
          this.helper.alert("Error Please try again", true);
        }
      }, (error) => {
        this.helper.alert(error, true);
      });
    } else {
      if (this.signupForm.get('name').errors && this.signupForm.get('name').errors.required) {
        return this.helper.alert("Team name required", true);
      } else if (
        this.signupForm.get('name').errors &&
        (this.signupForm.get('name').errors.minlength ||
        this.signupForm.get('name').errors.maxlength)
        ) {
        return this.helper.alert("Team name must be more than 4 (characters, numbers) and less than 25 without spaces", true);
      } else if (
        this.signupForm.get('name').errors &&
        this.signupForm.get('name').errors.pattern
        ) {
        return this.helper.alert("Team name must be (characters, numbers) only without spaces", true);
      } else if (
        this.signupForm.get('email').errors &&
        this.signupForm.get('email').errors.required
        ) {
        return this.helper.alert("Email Required", true);
      } else if (
        this.signupForm.get('email').errors &&
        this.signupForm.get('email').errors.email
        ) {
        return this.helper.alert("Enter Valid Email", true);
      } else if (
        this.signupForm.get('password').errors &&
        this.signupForm.get('password').errors.required
        ) {
        return this.helper.alert("Password Required", true);
      } else if (
        this.signupForm.get('password').errors &&
        this.signupForm.get('password').errors.pattern
        ) {
        return this.helper.alert(
          "Password not allowed Must contain characters, numbers and at least one special and capital character", true
        );
      } else if (
        this.signupForm.get('confirmPassword').errors &&
        this.signupForm.get('confirmPassword').errors.required
        ) {
        return this.helper.alert("Confirm Password Required", true);
      } else if (
        this.signupForm.errors &&
        this.signupForm.errors.misMatch
        ) {
        return this.helper.alert(
          "Confirm password and password not match", true
        );
      } else {
        return this.helper.alert("Please Select Country", true);
      }

    }
    this.clickedSignup = false;
  }

  sendVerification() {
    this.arcoService.sendVerification().subscribe(responseMessage => {
      if (!responseMessage['message'].includes('Please Check your Email')) {
        this.authService.logoutTemp();
        this.router.navigate(['/login'], { replaceUrl: true });
      } else {
        this.helper.alert('Please Check your Email');
      }
    }, (err) => {
      console.log('err ', err);
      this.helper.alert("Please try again at another time", true);
      this.router.navigate(['/login'], { replaceUrl: true });
    });
  }

  submitSignupForm(buttonType): void {
    if (buttonType === "signup") {
      this.submitSignup();
    }
  }

  submitLoginForm(buttonType): void {
    if (buttonType === "submit") {
        this.submitLogin();
    }
    if (buttonType === "forget" ) {
      this.clickedForgetPassword = true;
      this.GoToForgetPassword();
    }

}

  // openLogincom() {
  //   this.loginFlag = true;
  //   this.signupFlag = false;
  //   this.login = 'loginActive';
  //   this.sigup = 'sigupnotActive';
  // }
  // openSignupcom() {
  //   this.signupFlag = true;
  //   this.loginFlag = false;
  //   this.login = 'loginnotActive';
  //   this.sigup = 'sigupActive';
  // }
  // onClosed(event: any) {
  // }


}
