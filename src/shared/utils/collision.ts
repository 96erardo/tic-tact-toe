export function pointRectCollision (
    x: number,
    y: number,
    rectX: number,
    rectY: number,
    rectWidth: number,
    rectHeight: number
) {
    // We check if the point is inside the rectangle
    return (
        x >= rectX && 
        x <= (rectX + rectWidth) && 
        y >= rectY && 
        y <= (rectY + rectHeight)
    );
}