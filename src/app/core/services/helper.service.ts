import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  alert(msg: string, error = false) {
    swal.fire({
      title: msg,
      icon: (error) ? 'error' : 'success',
      timer: 3000
    });
  }

  getFormValidationErrors(form: FormGroup) {
    const result = [];
    Object.keys(form.controls).forEach(key => {
      const controlErrors: ValidationErrors = form.get(key).errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(keyError => {
          result.push(`${key}  ${keyError} error!`);
        });
      }
    });
    return result;
  }
}
