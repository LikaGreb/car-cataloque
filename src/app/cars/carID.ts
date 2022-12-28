export class Counter {
  chars: string =
    '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  countLength: number = 12;
  count: string = '';
  static count: string;
  getCounter() {
    for (let i = 0; i <= this.countLength; i++) {
      const randomNumber = Math.floor(Math.random() * this.chars.length);
      this.count += this.chars.substring(randomNumber, randomNumber + 1);
    }
    return this.count;
  }
}
