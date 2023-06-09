import React from 'react';
import classes from './Lesson_cell_sem.module.css';
const LessonCellSem = (props) => {
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

    let lessonWidth = classes;
    function getSide(){
        if(props.lesson.inter === 7){
            lessonWidth = classes.full;
        }
        else if(props.lesson.inter === 14){
            if(props.lesson.firstWeek%2===0){
                lessonWidth = classes.even;
            }
            else {
                lessonWidth = classes.odd;
            }
        }
        return lessonWidth;
    }

    return (
        <div className={getSide()}>
            <div className={getColor()}>
                <div>
                    <span>{props.lesson.name_subject}</span>
                    <span style={{float:"right", color:"rgba(0,0,0,0.4)"}}>{props.lesson.firstWeek}-{props.lesson.lastWeek}</span>
                </div>
                <div>{props.lesson.name_professor}</div>
                {props.lesson.name_stream ? (
                    <div>{props.lesson.name_stream}</div>
                ) : (
                    <div>{props.lesson.name_group}</div>
                )}
                <div></div>
            </div>
        </div>
    );
};

export default LessonCellSem;