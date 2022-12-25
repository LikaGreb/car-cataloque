import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'car-cataloque';
  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    localStorage.removeItem('checkboxValues');
  }
  // openModal() {
  //   this.dialog.open(DialogBoxComponent, {
  //     width: '500px',
  //     height: '500px',
  //     data: 'right click',
  //   });
  // }
}
