export class Pointer {
  x: number | null;
  y: number | null;

  constructor () {
    this.x = null;
    this.y = null;
  }

  set (x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  clean () {
    this.x = null;
    this.x = null;
  }

  clicked () {
    return this.x !== null && this.y !== null
  }
}