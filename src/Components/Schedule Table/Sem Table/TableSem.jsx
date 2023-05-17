import React from 'react';
import classes from "../scheduleTableSem.module.css";
import TableSemCell from "./TableSemCell.jsx";

const TableSem = (props) => {

    function cell_info(day, num_l){
        let result = [];
        for (let i= 0; i < props.lessonsGroup.length; i++){
            if (props.lessonsGroup[i].dayofweek-1 === day && props.lessonsGroup[i].num_lesson === num_l && (props.lessonsGroup[i].firstWeek%2===props.evenOrOdd || props.lessonsGroup[i].inter===7))
            {
                if(result.some(o => o.id_lesson === props.lessonsGroup[i].id_lesson)){
                    const lesson = result.find(lesson => lesson.id_lesson === props.lessonsGroup[i].id_lesson)
                    result.pop();
                    if (lesson.name_group.includes(props.lessonsGroup[i].name_group)){
                        result.push(lesson);
                    }
                    else {
                        lesson.name_group = lesson.name_group + "," + props.lessonsGroup[i].name_group;
                        result.push(lesson);
                    }
                }
                else {
                    result.push(props.lessonsGroup[i]);
                }
            }
        }

        for (let i= 0; i < props.lessonsStream.length; i++){
            if (props.lessonsStream[i].dayofweek-1 === day && props.lessonsStream[i].num_lesson === num_l && (props.lessonsStream[i].firstWeek%2===props.evenOrOdd || props.lessonsGroup[i].inter===7))
            {
                if(result.some(o => o.id_lesson === props.lessonsStream[i].id_lesson)){
                    const lesson = result.find(lesson => lesson.id_lesson === props.lessonsStream[i].id_lesson)
                    result.pop();
                    if (lesson.name_group.includes(props.lessonsStream[i].name_group)){
                        result.push(lesson);
                    }
                    else {
                        lesson.name_group = lesson.name_group + "," + props.lessonsStream[i].name_group;
                        result.push(lesson);
                    }
                }
                else {
                    result.push(props.lessonsStream[i]);
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
                    <td>8:20 - 9:50</td>
                    <td>{cell_info(1,1).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(2,1).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(3,1).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(4,1).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(5,1).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(6,1).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                </tr>
                <tr>
                    <td>10:00 - 11:30</td>
                    <td>{cell_info(1,2).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(2,2).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(3,2).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(4,2).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(5,2).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(6,2).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                </tr>
                <tr>
                    <td>11:40 - 13:10</td>
                    <td>{cell_info(1,3).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(2,3).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(3,3).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(4,3).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(5,3).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(6,3).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                </tr>
                <tr>
                    <td>13:30 - 15:00</td>
                    <td>{cell_info(1,4).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(2,4).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(3,4).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(4,4).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(5,4).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(6,4).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>

                </tr>
                <tr>
                    <td>15:20 - 16:50</td>
                    <td>{cell_info(1,5).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(2,5).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(3,5).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(4,5).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(5,5).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(6,5).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                </tr>
                <tr>
                    <td>17:00 - 18:30</td>
                    <td>{cell_info(1,6).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(2,6).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(3,6).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(4,6).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(5,6).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(6,6).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>

                </tr>
                <tr>
                    <td>18:40 - 20:10</td>
                    <td>{cell_info(1,7).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(2,7).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(3,7).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(4,7).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(5,7).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(6,7).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                </tr>
                <tr>
                    <td>20:20 - 21:50</td>
                    <td>{cell_info(1,8).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(2,8).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(3,8).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(4,8).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(5,8).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(6,8).map((l,index) => <TableSemCell lesson={l} key={index}/>)}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TableSem;