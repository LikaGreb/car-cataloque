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
  checkboxValColor: Array<string> = [];
  checkboxValYear: Array<number> = [];
  checkboxValCap: Array<number> = [];
  checkboxValPrice: Array<number> = [];
  newArr: Array<Item> = [];
  items = Items;
  itemsFromLS: Array<Item> = [];
  toGetCars: boolean = false;
  isEdit: boolean = false;
  filteredOnce: boolean = false;
  itemEdit: Item = {
    id: '',
    title: '',
    manuf: '',
    year: 0,
    color: '',
    engine_capas: 0,
    price: 0,
    description: '',
  };
  clearAllFilters: boolean = false;
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
  }

  getCars() {
    this.checkboxValManuf = JSON.parse(localStorage.getItem('checkboxValues')!);
    this.checkboxValColor = JSON.parse(
      localStorage.getItem('checkboxValuesColor')!
    );
    this.checkboxValYear = JSON.parse(
      localStorage.getItem('checkboxValuesYear')!
    );
    this.checkboxValCap = JSON.parse(
      localStorage.getItem('checkboxValuesCap')!
    );
    this.checkboxValPrice = JSON.parse(
      localStorage.getItem('checkboxValuesPrice')!
    );

    // сортування за виробником
    if (this.checkboxValManuf !== null) {
      if ((this.filteredOnce = true)) {
        this.newArr = [];
      }
      for (let i = 0; i < this.checkboxValManuf.length; i++) {
        this.newArr = this.newArr.concat(
          this.itemsFromLS.filter(
            (t) => t.manuf.toLowerCase() == this.checkboxValManuf[i]
          )
        );
      }
      this.itemsFromLS = this.newArr;
      this.filteredOnce = true;
      return;
    }
    // сортування за кольором
    if (this.checkboxValColor !== null) {
      if ((this.filteredOnce = true)) {
        this.newArr = [];
      }
      for (let i = 0; i < this.checkboxValColor.length; i++) {
        this.newArr = this.newArr.concat(
          this.itemsFromLS.filter(
            (t) => t.color.toLowerCase() == this.checkboxValColor[i]
          )
        );
      }
      this.itemsFromLS = this.newArr;
      this.filteredOnce = true;
      return;
    }
    // сортування за роком випуску
    if (this.checkboxValYear !== null) {
      if ((this.filteredOnce = true)) {
        this.newArr = [];
      }
      for (let i = 0; i < this.checkboxValYear.length; i++) {
        switch (this.checkboxValYear[i]) {
          case 1:
            this.newArr = this.newArr.concat(
              this.itemsFromLS.filter((t) => {
                return t.year >= 1990 && t.year <= 1999;
              })
            );
            break;
          case 2:
            this.newArr = this.newArr.concat(
              this.itemsFromLS.filter((t) => {
                return t.year >= 2000 && t.year <= 2009;
              })
            );
            break;
          case 3:
            this.newArr = this.newArr.concat(
              this.itemsFromLS.filter((t) => {
                return t.year >= 2010 && t.year <= 2019;
              })
            );
            break;
          case 4:
            this.newArr = this.newArr.concat(
              this.itemsFromLS.filter((t) => {
                return t.year >= 2020 && t.year <= 2022;
              })
            );
            break;
          default:
            break;
        }
      }
      this.itemsFromLS = this.newArr;
      this.filteredOnce = true;
      return;
    }
    // сортування за об*ємом двигуна
    if (this.checkboxValCap !== null) {
      if ((this.filteredOnce = true)) {
        this.newArr = [];
      }
      for (let i = 0; i < this.checkboxValCap.length; i++) {
        switch (this.checkboxValCap[i]) {
          case 1:
            this.newArr = this.newArr.concat(
              this.itemsFromLS.filter((t) => {
                return t.engine_capas < 2;
              })
            );
            break;
          case 2:
            this.newArr = this.newArr.concat(
              this.itemsFromLS.filter((t) => {
                return t.engine_capas >= 2 && t.engine_capas < 2.5;
              })
            );
            break;
          case 3:
            this.newArr = this.newArr.concat(
              this.itemsFromLS.filter((t) => {
                return t.engine_capas >= 2.5 && t.engine_capas < 3;
              })
            );
            break;
          case 4:
            this.newArr = this.newArr.concat(
              this.itemsFromLS.filter((t) => {
                return t.engine_capas >= 3;
              })
            );
            break;
          default:
            break;
        }
      }
      this.itemsFromLS = this.newArr;
      this.filteredOnce = true;
      return;
    }
    // сортування за ціною
    if (this.checkboxValPrice !== null) {
      if ((this.filteredOnce = true)) {
        this.newArr = [];
      }
      for (let i = 0; i < this.checkboxValPrice.length; i++) {
        switch (this.checkboxValPrice[i]) {
          case 1:
            this.newArr = this.newArr.concat(
              this.itemsFromLS.filter((t) => {
                return t.price < 2000;
              })
            );
            break;
          case 2:
            this.newArr = this.newArr.concat(
              this.itemsFromLS.filter((t) => {
                return t.price >= 2000 && t.price < 4000;
              })
            );
            break;
          case 3:
            this.newArr = this.newArr.concat(
              this.itemsFromLS.filter((t) => {
                return t.price >= 4000 && t.price < 6000;
              })
            );
            break;
          case 4:
            this.newArr = this.newArr.concat(
              this.itemsFromLS.filter((t) => {
                return t.price >= 6000;
              })
            );
            break;
          default:
            break;
        }
      }
      this.itemsFromLS = this.newArr;
      this.filteredOnce = true;
      return;
    } else {
      this.itemsFromLS = JSON.parse(localStorage.getItem('items')!);
      this.newArr = [];
    }
    this.update = true;
    console.log(this.update, 'updates from father');
  }

  delFilters() {
    this.clearAllFilters = true;
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
      height: '750px',
      data: { itemEd: itemEdit },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getCars();
    });
  }
  add() {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '550px',
      height: '750px',
      data: 'right click',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getCars();
    });
  }
}
