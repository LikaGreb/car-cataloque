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
  engine_opas: number;
  price: number;
  description: string;
}
@Component({
  selector: 'app-dialog-box-edit',
  templateUrl: './dialog-box-edit.component.html',
  styleUrls: ['./dialog-box-edit.component.scss'],
})
export class DialogBoxEditComponent {
  error: string = '';
  itemsFromLS1: Array<Item> = [];
  //haveToChange: string = '';
  itemEd!: Item;
  editCar: Item = {
    id: '',
    title: '',
    manuf: '',
    year: 0,
    color: '',
    engine_opas: 0,
    price: 0,
    description: '',
  };
  constructor(
    public dialogRef: MatDialogRef<DialogBoxEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { itemEd: Item }
  ) {}

  ngOnInit() {
    this.editCar = Object.assign({}, this.data.itemEd);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  save(): void {
    if (
      this.editCar.title === '' ||
      this.editCar.manuf === '' ||
      this.editCar.year === 0 ||
      this.editCar.color === '' ||
      this.editCar.engine_opas === 0 ||
      this.editCar.price === 0 ||
      this.editCar.description === ''
    ) {
      this.error = 'Введіть дані';
      setTimeout(() => {
        this.error = '';
      }, 3000);
      return;
    }

    const text = localStorage.getItem('items');
    this.itemsFromLS1 = JSON.parse(text!);

    const changedItem = this.itemsFromLS1.map((i) => {
      if (i.id === this.editCar.id) {
        return this.editCar;
      }
      return i;
    });

    const itemsToJSON1 = JSON.stringify(changedItem);
    localStorage.setItem('items', itemsToJSON1);
    this.dialogRef.close();
  }
}
