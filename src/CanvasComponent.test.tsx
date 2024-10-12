import { calculatePoints } from './CanvasComponent';

describe('calculatePoints', () => {
  const rect1 = { position: { x: 200, y: 200 }, size: { width: 50, height: 50 } };
  const rect2 = { position: { x: 500, y: 300 }, size: { width: 50, height: 50 } };
  
  it('should calculate correct points between two rectangles', () => {
    const cPoint1 = { point: { x: 200, y: 175 } };
    const cPoint2 = { point: { x: 475, y: 300 } };
    
    const expectedPoints = [
      cPoint1.point,
      { x: 200, y: 155 },
      { x: 225, y: 155 }, 
      { x: 225, y: 300 }, 
      { x: 450, y: 300 }, 
      cPoint2.point,
    ];

    expect(calculatePoints(rect1, rect2, cPoint1, cPoint2)).toEqual(expectedPoints);
  });

  it('should throw an error if connection points are not valid', () => {
    const cPoint1 = { point: { x: 300, y: 300 } }; 
    const cPoint2 = { point: { x: 475, y: 300 } };

    expect(() => calculatePoints(rect1, rect2, cPoint1, cPoint2)).toThrow('Connection point is not on the edge of the rectangle.');
  });
});
