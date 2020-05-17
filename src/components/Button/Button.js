import React from 'react';
import classNames from '../../class-names';
import './Button.css';

function Button({children, onClick, large = false, small = false, disabled = false}) {


  return (
    <button type="button" disabled={disabled} onClick={onClick} className={classNames({
      'button': true,
      'button--small': small,
      'button--large': large,
    })}>{children}</button>
  );
}

export default Button;