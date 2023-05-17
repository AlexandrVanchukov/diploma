import React from 'react';
import classes from "./TableSemCell.module.css";

const TableSemCell = (props) => {
    let lessonColor = classes;
    function getColor(){
        if (props.lesson.type === "Лекция")
            lessonColor = classes.green;
        else if (props.lesson.type === "Лабораторная")
            lessonColor = classes.yellow;
        else
            lessonColor = classes.orange;
        return lessonColor;
    }

    let lessonWidth = "none";
    function getSide(){
        if(props.lesson.inter === 7){
            lessonWidth = "7";
        }
        else {
            lessonWidth = "14";
        }
        return lessonWidth;
    }

    return (
        <div style={{width:"100%"}}>
            <div className={getColor()}>
                <div>
                    <span>{props.lesson.name_subject}</span>
                    <span style={{float:"right", color:"rgba(0,0,0,0.4)"}}>{props.lesson.firstWeek}-{props.lesson.lastWeek}</span>
                </div>
                <div>{props.lesson.name_professor}</div>
                {props.lesson.name_stream ? (
                    <div>{props.lesson.name_stream} <span style={{float:"right", color:"rgba(0,0,0,0.4)"}}>inter:{getSide()}</span></div>
                ) : (
                    <div>{props.lesson.name_group} <span style={{float:"right", color:"rgba(0,0,0,0.4)"}}>inter:{getSide()}</span></div>
                )}
                <div></div>
            </div>
        </div>
    );
};

export default TableSemCell;