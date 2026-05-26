import { Component, input } from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-global-spinner',
  imports: [ProgressSpinner],
  templateUrl: './global-spinner.layout.html',
  styleUrl: './global-spinner.layout.css',
})
export class GlobalSpinnerLayout {
  isLoading = input<boolean>(false);
}
