import React from 'react';
import classes from './Input.module.css';
const Input = React.forwardRef((props,ref) => {
    return (
        <div>
            <input ref={ref} className={classes.myInput} {...props}/>
        </div>
    );
});

export default Input;