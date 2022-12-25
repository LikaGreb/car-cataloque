import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Items } from '../cars/cars';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
@Component({
  selector: 'app-select-fields',
  templateUrl: './select-fields.component.html',
  styleUrls: ['./select-fields.component.scss'],
})
export class SelectFieldsComponent {
  //items: Array<Items> = JSON.parse(localStorage.getItem('items')!);
  items = Items;
  test: Array<Task> = [];
  task: Task = {
    name: 'Виробник',
    completed: false,
    color: 'primary',
    subtasks: [],
  };
  //@Input() toGetCars: boolean = false;
  @Output() toGetCarsChange = new EventEmitter<boolean>();

  constructor() {
    this.items = JSON.parse(localStorage.getItem('items')!);
    this.items.map((i) => {
      this.test = this.test.concat({
        name: i.manuf,
        completed: false,
        color: 'primary',
      });
    });
    this.task.subtasks! = [...this.test!].reduce(
      (a: Array<Task>, c) => (
        a.map((b: any) => b.name).includes(c.name) || a.push(c), a
      ),
      []
    );
  }
  isDisabled: boolean = false;
  checkboxValues: Array<string> = [];
  allComplete: boolean = false;

  updateAllComplete(): void {
    this.allComplete =
      this.task.subtasks != null &&
      this.task.subtasks.every((t) => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }

    return (
      this.task.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allComplete
    );
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach((t) => (t.completed = completed));
  }

  filterItems(t: boolean) {
    if (!this.isDisabled) {
      if (this.task.subtasks !== null) {
        localStorage.removeItem('checkboxValues');
        this.checkboxValues = [];
        if (this.task.subtasks!.filter((t) => t.completed).length > 0) {
          const checkboxes = this.task.subtasks!.filter((t) => t.completed);
          console.log(checkboxes, 'checkboxes');
          checkboxes.map((b) => {
            if (this.checkboxValues.indexOf(b.name) < 0) {
              this.checkboxValues.push(b.name);
            }
          });
          console.log(this.checkboxValues, 'this.checkboxValues');
          localStorage.setItem(
            'checkboxValues',
            JSON.stringify(this.checkboxValues)
          );
          this.toGetCarsChange.emit(t);
          //console.log(this.toGetCars, 'this.toGetCars');
        }
      }
    } else {
      return;
    }

    this.isDisabled = true;
    //this.toGetCars = false;
  }

  noFilter(t: boolean) {
    this.isDisabled = false;
    localStorage.removeItem('checkboxValues');
    this.checkboxValues = [];
    console.log(this.checkboxValues, 'checkboxValues2');
    this.task.subtasks!.forEach((t) => (t.completed = false));
    this.toGetCarsChange.emit(t);
  }
}
