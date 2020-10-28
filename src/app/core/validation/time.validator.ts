import { AbstractControl, FormGroup } from '@angular/forms';

export function startEndTimeValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const startTime = control.get('startTime').value;
  const endTime = control.get('endTime').value;
  return startTime !== null && endTime !== null && startTime >= endTime ? { 'time': true } : null;
}
