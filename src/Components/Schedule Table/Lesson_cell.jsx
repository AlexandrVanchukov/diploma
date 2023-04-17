import React from 'react';
import classes from "./Lesson_cell.module.css";
const LessonCell = (props) => {
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


    return (
        <div className={classes.border}>
            <div className={getColor()}>
                <div>{props.lesson.name_subject}</div>
                <div>{props.lesson.name_professor}</div>
                <div>{props.lesson.name_group}</div>
            </div>


        </div>
    );
};

export default LessonCell;