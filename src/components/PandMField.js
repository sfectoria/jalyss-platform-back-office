import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PandMField = ({ onItemizedItemEdit, quantity,stockQuantity,id,type }) => {

  
  const triggerChange = (newValue) => {
    const event = { target: { value: parseInt(newValue),name:'quantity',id:id } };
    handleChange(event);
  };

  const handleIncrement = () => {
    console.log(quantity,type);
    if(stockQuantity>quantity||type==='BR'){
    triggerChange(quantity + 1);
  }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      triggerChange(quantity - 1);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value)
     if(stockQuantity>=e.target.value||type==='BR'){
      onItemizedItemEdit(e);
    }
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
