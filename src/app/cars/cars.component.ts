import { Component, Input } from '@angular/core';
//import { cars } from './cars.list';

export type Item = {
  title: string;
  manuf:string;
  year:number;
  color:string;
  engine_opas:number;
  price:number;
  description: string;
};


@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent {
  items=[{
    title: "camry",
    manuf:"toyota",
    year:1993,
    color:"red",
    engine_opas:2,
    price:5000,
    description: "some text1"
  },
  {
    title: "a4",
    manuf:"audi",
    year:2000,
    color:"white",
    engine_opas:2.5,
    price:6000,
    description: "some text2"
  }

  ]
  
  constructor() {
  }

  getCars() {
    console.log(this.items)
}
}
