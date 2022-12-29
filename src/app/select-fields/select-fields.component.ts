import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Items } from '../cars/cars';

export interface Selector {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subselectors?: Selector[];
}
@Component({
  selector: 'app-select-fields',
  templateUrl: './select-fields.component.html',
  styleUrls: ['./select-fields.component.scss'],
})
export class SelectFieldsComponent {
  @Input() updateOptions: boolean = false;
  items = Items;
  preselectors: Array<Selector> = [];
  selector: Selector = {
    name: 'Виробник',
    completed: false,
    color: 'primary',
    subselectors: [],
  };

  @Output() toGetCarsChange = new EventEmitter<boolean>();

  isDisabled: boolean = false;
  checkboxValues: Array<string> = [];
  allComplete: boolean = false;

  constructor() {
    this.setSubselectors();
  }

  ngDoCheck() {
    if (this.updateOptions === true) {
      console.log(this.updateOptions, 'updateOptions is true');
      this.setSubselectors();
      this.updateOptions = false;
    }
    this.updateOptions = false;
    console.log(this.updateOptions, 'this.updateOptions');
    //this.filterItems(false);
  }
  setSubselectors() {
    this.items = JSON.parse(localStorage.getItem('items')!);
    console.log(this.items);
    //this.preselectors = [];
    this.items.map((i) => {
      this.preselectors = this.preselectors.concat({
        name: i.manuf.toLowerCase(),
        completed: false,
        color: 'primary',
      });
    });
    this.selector.subselectors! = [...this.preselectors!].reduce(
      (a: Array<Selector>, c) => (
        a
          .map((b: any) => b.name.toLowerCase())
          .includes(c.name.toLowerCase()) || a.push(c),
        a
      ),
      []
    );
  }
  updateAllComplete(): void {
    this.allComplete =
      this.selector.subselectors != null &&
      this.selector.subselectors.every((t) => t.completed);
  }

  someComplete(): boolean {
    if (this.selector.subselectors == null) {
      return false;
    }

    return (
      this.selector.subselectors.filter((t) => t.completed).length > 0 &&
      !this.allComplete
    );
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.selector.subselectors == null) {
      return;
    }
    this.selector.subselectors.forEach((t) => (t.completed = completed));
  }

  filterItems(t: boolean) {
    if (!this.isDisabled) {
      if (this.selector.subselectors !== null) {
        localStorage.removeItem('checkboxValues');
        this.checkboxValues = [];
        if (this.selector.subselectors!.filter((t) => t.completed).length > 0) {
          const checkboxes = this.selector.subselectors!.filter(
            //знаходимо помічені бокси
            (t) => t.completed
          );

          checkboxes.map((b) => {
            if (this.checkboxValues.indexOf(b.name.toLowerCase()) < 0) {
              this.checkboxValues.push(b.name.toLowerCase());
            }
          });
          localStorage.setItem(
            'checkboxValues',
            JSON.stringify(this.checkboxValues)
          );
          this.toGetCarsChange.emit(t);
        }
      }
    } else {
      return;
    }

    this.isDisabled = true;
  }

  noFilter(t: boolean) {
    this.isDisabled = false;
    localStorage.removeItem('checkboxValues');
    this.checkboxValues = [];

    this.selector.subselectors!.forEach((t) => (t.completed = false));
    this.toGetCarsChange.emit(t);
  }
}
function constuctor() {
  throw new Error('Function not implemented.');
}
