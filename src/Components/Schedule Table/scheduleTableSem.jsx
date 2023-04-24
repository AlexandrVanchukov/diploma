import React, {useEffect} from 'react';
import classes from './scheduleTableSem.module.css';
import LessonCellSem from "./Lesson_cell_sem";

const ScheduleTableSem = (props) => {

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
            <table className={classes}>
                <thead>
                <tr>
                    <th style={{width: "45px"}}></th>
                    <th colSpan={2}>Пн</th>
                    <th colSpan={2}>Вт</th>
                    <th colSpan={2}>Ср</th>
                    <th colSpan={2}>Чт</th>
                    <th colSpan={2}>Пт</th>
                    <th colSpan={2}>Сб</th>
                </tr>
                <tr>
                    <th style={{width: "45px"}}></th>
                    <th>Нечёт</th>
                    <th>Чёт</th>
                    <th>Нечёт</th>
                    <th>Чёт</th>
                    <th>Нечёт</th>
                    <th>Чёт</th>
                    <th>Нечёт</th>
                    <th>Чёт</th>
                    <th>Нечёт</th>
                    <th>Чёт</th>
                    <th>Нечёт</th>
                    <th>Чёт</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>8:20 - 9:50</td>
                    <td colSpan={2}>{cell_info(1,1).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(2,1).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(3,1).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(4,1).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(5,1).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(6,1).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                </tr>
                <tr>
                    <td>10:00 - 11:30</td>
                    <td colSpan={2}>{cell_info(1,2).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(2,2).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(3,2).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(4,2).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(5,2).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(6,2).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                </tr>
                <tr>
                    <td>11:40 - 13:10</td>
                    <td colSpan={2}>{cell_info(1,3).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(2,3).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(3,3).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(4,3).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(5,3).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(6,3).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                </tr>
                <tr>
                    <td>13:30 - 15:00</td>
                    <td colSpan={2}>{cell_info(1,4).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(2,4).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(3,4).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(4,4).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(5,4).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(6,4).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>

                </tr>
                <tr>
                    <td>15:20 - 16:50</td>
                    <td colSpan={2}>{cell_info(1,5).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(2,5).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(3,5).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(4,5).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(5,5).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(6,5).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                </tr>
                <tr>
                    <td>17:00 - 18:30</td>
                    <td colSpan={2}>{cell_info(1,6).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(2,6).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(3,6).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(4,6).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(5,6).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(6,6).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>

                </tr>
                <tr>
                    <td>18:40 - 20:10</td>
                    <td colSpan={2}>{cell_info(1,7).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(2,7).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(3,7).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(4,7).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(5,7).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(6,7).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                </tr>
                <tr>
                    <td>20:20 - 21:50</td>
                    <td colSpan={2}>{cell_info(1,8).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(2,8).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(3,8).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(4,8).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(5,8).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                    <td colSpan={2}>{cell_info(6,8).map((l,index) => <LessonCellSem lesson={l} key={index}/>)}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleTableSem;