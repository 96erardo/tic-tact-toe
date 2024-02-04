import { State } from './state';
import { Pointer } from '@/shared/types/Pointer';
import { 
  COLLISION_SQUARE_SIZE,
} from './contants';
import { pointRectCollision } from '@/shared/utils/collision';

export class Square {
  x: number;
  y: number;
  status: 'blank' | 'painting' | 'filled'
  value: '' | 'x' | 'o';

  constructor (
    x: number, 
    y: number, 
    status: SquareStatus = 'blank', 
    value: SquareValue = ''
  ) {
    this.x = x;
    this.y = y;
    this.status = status;
    this.value = value;
  }

  update (dt: number, state: State, keys: Set<string>, pointer: Pointer): Square {
    if (
      pointer.clicked() &&
      this.value === '' &&
      pointRectCollision(
        pointer.x,
        pointer.y,
        this.x,
        this.y,
        COLLISION_SQUARE_SIZE,
        COLLISION_SQUARE_SIZE
      )
    ) {
      return new Square(this.x, this.y, 'filled', state.turn);
    }

    return this;
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(244, 43, 6, 0.3)';
    ctx.strokeStyle = 'rgba(244, 43, 6, 1)';

    ctx.fillRect(this.x, this.y, COLLISION_SQUARE_SIZE, COLLISION_SQUARE_SIZE);
    ctx.strokeRect(this.x, this.y, COLLISION_SQUARE_SIZE, COLLISION_SQUARE_SIZE);

    if (this.status === 'filled') {
      ctx.beginPath()
      ctx.lineWidth = 5;
      
      if (this.value === 'x') {
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'black';
        ctx.moveTo(this.x + 5, this.y + 5);
        ctx.lineTo(this.x + COLLISION_SQUARE_SIZE - 5, this.y + COLLISION_SQUARE_SIZE - 5)

        ctx.moveTo(this.x + COLLISION_SQUARE_SIZE - 5, this.y + 5);
        ctx.lineTo(this.x + 5, this.y + COLLISION_SQUARE_SIZE - 5);
        ctx.stroke();
      
      } else {
        ctx.lineWidth = 5;
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'black';
        
        ctx.ellipse(
          this.x + (COLLISION_SQUARE_SIZE / 2), 
          this.y + (COLLISION_SQUARE_SIZE / 2),
          COLLISION_SQUARE_SIZE / 2,
          COLLISION_SQUARE_SIZE / 2,
          0,
          0, 
          360
        );

        ctx.stroke();
      } 
    }
  }
}

export type SquareStatus = 'blank' | 'painting' | 'filled'

export type SquareValue = '' | 'x' | 'o'