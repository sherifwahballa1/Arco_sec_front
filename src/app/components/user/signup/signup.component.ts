import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArcosecService } from '../../../core/services/arcosec.service';
import { AuthService } from '../../../core/authentication/auth.service';
import { HelperService } from '../../../core/services/helper.service';
import { PasswordValidator } from './../../../core/validation/password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  allCountriesArr: any = [];
  countryValue: String = '';

  teamNameFlag = false;

  constructor(
    private formBuilder: FormBuilder,
    private helper: HelperService,
    private arcosecService: ArcosecService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signupForm = this.initSignupForm();
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

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }


  submitSignupForm() {
    this.authService.logoutTemp();
    if (this.signupForm.valid) {
      const signData = {
        name: this.signupForm.value.name,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
      };
      this.arcosecService.signup(signData).subscribe(data => {
        if (data && data['token'] !== undefined) {
          this.authService.logInTemp(data);
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
      } 
      // else {
      //   return this.helper.alert("Please Select Country", true);
      // }

    }
  }

}
