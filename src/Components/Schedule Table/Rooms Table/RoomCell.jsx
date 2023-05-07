import React from 'react';
import classes from "./RoomCell.module.css";

const RoomCell = (props) => {
    function getColor(){
        if(props.whichRoomMode === 0){
            if(props.cell_info){
                if(props.cell_info.some(o => o.num_room === props.room.num_room && o.quantity===16)){
                    return classes.unavailableAllSem;
                }
                else if(props.cell_info.some(o => o.num_room === props.room.num_room)){
                    return classes.unavailable;
                }
                else {
                    return classes.free;
                }
            }
            else {
                return classes.free;
            }
        }
        else {
            if(props.cell_info){
                if(props.cell_info.some(o => o.num_room === props.room.num_room && o.quantity===16)){
                    return classes.invisible;
                }
                else if(props.cell_info.some(o => o.num_room === props.room.num_room)){
                    return classes.invisible;
                }
                else {
                    return classes.free;
                }
            }
            else {
                return classes.free;
            }
        }

    }

    return (
        <span className={classes.room}>
            <span className={getColor()}>
                {props.room.num_room}
            </span>
        </span>
    );
};

export default RoomCell;