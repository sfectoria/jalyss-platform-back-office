import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PandMField = ({ onItemizedItemEdit, quantity,id }) => {
  const [value, setValue] = useState(quantity);
// s
  const triggerChange = (newValue) => {
    setValue(newValue);
    const event = { target: { value: newValue,name:'quantity',id:id } };
    console.log(event.target.name);
    handleChange(event);
  };

  const handleIncrement = () => {
    triggerChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > 1) {
      triggerChange(value - 1);
    }
  };

  const handleChange = (e) => {
    setValue(Number(e.target.value));
    console.log(e.target.value);
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
        value={value} 
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
