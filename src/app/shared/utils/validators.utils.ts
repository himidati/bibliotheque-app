import { AbstractControl, ValidatorFn } from '@angular/forms';
import { isAfterDate } from './dates.utils';

export const dateBefore = (): ValidatorFn => {
  return (control: AbstractControl<Date>) => {
    if (!control.value) {
      return null;
    }

    if (isAfterDate(control.value, new Date())) {
      return { dateBefore: 'La date ne peut être postérieure à la date actuelle.'}
    }

    return null;
  }
}
