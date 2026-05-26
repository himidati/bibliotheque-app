import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root' // <-- Dit à Angular de le rendre disponible partout
})

export class DataStore{
  isLoading: WritableSignal<boolean>=signal<boolean>(false);
}
