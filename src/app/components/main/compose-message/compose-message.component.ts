 import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ArcosecService } from '../../../core/services/arcosec.service';

@Component({
  selector: 'app-compose-message',
  templateUrl: './compose-message.component.html',
  styleUrls: ['./compose-message.component.css']
})
export class ComposeMessageComponent implements OnInit {
  sendEmailForm: FormGroup;
  public fileSrc: any;
  isFileExists = false;
  fileName: '';
  isFileNameExists = false;
  allMails: any;
  emailValue: string = '';

  @ViewChild('mySelect', { static: true }) mySelect: any;

  constructor(
    private formBuilder: FormBuilder,
    private arcoService: ArcosecService,
    public dialogRef: MatDialogRef<ComposeMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.sendEmailForm = this.initSendEmailForm();
  }

  initSendEmailForm() {
    return this.formBuilder.group({
      receipeintEmail: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', [])
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onFileChange(e) {
    if (e.target.value !== null) {
      if ( /\.(jpe?g|png|gif)$/i.test(e.target.files[0].name) === false )  {
        this.isFileNameExists = true;
        this.fileName = e.target.files[0].name;
        this.isFileExists = false;
        this.fileSrc = '';
      } else {
        let reader = new FileReader();
        // this.fileSrc = e.target.files;
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (_event) => {
          this.isFileExists = true;
          this.fileSrc = reader.result;
          this.isFileNameExists = false;
          this.fileName = '';
        }
      }

    }
  }

  searchbyEmail(e) {
    this.arcoService.getEmails(e).subscribe(data => {
      this.mySelect.open();
      this.allMails = data;
    }, err => {
      console.log(err);
    });
  }

  emailSelected(e) {
    this.sendEmailForm.patchValue({
      receipeintEmail: e.value
    });
  }

}
