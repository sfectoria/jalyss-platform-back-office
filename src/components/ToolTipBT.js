import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

const TooltipInput = () => {
  useEffect(() => {
    // Initialize the tooltip
    $('[data-toggle="tooltip"]').tooltip();
  }, []);

  return (
    <input
      data-toggle="tooltip"
      data-placement="top"
      title="This is a tooltip text" 
      type="text"
      readOnly
      className="form-control-plaintext"
      id="name"
      defaultValue={
        'lalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalala'
      }
    />
  );
};

export default TooltipInput;
