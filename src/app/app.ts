import { Component, signal } from '@angular/core';
import { HeaderLayout } from './core/layout/header/header.layout';
import { ContainerLayout } from './core/layout/container/container.layout';
import { FooterLayout } from './core/layout/footer/footer.layout';
import { SubNavLayout } from './core/layout/sub-nav/sub-nav.layout';

@Component({
  selector: 'app-root',
  imports: [HeaderLayout, ContainerLayout, FooterLayout, SubNavLayout],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  selectedMode: 'light' | 'dark';
}
