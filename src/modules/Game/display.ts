export function display (ctx: CanvasRenderingContext2D): void {
  ctx.moveTo(18, 18 + 148);
  ctx.lineTo(480 - 18, 18 + 148);
  ctx.stroke()

  ctx.moveTo(18, 18 + (148 * 2));
  ctx.lineTo(480 - 18, 18 + (148 * 2));
  ctx.stroke()

  ctx.moveTo(18 + 148, 18);
  ctx.lineTo(18 + 148, 480 - 18);
  ctx.stroke()

  ctx.moveTo(18 + (148 * 2), 18);
  ctx.lineTo(18 + (148 * 2), 480 - 18);
  ctx.stroke()
}

// padding 18
// 148