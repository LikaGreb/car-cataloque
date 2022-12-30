import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Items } from '../cars/cars';

export interface Selector {
  id: number;
  name: string;
  completed: boolean;
  color: ThemePalette;
  subselectors?: Selector[];
}
@Component({
  selector: 'app-select-capacity',
  templateUrl: './select-capacity.component.html',
  styleUrls: ['./select-capacity.component.scss'],
})
export class SelectCapacityComponent {
  @Input() clearAllFilters: boolean = false;
  @Input() updateOptions: boolean = false;
  items = Items;
  preselectors: Array<Selector> = [];
  preselectorsCap: Array<Selector> = [];

  selectorCap: Selector = {
    id: 0,
    name: "Об'єм двигуна",
    completed: false,
    color: 'primary',
    subselectors: [],
  };

  @Output() toGetCarsChange = new EventEmitter<boolean>();

  isDisabled: boolean = false;
  checkboxValuesCap: Array<number> = [];
  allComplete: boolean = false;

  constructor() {
    this.setSubselectors();
  }

  ngDoCheck() {
    if (this.updateOptions === true) {
      //console.log(this.updateOptions, 'updateOptions is true');
      this.setSubselectors();
      this.updateOptions = false;
    }
    if (this.clearAllFilters === true) {
      this.noFilter(true);
    }
    this.updateOptions = false;
    //console.log(this.updateOptions, 'this.updateOptions');
    //this.filterItems(false);
  }
  setSubselectors() {
    this.selectorCap.subselectors = [
      {
        id: 1,
        name: 'до 2',
        completed: false,
        color: 'primary',
        subselectors: [],
      },
      {
        id: 2,
        name: '2 до 2,5',
        completed: false,
        color: 'primary',
        subselectors: [],
      },
      {
        id: 3,
        name: '2,5 до 3',
        completed: false,
        color: 'primary',
        subselectors: [],
      },
      {
        id: 4,
        name: '3 i більше',
        completed: false,
        color: 'primary',
        subselectors: [],
      },
    ];
  }
  updateAllComplete(): void {
    this.allComplete =
      this.selectorCap.subselectors != null &&
      this.selectorCap.subselectors.every((t) => t.completed);
  }

  someComplete(): boolean {
    if (this.selectorCap.subselectors == null) {
      return false;
    }

    return (
      this.selectorCap.subselectors.filter((t) => t.completed).length > 0 &&
      !this.allComplete
    );
  }

  filterItems(t: boolean) {
    if (!this.isDisabled) {
      if (this.selectorCap.subselectors !== null) {
        localStorage.removeItem('checkboxValuesCap');
        this.checkboxValuesCap = [];
        if (
          this.selectorCap.subselectors!.filter((t) => t.completed).length > 0
        ) {
          const checkboxes = this.selectorCap.subselectors!.filter(
            //знаходимо помічені бокси
            (t) => t.completed
          );

          checkboxes.map((b) => {
            if (this.checkboxValuesCap.indexOf(b.id) < 0) {
              this.checkboxValuesCap.push(b.id);
            }
          });
          localStorage.setItem(
            'checkboxValuesCap',
            JSON.stringify(this.checkboxValuesCap)
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
    localStorage.removeItem('checkboxValuesCap');
    this.checkboxValuesCap = [];

    this.selectorCap.subselectors!.forEach((t) => (t.completed = false));
    this.toGetCarsChange.emit(t);
  }
}
