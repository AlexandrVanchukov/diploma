import React from 'react';
import classes from "../Edit/Edit.module.css";

const GroupsAvailable = (props) => {
    return (
        <div>
            <div className={classes.container}>
                {props.menu}
            </div>
        </div>
    );
};

export default GroupsAvailable;