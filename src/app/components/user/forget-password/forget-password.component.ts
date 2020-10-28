import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/authentication/auth.service';
import { ArcosecService } from '../../../core/services/arcosec.service';
import { HelperService } from '../../../core/services/helper.service';
import { PasswordValidator } from '../../../core/validation/password.validator';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private helper: HelperService,
    private arcoService: ArcosecService,
    private authService: AuthService,
    private router: Router
  ) { }


  ngOnInit() {
    this.forgetPasswordForm = this.forgetPasswordFormInit();
  }


  forgetPasswordFormInit() {
    return this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(/(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(/(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]]
    }, { validator: PasswordValidator});
  }

  get password() {
    return this.forgetPasswordForm.get('password');
  }

  get confirmPassword() {
    return this.forgetPasswordForm.get('confirmPassword');
  }

  submitForgetPasswordForm() {
    if (this.forgetPasswordForm.valid) {
      this.arcoService.resetPassword(this.password.value).subscribe(data => {
        this.helper.alert(data['message']);
        this.router.navigate(['/login'], { replaceUrl: true });
        this.authService.logoutTemp();
      },
        err => {
          if (err === 'Unknown Error' || err === 'Too Many Requests') {
            this.helper.alert('Too Many requests from this team...Team Blocked...try again after one hour', true);
            this.authService.logoutTemp();
            this.authService.logout();
          } else if (err.includes('Too Many requests from this team...Team Blocked...try again after one hour')) {
            this.helper.alert(err, true);
            this.authService.logout();
          } else {
            this.helper.alert("Please Try Again Later", true);
          }
        });
    } else {
      if (this.forgetPasswordForm.get('password').errors && this.forgetPasswordForm.get('password').errors.required) {
        return this.helper.alert("Password required", true);
      } else if (
        this.forgetPasswordForm.get('password').errors &&
        (this.forgetPasswordForm.get('password').errors.pattern)
        ) {
        return this.helper.alert(
          "Password not allowed Must contain characters, numbers and at least one special and capital character",
          true
        );
      } else if (
        this.forgetPasswordForm.get('confirmPassword').errors &&
        this.forgetPasswordForm.get('confirmPassword').errors.required
        ) {
        return this.helper.alert("Confirm Password Required", true);
      } else if (
        this.forgetPasswordForm.errors &&
        this.forgetPasswordForm.errors.misMatch
        ) {
        return this.helper.alert(
          "Confirm password and password not match", true
        );
      }
    }
  }

}
