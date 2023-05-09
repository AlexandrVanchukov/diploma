import React, {useState} from 'react';
import classes from "./Lesson_cell.module.css";
import ScheduleTableSem from "./scheduleTableSem";
import ScheduleTable from "./scheduleTable";
const LessonCell = (props) => {
    let lessonColor = classes;

    function getColor(){
        if(props.selected === props.lesson){
            lessonColor = classes.selected;
        }
        else {
            if (props.lesson.type === "Лекция")
                lessonColor = classes.green;
            else if (props.lesson.type === "Лабораторная")
                lessonColor = classes.yellow;
            else
                lessonColor = classes.orange;
        }

        return lessonColor;
    }

    return (
        <div className={classes.cell} onClick={() => {
            props.onClick(props.lesson)
        }}>
            <div className={getColor()}>
                <div>{props.lesson.name_subject}</div>
                <div>{props.lesson.name_professor}</div>
                {props.lesson.name_stream ? (
                    <div>{props.lesson.name_stream}</div>
                ) : (
                    <div>{props.lesson.name_group}</div>
                )}

            </div>
        </div>
    );
};

export default LessonCell;