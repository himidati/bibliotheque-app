import { ChangeDetectionStrategy, Component, input, output, OutputEmitterRef } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [Button],
  templateUrl: './header.layout.html',
  styleUrl: './header.layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderLayout {
  isModeSombre: boolean = false;

  testCom = input.required<string>();

  headerEmitter: OutputEmitterRef<'light' | 'dark'> = output<'light' | 'dark'>(); // si on a des valeurs restreint utiliser dans le type

  toggleDarkMode(): void {
    const element: HTMLElement | null = document.documentElement;
    element?.classList.toggle('app-dark-mode');
    this.isModeSombre = element?.classList.contains('app-dark-mode') ?? false;
    this.butttonclick(this.isModeSombre ? 'dark' : 'light');
  }

  butttonclick(type: 'light' | 'dark'): void {
    this.headerEmitter.emit(type);
  }
}
