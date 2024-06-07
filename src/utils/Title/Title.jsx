import React from 'react';

import './Title.scss';



const Title = ({ title, left }) => {
  return (
    <div 
      className='section-title'
      style={{
        flexDirection: left ? 'row' : 'row-reverse',
      }}
    >
      <h1>{ title }<label>.</label></h1>
      <div className='line' />
    </div>
  );
};

export default Title;