export class Item {
  id: string = '';
  title: string = '';
  manuf: string = '';
  year: number = 0;
  color: string = '';
  engine_capas: number = 0;
  price: number = 0;
  description: string = '';
}
export const Items: Item[] = [
  {
    id: '1',
    title: 'camry',
    manuf: 'toyota',
    year: 1993,
    color: 'blue',
    engine_capas: 2.2,
    price: 2450,
    description: 'Хорошая Камри , кузов в отличном состоянии , днище как новое , гнили и дырок нету , покрашена ксераликом , двигатель после капитального ремонта , новая голова , работает как часы , автомат работает идеально , подвеска мягкая, салон чистый и ухоженный , все работает',
  },
  {
    id: '2',
    title: 'a4',
    manuf: 'audi',
    year: 2000,
    color: 'white',
    engine_capas: 1.6,
    price: 1500,
    description: 'на ходу Автомобіль після ударної хвилі за місяць до війни була замінена вся ходова, гальмівні диски, колодки, амортизатори Нова віскомуфта , перебраний генератор',
  },
  {
    id: '3',
    title: 'a6',
    manuf: 'audi',
    year: 2022,
    color: 'grey',
    engine_capas: 3,
    price: 6700,
    description:
      'Машина в хорошому стані як по кузову, так і по техніці. Мотор масло не бере, від слова зовсім, ланцюги змінювалися. з паливної форсунки робилися близько 20 тис км тому, а разом з ним і турбіна. По ходовій все добре, нещодавно змінювалися стійки. так само є другий комплект дисків (літній, це +400 $ до вартості машини)',
  },
  {
    id: '4',
    title: 'octavia',
    manuf: 'skoda',
    year: 2009,
    color: 'black',
    engine_capas: 2,
    price: 6500,
    description:
      'Авто в хорошому стані . Економне, комфортне, вмістке , досить динамічне. Ходова , підвіска - замінені , мотор в повному порядку, вся електрика працює',
  },
  {
    id: '5',
    title: 'Lancer',
    manuf: 'Mitsubishi',
    year: 2008,
    color: 'black',
    engine_capas: 1.6,
    price: 6000,
    description:
      'Технічно повністю справна в коробці 23т.км назад поміняно масло з фільтром, важелі, пильовики шрузів, тяжки стабілізаторів, гальмівні диски з колодками',
  },
];
