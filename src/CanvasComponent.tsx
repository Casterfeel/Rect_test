import React from 'react';

type Point = {
  x: number;
  y: number;
}

type Size = {
  width: number;
  height: number;
};


type Rect = {
  position: Point;
  size: { width: number; height: number };
}

type ConnectionPoint = {
  point: Point;
}

const validateConnectionPoint = (point: Point, rect: Rect): void => {
  const { position, size } = rect;
  const bounds = {
    left: position.x - size.width / 2,
    right: position.x + size.width / 2,
    top: position.y - size.height / 2,
    bottom: position.y + size.height / 2,
  };

  const onLeftEdge = point.x >= bounds.left - 5 && point.x <= bounds.left + 5 && point.y >= bounds.top && point.y <= bounds.bottom;
  const onRightEdge = point.x >= bounds.right - 5 && point.x <= bounds.right + 5 && point.y >= bounds.top && point.y <= bounds.bottom;
  const onTopEdge = point.y >= bounds.top - 5 && point.y <= bounds.top + 5 && point.x >= bounds.left && point.x <= bounds.right;
  const onBottomEdge = point.y >= bounds.bottom - 5 && point.y <= bounds.bottom + 5 && point.x >= bounds.left && point.x <= bounds.right;

  if (!onLeftEdge && !onRightEdge && !onTopEdge && !onBottomEdge) {
    throw new Error('Connection point is not on the edge of the rectangle.');
  }
};

export const calculatePoints = (rect1: Rect, rect2: Rect, cPoint1: ConnectionPoint, cPoint2: ConnectionPoint): Point[] => {
  validateConnectionPoint(cPoint1.point, rect1);
  validateConnectionPoint(cPoint2.point, rect2);

  const { position: pos1, size: size1 } = rect1;
  const { position: pos2, size: size2 } = rect2;

  const rect1Bounds = {
    left: pos1.x - size1.width / 2,
    right: pos1.x + size1.width / 2,
    top: pos1.y - size1.height / 2,
    bottom: pos1.y + size1.height / 2,
  };

  const rect2Bounds = {
    left: pos2.x - size2.width / 2,
    right: pos2.x + size2.width / 2,
    top: pos2.y - size2.height / 2,
    bottom: pos2.y + size2.height / 2,
  };

  const avoidanceOffset = 20;
  const midY2 = (rect2Bounds.top + rect2Bounds.bottom) / 2;

  return [
    cPoint1.point, 
    { x: cPoint1.point.x, y: rect1Bounds.top - avoidanceOffset }, 
    { x: rect1Bounds.right + avoidanceOffset, y: rect1Bounds.top - avoidanceOffset }, 
    { x: rect1Bounds.right + avoidanceOffset, y: midY2 }, 
    { x: rect2Bounds.left - avoidanceOffset, y: midY2 }, 
    cPoint2.point, 
  ];
};

const drawLine = (ctx: CanvasRenderingContext2D, points: Point[]) => {
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.forEach(point => {
    ctx.lineTo(point.x, point.y);
  });
  ctx.strokeStyle = 'blue';
  ctx.stroke();
};

const drawRect = (ctx: CanvasRenderingContext2D, rect: Rect) => {
  ctx.fillStyle = 'lightgrey';
  const { position, size } = rect;
  ctx.fillRect(position.x - size.width / 2, position.y - size.height / 2, size.width, size.height);
};

const CanvasComponent: React.FC<{ rect1: Rect; rect2: Rect; cPoint1: ConnectionPoint; cPoint2: ConnectionPoint }> = ({
  rect1,
  rect2,
  cPoint1,
  cPoint2,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawRect(ctx, rect1);
        drawRect(ctx, rect2);

        const points = calculatePoints(rect1, rect2, cPoint1, cPoint2);
        drawLine(ctx, points);
      }
    }
  }, [rect1, rect2, cPoint1, cPoint2]);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

export default CanvasComponent;
