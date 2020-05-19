import React, {useState, useEffect} from 'react';
import './Toaster.css';
import cn from 'classnames';

function Toaster({children}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(false);
        setTimeout(() => setVisible(true), 200)
        setTimeout(() => setVisible(false), 3000)
        //setVisible(true);
    }, [children])

  return (
    <div className={cn("toaster", {"toaster--visible": visible})}>
        {children}
    </div>
  );
}


export default Toaster;