export class Item {
  title: string = '';
  manuf: string = '';
  year: number = 0;
  color: string = '';
  engine_opas: number = 0;
  price: number = 0;
  description: string = '';
}
export const Items: Item[] = [
  {
    title: 'camry',
    manuf: 'toyota',
    year: 1993,
    color: 'red',
    engine_opas: 2,
    price: 5000,
    description: 'some text1',
  },
  {
    title: 'a4',
    manuf: 'audi',
    year: 2000,
    color: 'white',
    engine_opas: 2.5,
    price: 6000,
    description: 'some text2',
  },
  {
    title: 'a6',
    manuf: 'audi',
    year: 2022,
    color: 'grey',
    engine_opas: 3,
    price: 6700,
    description:
      'Машина в хорошому стані як по кузову, так і по техніці. Мотор масло не бере, від слова зовсім, ланцюги змінювалися. з паливної форсунки робилися близько 20 тис км тому, а разом з ним і турбіна. По ходовій все добре, нещодавно змінювалися стійки. так само є другий комплект дисків (літній, це +400 $ до вартості машини)',
  },
  {
    title: 'octavia',
    manuf: 'skoda',
    year: 2009,
    color: 'black',
    engine_opas: 2,
    price: 6500,
    description:
      'Авто в хорошому стані . Економне, комфортне, вмістке , досить динамічне. Ходова , підвіска - замінені , мотор в повному порядку, вся електрика працює',
  },
  {
    title: 'Lancer',
    manuf: 'Mitsubishi',
    year: 2008,
    color: 'black',
    engine_opas: 1.6,
    price: 6000,
    description:
      'Технічно повністю справна в коробці 23т.км назад поміняно масло з фільтром, важелі, пильовики шрузів, тяжки стабілізаторів, гальмівні диски з колодками',
  },
];
