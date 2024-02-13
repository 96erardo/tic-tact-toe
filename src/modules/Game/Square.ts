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
  passed: number;

  constructor (
    x: number, 
    y: number, 
    status: SquareStatus = 'blank', 
    value: SquareValue = '',
    passed: number = 0,
  ) {
    this.x = x;
    this.y = y;
    this.status = status;
    this.value = value;
    this.passed = passed;
  }

  update (dt: number, state: State, keys: Set<string>, pointer: Pointer): Square {
    if (
      pointer.clicked() &&
      state.status === 'playing' &&
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
      return new Square(this.x, this.y, 'painting', state.turn);
    }

    if (
      this.status === 'painting'
    ) {
      let passed = Math.min(0.5, this.passed + dt);

      return new Square(
        this.x, 
        this.y, 
        passed === 0.5 ? 'filled' : 'painting',
        this.value,
        passed
      )
    }

    return this;
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(244, 43, 6, 0.3)';
    ctx.strokeStyle = 'rgba(244, 43, 6, 1)';

    if (this.status !== 'blank') {
      ctx.beginPath();
      ctx.lineWidth = 5;
      
      if (this.value === 'x') {
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'black';

        let progress = Math.min(0.25, this.passed) / 0.25;
        let padding = 5 * progress;
        let line = COLLISION_SQUARE_SIZE * progress;
        ctx.moveTo(this.x + 5, this.y + 5);
        ctx.lineTo(this.x + line - padding, this.y + line - padding)

        if (this.passed >= 0.25) {
          progress = Math.max(this.passed - 0.25, 0) / 0.25;
          padding = 5 * progress;
          line = COLLISION_SQUARE_SIZE * progress;
          
          ctx.moveTo(this.x + COLLISION_SQUARE_SIZE - 5, this.y + 5);
          ctx.lineTo(this.x + (COLLISION_SQUARE_SIZE - line) + padding, this.y + line - padding);
        }
        
        ctx.stroke();
      
      } else {
        ctx.lineWidth = 5;
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'black';

        const progress = this.passed / 0.5
        
        ctx.ellipse(
          this.x + (COLLISION_SQUARE_SIZE / 2), 
          this.y + (COLLISION_SQUARE_SIZE / 2),
          COLLISION_SQUARE_SIZE / 2,
          COLLISION_SQUARE_SIZE / 2,
          - 0.5 * Math.PI,
          0, 
          (Math.PI * 2) * progress
        );

        ctx.stroke();
      } 
    }
  }
}

export type SquareStatus = 'blank' | 'painting' | 'filled'

export type SquareValue = '' | 'x' | 'o'