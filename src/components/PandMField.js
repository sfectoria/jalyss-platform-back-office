import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PandMField = ({ onItemizedItemEdit, quantity,id }) => {

  
  const triggerChange = (newValue) => {
    const event = { target: { value: newValue,name:'quantity',id:id } };
    handleChange(event);
  };

  const handleIncrement = () => {
    triggerChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      triggerChange(quantity - 1);
    }
  };

  const handleChange = (e) => {
      onItemizedItemEdit(e);
  };

  return (
    <div className="d-flex input-group border rounded-2" style={{ margin: 'auto' }}>
      <div className="input-group-prepend">
        <button 
          className="btn" 
          type="button" 
          onClick={handleDecrement}
        >
          -
        </button>
      </div>
      <input 
        type="text" 
        className="form-control text-center border-0" 
        id={id}
        name={'quantity'}
        value={quantity} 
        onChange={handleChange}
      />
      <div className="input-group-append">
        <button 
          className="btn" 
          type="button" 
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default PandMField;
