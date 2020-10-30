import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/authentication/auth.service';
import { ArcosecService } from '../../core/services/arcosec.service';
import { HelperService } from '../../core/services/helper.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  otpForm: FormGroup;
  param: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private helper: HelperService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private arcoService: ArcosecService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.param = params['id'];
    });

    this.otpForm = this.initOtpForm();
  }

  initOtpForm() {
    return this.formBuilder.group({
      otp: new FormControl('', [Validators.required])
    });
  }

  verify() {
    if (this.otpForm.get('otp').value !== '' || this.otpForm.get('otp').value !== undefined) {
      this.arcoService.verifyCode(this.otpForm.value).subscribe(data => {
        if (this.param === 'user') {
          this.authService.logIn(data);
          this.authService.logoutTemp();
          // this.arcoService.setTeams().subscribe(response => {});
          this.router.navigate(['/home'], { replaceUrl: true });
        } else {
          this.router.navigate(['/forget'], { replaceUrl: true });
        }

      }, err => {
        if (err === 'Unknown Error' || err === 'Too Many Requests') {
          this.helper.alert('Too Many requests from this team...Team Blocked...try again after one hour', true);
          this.authService.logout();
        } else if (err.includes('Too Many requests from this team...Team Blocked...try again after one hour')) {
          this.helper.alert(err, true);
          this.authService.logout();
        } else {
          this.helper.alert("Invalid OTP Code", true);
        }
      });
    } else {
      this.helper.alert("Enter The Code", true);
    }
  }

}
