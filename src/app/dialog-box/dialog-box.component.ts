import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Counter } from '../cars/carID';
import { Item, Items } from '../cars/cars';

export interface NewCar {
  id: string;
  title: string;
  manuf: string;
  year: number;
  color: string;
  engine_capas: number;
  price: number;
  description: string;
}
@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],
})
export class DialogBoxComponent {
  error: string = '';
  itemsFromLS1: Array<Object> = [];
  haveToChange: string = '';
  @Input() isEdit: boolean = false;
  items = Items;
  newCar: NewCar = {
    id: '',
    title: '',
    manuf: '',
    year: 0,
    color: '',
    engine_capas: 0,
    price: 0,
    description: '',
  };
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  save(): void {
    if (
      this.newCar.title === '' ||
      this.newCar.manuf === '' ||
      this.newCar.year === 0 ||
      !this.newCar.year ||
      this.newCar.color === '' ||
      this.newCar.engine_capas === 0 ||
      !this.newCar.engine_capas ||
      this.newCar.price === 0 ||
      !this.newCar.price ||
      this.newCar.description === ''
    ) {
      this.error = 'Введіть дані';
      setTimeout(() => {
        this.error = '';
      }, 3000);
      return;
    }
    const counter = new Counter();
    this.newCar.id = counter.getCounter();
    console.log(this.newCar);

    const text = localStorage.getItem('items');
    console.log(text, 'text');
    this.itemsFromLS1 = JSON.parse(text!);
    console.log(this.itemsFromLS1, 'this.itemsFromLS');
    this.itemsFromLS1.push(this.newCar);
    const itemsToJSON1 = JSON.stringify(this.itemsFromLS1);
    localStorage.setItem('items', itemsToJSON1);
    this.dialogRef.close();
  }
}
