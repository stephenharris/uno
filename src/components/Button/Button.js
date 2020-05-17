import React from 'react';
import './Button.css';
import cn from 'classnames';

function Button({children, onClick, large = false, small = false, disabled = false}) {


  return (
    <button type="button" disabled={disabled} onClick={onClick} className={cn({
      'button': true,
      'button--small': small,
      'button--large': large,
    })}>{children}</button>
  );
}

export default Button;