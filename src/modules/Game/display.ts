import { GAME_SIZE } from '@/shared/constants'
import { State } from './state';
import { 
  PADDING,
  SQUARE_SIZE,
} from './contants';

export function display (ctx: CanvasRenderingContext2D, state: State): void {
  ctx.clearRect(0, 0, GAME_SIZE, GAME_SIZE);
  
  ctx.lineWidth = 2;
  ctx.fillStyle = 'black';
  ctx.strokeStyle = 'black';

  ctx.moveTo(PADDING, PADDING + SQUARE_SIZE);
  ctx.lineTo(GAME_SIZE - PADDING, PADDING + SQUARE_SIZE);
  ctx.stroke()

  ctx.moveTo(PADDING, PADDING + (SQUARE_SIZE * 2));
  ctx.lineTo(GAME_SIZE - PADDING, PADDING + (SQUARE_SIZE * 2));
  ctx.stroke()

  ctx.moveTo(PADDING + SQUARE_SIZE, PADDING);
  ctx.lineTo(PADDING + SQUARE_SIZE, GAME_SIZE - PADDING);
  ctx.stroke()

  ctx.moveTo(PADDING + (SQUARE_SIZE * 2), PADDING);
  ctx.lineTo(PADDING + (SQUARE_SIZE * 2), GAME_SIZE - PADDING);
  ctx.stroke()

  state.squares.forEach(square => square.draw(ctx))
}