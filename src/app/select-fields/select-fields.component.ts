import { Component } from '@angular/core';
interface Title {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-select-fields',
  templateUrl: './select-fields.component.html',
  styleUrls: ['./select-fields.component.scss']
})
export class SelectFieldsComponent {
  title: Title[] = [
    {value: 'camry', viewValue: 'Camry'},
    {value: 'a4', viewValue: 'A4'},
    {value: 'logan', viewValue: 'Logan'},
  ];
  findModel(){
    
  }
}
