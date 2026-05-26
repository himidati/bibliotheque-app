import { Component } from '@angular/core';
import {version} from '../../../../../package.json'

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.layout.html',
  styleUrl: './footer.layout.css',
})
export class FooterLayout {

   version : string = version;
}
