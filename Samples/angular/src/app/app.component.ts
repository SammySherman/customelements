import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular';
  disabled = false;
  buttons = [
    [ { text: 'Basic' }, { text: 'Primary', color: 'primary', class: 'custom-primary' }, { text: 'Accent', color: 'accent' }, { text: 'Disabled', disabled: true } ],
    [ { text: 'Basic', appearance: 'outline' }, { text: 'Primary', color: 'primary', appearance: 'outline' }, { text: 'Accent', color: 'accent', appearance: 'outline' }, { text: 'Disabled', disabled: true, appearance: 'outline' } ],
    [ { text: 'Basic', appearance: 'flat' }, { text: 'Primary', color: 'primary', appearance: 'flat' }, { text: 'Accent', color: 'accent', appearance: 'flat' }, { text: 'Disabled', disabled: true, appearance: 'flat' } ],
  ];
  buttonClick(button: any): void {
    console.log('Button clicked:', button);
  }
  checkboxClick(event: any): void {
    console.log('checkboxClick:', event);
  }
}
