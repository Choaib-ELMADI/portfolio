import React from "react";
import anime from "animejs";

import './Dots.scss';



const Dots = () => {
  const GRID_WIDTH = 20;
  const GRID_DOTS = 280;

  const handleDotClick = (e) => {
    anime({
      targets: ".dot-point",
      scale: [
        { value: 1.35, easing: "easeOutSine", duration: 250 },
        { value: 1, easing: "easeInOutQuad", duration: 500 },
      ],
      translateY: [
        { value: -15, easing: "easeOutSine", duration: 250 },
        { value: 1, easing: "easeInOutQuad", duration: 500 },
      ],
      opacity: [
        { value: 0.9, easing: "easeOutSine", duration: 250 },
        { value: 0.35, easing: "easeInOutQuad", duration: 500 },
      ],
      delay: anime.stagger(100, {
        grid: [GRID_WIDTH, GRID_DOTS / GRID_WIDTH],
        from: e.target.dataset.index,
      }),
    });
  };

  return (
    <div 
      className='dot-grid'
      style={{ 
        gridTemplateColumns: `repeat(${ GRID_WIDTH }, 1fr)` 
      }}
    >
      {
        [...Array(GRID_DOTS)].map((r, i) => (
          <div
            className='dot-wrapper'
            data-index={ i }
            key={` dot-wrapper-${ i } `}
            onClick={ handleDotClick }
          >
            <div className='dot dot-point' data-index={ i } />
          </div>
        ))
      }
    </div>
  );
};
export default Dots;