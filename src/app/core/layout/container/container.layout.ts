import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-container',
  imports: [RouterOutlet],
  templateUrl: './container.layout.html',
  styleUrl: './container.layout.css',
})
export class ContainerLayout {}
