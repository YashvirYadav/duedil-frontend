import React from 'react';
import './marquee.css'; // Import CSS file for styling

const Marquee = () => {
  return (
    <div className="marquee">
      <div className="marquee-content">
        <img src={require('./image/img3.jpeg')} alt="Image 1" />
        <img src={require('./image/img4.jpeg')}alt="Image 2" />
      </div>
    </div>
  );
};

export default Marquee;
