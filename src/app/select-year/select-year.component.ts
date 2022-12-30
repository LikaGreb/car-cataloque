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
  selector: 'app-select-year',
  templateUrl: './select-year.component.html',
  styleUrls: ['./select-year.component.scss'],
})
export class SelectYearComponent {
  @Input() clearAllFilters: boolean = false;
  @Input() updateOptions: boolean = false;
  items = Items;
  preselectors: Array<Selector> = [];
  preselectorsYear: Array<Selector> = [];

  selectorYear: Selector = {
    id: 0,
    name: 'Рік випуску',
    completed: false,
    color: 'primary',
    subselectors: [],
  };

  @Output() toGetCarsChange = new EventEmitter<boolean>();

  isDisabled: boolean = false;
  checkboxValuesYear: Array<number> = [];
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
  }
  setSubselectors() {
    this.selectorYear.subselectors = [
      {
        id: 1,
        name: '1990 - 1999',
        completed: false,
        color: 'primary',
        subselectors: [],
      },
      {
        id: 2,
        name: '2000 - 2009',
        completed: false,
        color: 'primary',
        subselectors: [],
      },
      {
        id: 3,
        name: '2010 - 2019',
        completed: false,
        color: 'primary',
        subselectors: [],
      },
      {
        id: 4,
        name: '2020 - 2022',
        completed: false,
        color: 'primary',
        subselectors: [],
      },
    ];
  }
  updateAllComplete(): void {
    this.allComplete =
      this.selectorYear.subselectors != null &&
      this.selectorYear.subselectors.every((t) => t.completed);
  }

  someComplete(): boolean {
    if (this.selectorYear.subselectors == null) {
      return false;
    }

    return (
      this.selectorYear.subselectors.filter((t) => t.completed).length > 0 &&
      !this.allComplete
    );
  }

  filterItems(t: boolean) {
    if (!this.isDisabled) {
      if (this.selectorYear.subselectors !== null) {
        localStorage.removeItem('checkboxValuesYear');
        this.checkboxValuesYear = [];
        if (
          this.selectorYear.subselectors!.filter((t) => t.completed).length > 0
        ) {
          const checkboxes = this.selectorYear.subselectors!.filter(
            //знаходимо помічені бокси
            (t) => t.completed
          );

          checkboxes.map((b) => {
            if (this.checkboxValuesYear.indexOf(b.id) < 0) {
              this.checkboxValuesYear.push(b.id);
            }
          });
          localStorage.setItem(
            'checkboxValuesYear',
            JSON.stringify(this.checkboxValuesYear)
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
    localStorage.removeItem('checkboxValuesYear');
    this.checkboxValuesYear = [];

    this.selectorYear.subselectors!.forEach((t) => (t.completed = false));
    this.toGetCarsChange.emit(t);
  }
}
