import React from 'react';
import './TextInput.css';

function TextInput({type ='text', label, value, onChange}) {


  return (
    <label className="textInput">
        <strong className="textInput__label">{label}</strong>
        <input className="textInput__field" type={type} value={value} onChange={onChange} />
    </label>
  );
}

export default TextInput;