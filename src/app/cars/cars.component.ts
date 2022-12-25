import { Component, Input, OnInit } from '@angular/core';
import { Item, Items } from './cars';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent implements OnInit {
  checkboxVal1: Array<string> = [];
  newArr: Array<Item> = [];
  items = Items;
  itemsFromLS: Array<Item> = [];
  toGetCars: boolean = false;

  constructor(public dialog: MatDialog) {
    if (localStorage.getItem('items') === null) {
      const itemsToJSON = JSON.stringify(this.items);
      localStorage.setItem('items', itemsToJSON);
    }
    const text = localStorage.getItem('items');
    this.itemsFromLS = JSON.parse(text!);
  }
  ngOnInit() {}

  toGetCarsChange(t: boolean) {
    t == true ? this.getCars() : this.getCars();
    console.log(t, 't');
  }

  getCars() {
    this.checkboxVal1 = JSON.parse(localStorage.getItem('checkboxValues')!);
    console.log(this.checkboxVal1);
    if (this.checkboxVal1 !== null) {
      for (let i = 0; i < this.checkboxVal1.length; i++) {
        this.newArr = this.newArr.concat(
          this.itemsFromLS.filter((t) => t.manuf == this.checkboxVal1[i])
        );
      }
      this.itemsFromLS = this.newArr;
      return;
    } else {
      this.itemsFromLS = JSON.parse(localStorage.getItem('items')!);
      this.newArr = [];
    }
  }
  openModal() {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '550px',
      height: '500px',
      data: 'right click',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getCars();
    });
  }
}
