import React, {useEffect} from 'react';
import classes from './ScheduleTable.module.css';
import {renderToStaticMarkup} from "react-dom/server";
import LessonCell from "./Lesson_cell";

const ScheduleTable = (props) => {
    const [l,SetL] = ([]);
    function cell_info(day, num_l){
        let result = [];
        for (let i= 0; i < props.lessons.length; i++){
            if (props.lessons[i].dayofweek-1 === day && props.lessons[i].num_lesson === num_l)
            {
                if(result.some(o => o.id_lesson === props.lessons[i].id_lesson)){
                    const lesson = result.find(lesson => lesson.id_lesson === props.lessons[i].id_lesson)
                    result.pop();
                    if (lesson.name_group.includes(props.lessons[i].name_group)){
                        result.push(lesson);
                    }
                    else {
                        lesson.name_group = lesson.name_group + "," + props.lessons[i].name_group;
                        result.push(lesson);
                    }
                }
                else {
                    result.push(props.lessons[i]);
                }
            }
        }
        return result;
    }
    return (
        <div>
            <table className={classes.schedule}>
                <thead>
                <tr>
                    <th style={{width: "50px"}}></th>
                    <th>Пн</th>
                    <th>Вт</th>
                    <th>Ср</th>
                    <th>Чт</th>
                    <th>Пт</th>
                    <th>Сб</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Row 1, Column 1</td>
                    <td>Row 1, Column 1</td>
                    <td>Row 1, Column 2</td>
                    <td>Row 1, Column 3</td>
                    <td>Row 1, Column 4</td>
                    <td>Row 1, Column 5</td>
                    <td>Row 1, Column 6</td>
                </tr>
                <tr>
                    <td>Row 1, Column 1</td>
                    <td>Row 2, Column 1</td>
                    <td>Row 2, Column 2</td>
                    <td>Row 2, Column 3</td>
                    <td>Row 2, Column 4
                        {cell_info(4,2).map((l,index) =>
                            <LessonCell lesson={l} key={index}/>
                        )}</td>
                    <td>Row 2, Column 5
                        {cell_info(5,2).map((l,index) =>
                            <LessonCell lesson={l} key={index}/>
                        )}</td>
                    <td>Row 2, Column 6</td>
                </tr>
                <tr>
                    <td>Row 1, Column 1</td>
                    <td>Row 3, Column 1</td>
                    <td>Row 3, Column 2</td>
                    <td>Row 3, Column 3</td>
                    <td>Row 3, Column 4</td>
                    <td>Row 3, Column 5</td>
                    <td>Row 3, Column 6</td>
                </tr>
                <tr>
                    <td>Row 1, Column 1</td>
                    <td>Row 4, Column 1</td>
                    <td>Row 4, Column 2</td>
                    <td>Row 4, Column 3</td>
                    <td>Row 4, Column 4</td>
                    <td>Row 4, Column 5</td>
                    <td>Row 4, Column 6</td>
                </tr>
                <tr>
                    <td>Row 1, Column 1</td>
                    <td>Row 5, Column 1</td>
                    <td>Row 5, Column 2
                    </td>
                    <td>Row 5, Column 3</td>
                    <td>Row 5, Column 4</td>
                    <td>Row 5, Column 5</td>
                    <td>Row 5, Column 6</td>
                </tr>
                <tr>
                    <td>Row 1, Column 1</td>
                    <td>Row 6, Column 1</td>
                    <td>Row 6, Column 2
                        </td>
                    <td>Row 6, Column 3</td>
                    <td>Row 6, Column 4
                        {cell_info(4,6).map((l,index) =>
                            <LessonCell lesson={l} key={index}/>
                        )}</td>
                    <td>Row 6, Column 5
                        </td>
                    <td>Row 6, Column 6</td>
                </tr>
                <tr>
                    <td>Row 1, Column 1</td>
                    <td>Row 7, Column 1</td>
                    <td>Row 7, Column 2</td>
                    <td>Row 7, Column 3</td>
                    <td>Row 7, Column 4
                        {cell_info(4,7).map((l,index) =>
                            <LessonCell lesson={l} key={index}/>
                        )}</td>
                    <td>Row 7, Column 5
                        {cell_info(5,7).map((l,index) =>
                            <LessonCell lesson={l} key={index}/>
                        )}</td>
                    <td>Row 7, Column 6</td>
                </tr>
                <tr>
                    <td>Row 1, Column 1</td>
                    <td>Row 8, Column 1</td>
                    <td>Row 8, Column 2</td>
                    <td>Row 8, Column 3</td>
                    <td>Row 8, Column 4</td>
                    <td>Row 8, Column 5</td>
                    <td>Row 8, Column 6</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleTable;