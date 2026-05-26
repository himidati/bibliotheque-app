import { Pipe, PipeTransform } from '@angular/core';
import { formatDatewithSlash, isDateValid } from '../utils/dates.utils';

@Pipe({
  name: 'transformToString',
})
export class TransformToStringPipe implements PipeTransform {
  transform(value: unknown): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }
    else if (typeof value === 'boolean') {
      return value ? 'Oui' : 'Non';
    }

    else if (typeof value === 'number') {
      return `${value}`;
    }

    else if (typeof value === 'object') {
      if (isDateValid(value)) {
        return formatDatewithSlash(value as Date);
      } else {
        throw Error(`Invalid Date: ${value}`);
      }
    }

    else if (typeof value === 'string') {
      if (value === 'M') {
        return 'Masculin';
      }
      if (value === 'F') {
        return 'Féminin';
      }
      return value; // sinon on rend le texte brut (ex: "Dupont", "Jean")
    }
    return String(value);
  }
}
