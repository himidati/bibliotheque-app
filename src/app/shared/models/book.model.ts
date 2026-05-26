import { FormControl } from '@angular/forms';

export interface Book {
  id?: string;
  title?: string;
  author?: string;
  isbn?: number;
  publisher?: string;
  publicationDate?: Date;
  pages?: number;
  language?: string;
  description?: string;
  category?: string;
  rating?: number;
  available?: boolean;
  createdAt?: Date;
}


export interface BookForm {
  id?: FormControl<string>;
  title?: FormControl<string>;
  author?: FormControl<string>;
  isbn?: FormControl<number>;
  publisher?: FormControl<string>;
  publicationDate?: FormControl<Date>;
  pages?: FormControl<number>;
  language?: FormControl<string>;
  description?: FormControl<string>;
  category?: FormControl<string>;
  rating?: FormControl<number>;
  available?: FormControl<boolean>;
  createdAt?: FormControl<Date>;
}
