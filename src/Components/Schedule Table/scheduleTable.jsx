import React, {useEffect, useState} from 'react';
import classes from './ScheduleTable.module.css';
import {renderToStaticMarkup} from "react-dom/server";
import LessonCell from "./Lesson_cell";

const ScheduleTable = (props) => {

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

    function create_lesson(day,num_l){
        let xhr = new XMLHttpRequest();
        xhr.open("POST","https://sql.lavro.ru/call.php");
        let fd = new FormData();
        fd.append("pname","create_lesson");
        fd.append("db","284192");
        fd.append("p1",props.version.id_version);
        fd.append("p2",'24041');
        fd.append("p3",num_l);
        fd.append("p4",'15');
        fd.append("p5",'129889');
        fd.append("p6",'7');
        fd.append("p7",formatDateFul(new Date(date.addDays(day-1))));
        fd.append("p8","1");
        fd.append("p9",'P33682,P33702');
        fd.append("format","rows");
        xhr.onload = create_lesson_temp;
        xhr.send(fd);
    }

    function create_lesson_temp(e){
        if (e.target.status === 200){
            let resp = JSON.parse(e.target.response);
            console.log(resp.RESULTS);
            if(!resp.RESULTS){
                alert("Произошла ошибка при обращении к базе данных");
            }
            else{
                if(resp.RESULTS[0].length === 0){
                    alert("Занятий нет!");
                }
                else {
                    if(resp.RESULTS[0][0].error){
                            alert(resp.RESULTS[0][0].rus_error);
                    }
                    else {
                        alert("Занятие успешно создано!")
                    }

                }

            }

        }
        else {
            alert("Ошибка сети. Проверьте интернет соединение") ;
        }
    }

    const handleRowClick = (day,num_l) => {
        if(props.isCreateMode){
            create_lesson(day,num_l);
        }
        else {

        }
    };

    function formatDateFul(date) {
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return yy + '-' + mm + '-' + dd;
    }

    function formatDateDay(date) {
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        return dd;
    }

    const [year, month, day] = props.monday.split('-');
    const date = new Date(year, month - 1, day);
    return (
        <div>
            <table className={classes.scroll}>
                <thead>
                <tr>
                    <th style={{width: "50px"}}></th>
                    <th>{formatDateDay(new Date(date))} Пн</th>
                    <th>{formatDateDay(new Date(date.addDays(1)))} Вт</th>
                    <th>{formatDateDay(new Date(date.addDays(2)))} Ср</th>
                    <th>{formatDateDay(new Date(date.addDays(3)))} Чт</th>
                    <th>{formatDateDay(new Date(date.addDays(4)))} Пт</th>
                    <th>{formatDateDay(new Date(date.addDays(5)))} Сб</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>8:20 - 9:50</td>
                    <td onClick={() => handleRowClick(1,1)}>{cell_info(1,1).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(2,1)}>{cell_info(2,1).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(3,1)}>{cell_info(3,1).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(4,1)}>{cell_info(4,1).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(5,1)}>{cell_info(5,1).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(6,1)}>{cell_info(6,1).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                </tr>
                <tr>
                    <td>10:00 - 11:30</td>
                    <td onClick={() => handleRowClick(1,2)}>{cell_info(1,2).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(2,2)}>{cell_info(2,2).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(3,2)}>{cell_info(3,2).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(4,2)}>{cell_info(4,2).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(5,2)}>{cell_info(5,2).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(6,2)}>{cell_info(6,2).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                </tr>
                <tr>
                    <td>11:40 - 13:10</td>
                    <td onClick={() => handleRowClick(1,3)}>{cell_info(1,3).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(2,3)}>{cell_info(2,3).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(3,3)}>{cell_info(3,3).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(4,3)}>{cell_info(4,3).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(5,3)}>{cell_info(5,3).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(6,3)}>{cell_info(6,3).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                </tr>
                <tr>
                    <td>13:30 - 15:00</td>
                    <td onClick={() => handleRowClick(1,4)}>{cell_info(1,4).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(2,4)}>{cell_info(2,4).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(3,4)}>{cell_info(3,4).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(4,4)}>{cell_info(4,4).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(5,4)}>{cell_info(5,4).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(6,4)}>{cell_info(6,4).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>

                </tr>
                <tr>
                    <td>15:20 - 16:50</td>
                    <td onClick={() => handleRowClick(1,5)}>{cell_info(1,5).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(2,5)}>{cell_info(2,5).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(3,5)}>{cell_info(3,5).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(4,5)}>{cell_info(4,5).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(5,5)}>{cell_info(5,5).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(6,5)}>{cell_info(6,5).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                </tr>
                <tr>
                    <td>17:00 - 18:30</td>
                    <td onClick={() => handleRowClick(1,6)}>{cell_info(1,6).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(2,6)}>{cell_info(2,6).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(3,6)}>{cell_info(3,6).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(4,6)}>{cell_info(4,6).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(5,6)}>{cell_info(5,6).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(6,6)}>{cell_info(6,6).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>

                </tr>
                <tr>
                    <td>18:40 - 20:10</td>
                    <td onClick={() => handleRowClick(1,7)}>{cell_info(1,7).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(2,7)}>{cell_info(2,7).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(3,7)}>{cell_info(3,7).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(4,7)}>{cell_info(4,7).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(5,7)}>{cell_info(5,7).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(6,7)}>{cell_info(6,7).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                </tr>
                <tr>
                    <td>20:20 - 21:50</td>
                    <td onClick={() => handleRowClick(1,8)}>{cell_info(1,8).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(2,8)}>{cell_info(2,8).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(3,8)}>{cell_info(3,8).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(4,8)}>{cell_info(4,8).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(5,8)}>{cell_info(5,8).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td onClick={() => handleRowClick(6,8)}>{cell_info(6,8).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleTable;