import React from 'react';

const ClickToCopy = ({textToCopy, children, onCopy}) => {

    const ref = React.createRef();

    const copyToClipboard = (event) => {
       event.preventDefault();
       ref.current.select();
       document.execCommand('copy');
       event.target.focus();
       if(onCopy) {
           onCopy();
       }
    }

    return (
    <div style={{"display":"inline"}} onClick={copyToClipboard} >
        {children}
        <textarea
            style={{"width":"1px", "height":"1px", "background":"none", "border":"none",
            "left": "-10px",
            "overflow": "hidden",
            "position": "absolute"}}
            tabIndex="-1"
            ref={ref}
            readonly="readonly"
            defaultValue={textToCopy}
        />
    </div>
  );
};

export default ClickToCopy;
