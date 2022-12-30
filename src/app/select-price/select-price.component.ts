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
  selector: 'app-select-price',
  templateUrl: './select-price.component.html',
  styleUrls: ['./select-price.component.scss'],
})
export class SelectPriceComponent {
  @Input() clearAllFilters: boolean = false;
  @Input() updateOptions: boolean = false;
  items = Items;
  preselectors: Array<Selector> = [];
  preselectorsPrice: Array<Selector> = [];

  selectorPrice: Selector = {
    id: 0,
    name: 'Ціна',
    completed: false,
    color: 'primary',
    subselectors: [],
  };

  @Output() toGetCarsChange = new EventEmitter<boolean>();

  isDisabled: boolean = false;
  checkboxValuesPrice: Array<number> = [];
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
    this.selectorPrice.subselectors = [
      {
        id: 1,
        name: 'до 2000',
        completed: false,
        color: 'primary',
        subselectors: [],
      },
      {
        id: 2,
        name: '2000 до 4000',
        completed: false,
        color: 'primary',
        subselectors: [],
      },
      {
        id: 3,
        name: '4000 до 6000',
        completed: false,
        color: 'primary',
        subselectors: [],
      },
      {
        id: 4,
        name: '6000 і більше',
        completed: false,
        color: 'primary',
        subselectors: [],
      },
    ];
  }
  updateAllComplete(): void {
    this.allComplete =
      this.selectorPrice.subselectors != null &&
      this.selectorPrice.subselectors.every((t) => t.completed);
  }

  someComplete(): boolean {
    if (this.selectorPrice.subselectors == null) {
      return false;
    }

    return (
      this.selectorPrice.subselectors.filter((t) => t.completed).length > 0 &&
      !this.allComplete
    );
  }

  filterItems(t: boolean) {
    if (!this.isDisabled) {
      if (this.selectorPrice.subselectors !== null) {
        localStorage.removeItem('checkboxValuesPrice');
        this.checkboxValuesPrice = [];
        if (
          this.selectorPrice.subselectors!.filter((t) => t.completed).length > 0
        ) {
          const checkboxes = this.selectorPrice.subselectors!.filter(
            //знаходимо помічені бокси
            (t) => t.completed
          );

          checkboxes.map((b) => {
            if (this.checkboxValuesPrice.indexOf(b.id) < 0) {
              this.checkboxValuesPrice.push(b.id);
            }
          });
          localStorage.setItem(
            'checkboxValuesPrice',
            JSON.stringify(this.checkboxValuesPrice)
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
    localStorage.removeItem('checkboxValuesPrice');
    this.checkboxValuesPrice = [];

    this.selectorPrice.subselectors!.forEach((t) => (t.completed = false));
    this.toGetCarsChange.emit(t);
  }
}
