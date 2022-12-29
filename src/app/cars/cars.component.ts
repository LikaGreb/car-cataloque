import { Component, Input, OnInit } from '@angular/core';
import { Item, Items } from './cars';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { DialogBoxEditComponent } from '../dialog-box-edit/dialog-box-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent implements OnInit {
  checkboxValManuf: Array<string> = [];
  newArr: Array<Item> = [];
  items = Items;
  itemsFromLS: Array<Item> = [];
  toGetCars: boolean = false;
  isEdit: boolean = false;
  itemEdit: Item = {
    id: '',
    title: '',
    manuf: '',
    year: 0,
    color: '',
    engine_opas: 0,
    price: 0,
    description: '',
  };
  update: boolean = false;
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
    this.checkboxValManuf = JSON.parse(localStorage.getItem('checkboxValues')!);
    console.log(this.checkboxValManuf);
    if (this.checkboxValManuf !== null) {
      for (let i = 0; i < this.checkboxValManuf.length; i++) {
        this.newArr = this.newArr.concat(
          this.itemsFromLS.filter(
            (t) => t.manuf.toLowerCase() == this.checkboxValManuf[i]
          )
        );
      }
      this.itemsFromLS = this.newArr;
      return;
    } else {
      this.itemsFromLS = JSON.parse(localStorage.getItem('items')!);
      this.newArr = [];
    }
    this.update = true;
    console.log(this.update, 'updates from father');
  }
  delete(id: string): void {
    this.itemsFromLS = this.itemsFromLS.filter((i) => i.id != id);
    const itemsToJSON = JSON.stringify(this.itemsFromLS);
    localStorage.setItem('items', itemsToJSON);
  }

  edit(itemEdit: Item) {
    console.log(itemEdit, 'idEdit');
    const dialogRef = this.dialog.open(DialogBoxEditComponent, {
      width: '550px',
      height: '700px',
      data: { itemEd: itemEdit },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getCars();
    });
  }
  openModal() {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '550px',
      height: '700px',
      data: 'right click',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getCars();
    });
  }
}
