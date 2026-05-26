import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sub-nav',
  imports: [Button, RouterLink],
  templateUrl: './sub-nav.layout.html',
  styleUrl: './sub-nav.layout.css',
})
export class SubNavLayout {}
