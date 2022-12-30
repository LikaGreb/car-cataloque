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
  selector: 'app-select-fields-color',
  templateUrl: './select-fields-color.component.html',
  styleUrls: ['./select-fields-color.component.scss'],
})
export class SelectFieldsColorComponent {
  @Input() clearAllFilters: boolean = false;
  @Input() updateOptions: boolean = false;
  items = Items;
  preselectors: Array<Selector> = [];
  preselectorsColor: Array<Selector> = [];

  selectorColor: Selector = {
    name: 'Колір',
    completed: false,
    color: 'primary',
    subselectors: [],
  };

  @Output() toGetCarsChange = new EventEmitter<boolean>();

  isDisabled: boolean = false;
  checkboxValuesColor: Array<string> = [];
  allComplete: boolean = false;

  constructor() {
    this.setSubselectors();
  }

  ngDoCheck() {
    if (this.updateOptions === true) {
      this.setSubselectors();
      this.updateOptions = false;
    }
    if (this.clearAllFilters === true) {
      this.noFilter(true);
    }
    this.updateOptions = false;

    //this.filterItems(false);
  }
  setSubselectors() {
    this.items = JSON.parse(localStorage.getItem('items')!);
    console.log(this.items);
    //this.preselectors = [];
    this.items.map((i) => {
      this.preselectorsColor = this.preselectorsColor.concat({
        name: i.color.toLowerCase(),
        completed: false,
        color: 'primary',
      });
    });
    this.selectorColor.subselectors! = [...this.preselectorsColor!].reduce(
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
      this.selectorColor.subselectors != null &&
      this.selectorColor.subselectors.every((t) => t.completed);
  }

  someComplete(): boolean {
    if (this.selectorColor.subselectors == null) {
      return false;
    }

    return (
      this.selectorColor.subselectors.filter((t) => t.completed).length > 0 &&
      !this.allComplete
    );
  }

  // setAll(completed: boolean) {
  //   this.allComplete = completed;
  //   if (this.selectorColor.subselectors == null) {
  //     return;
  //   }
  //   this.selectorColor.subselectors.forEach((t) => (t.completed = completed));
  // }

  filterItems(t: boolean) {
    if (!this.isDisabled) {
      if (this.selectorColor.subselectors !== null) {
        localStorage.removeItem('checkboxValuesColor');
        this.checkboxValuesColor = [];
        if (
          this.selectorColor.subselectors!.filter((t) => t.completed).length > 0
        ) {
          const checkboxes = this.selectorColor.subselectors!.filter(
            //знаходимо помічені бокси
            (t) => t.completed
          );

          checkboxes.map((b) => {
            if (this.checkboxValuesColor.indexOf(b.name.toLowerCase()) < 0) {
              this.checkboxValuesColor.push(b.name.toLowerCase());
            }
          });
          localStorage.setItem(
            'checkboxValuesColor',
            JSON.stringify(this.checkboxValuesColor)
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
    localStorage.removeItem('checkboxValuesColor');
    this.checkboxValuesColor = [];

    this.selectorColor.subselectors!.forEach((t) => (t.completed = false));
    this.toGetCarsChange.emit(t);
  }
}


