import React from 'react';
import CanvasComponent from './CanvasComponent';

const App: React.FC = () => {
  const rectSize = { width: 50, height: 50 };

  const rect1 = {
    position: { x: 200, y: 200 },
    size: rectSize,
  };

  const rect2 = {
    position: { x: 500, y: 300 },
    size: rectSize,
  };

  const cPoint1 = {
    point: { x: 200, y: 175 }, 
  };

  const cPoint2 = {
    point: { x: 475, y: 300 }, 
  };

  return (
    <div>
      <CanvasComponent rect1={rect1} rect2={rect2} cPoint1={cPoint1} cPoint2={cPoint2} />
    </div>
  );
};

export default App;