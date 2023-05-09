import React from 'react';
import classes from "./UnavailableTable.module.css";
import TdTable from "../TdTable";

const UnavailableTable = (props) => {
    console.log(props.cellUnavailable(2,2));

    function getBgColorUnavailable(day, num_l){
        let unavailable = props.cellUnavailable(day,num_l);
        if (unavailable[0]){
            return classes.blue;
        }
        else if(unavailable[1]){
            return classes.yellow;
        }
        else if(unavailable[2]){
            return classes.yellow;
        }
        else {
            return classes.white;
        }
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
            <table>
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
                    <td className={getBgColorUnavailable(1,1)}>{props.cellUnavailable(1,1)}</td>
                    <td className={getBgColorUnavailable(2,1)}>{props.cellUnavailable(2,1)}</td>
                    <td className={getBgColorUnavailable(3,1)}>{props.cellUnavailable(3,1)}</td>
                    <td className={getBgColorUnavailable(4,1)}>{props.cellUnavailable(4,1)}</td>
                    <td className={getBgColorUnavailable(5,1)}>{props.cellUnavailable(5,1)}</td>
                    <td className={getBgColorUnavailable(6,1)}>{props.cellUnavailable(6,1)}</td>
                </tr>
                <tr>
                    <td>10:00 - 11:30</td>
                    <td className={getBgColorUnavailable(1,2)}>{props.cellUnavailable(1,2)}</td>
                    <td className={getBgColorUnavailable(2,2)}>{props.cellUnavailable(2,2)}</td>
                    <td className={getBgColorUnavailable(3,2)}>{props.cellUnavailable(3,2)}</td>
                    <td className={getBgColorUnavailable(4,2)}>{props.cellUnavailable(4,2)}</td>
                    <td className={getBgColorUnavailable(5,2)}>{props.cellUnavailable(5,2)}</td>
                    <td className={getBgColorUnavailable(6,2)}>{props.cellUnavailable(6,2)}</td>
                </tr>
                <tr>
                    <td>11:40 - 13:10</td>
                    <td className={getBgColorUnavailable(1,3)}>{props.cellUnavailable(1,3)}</td>
                    <td className={getBgColorUnavailable(2,3)}>{props.cellUnavailable(2,3)}</td>
                    <td className={getBgColorUnavailable(3,3)}>{props.cellUnavailable(3,3)}</td>
                    <td className={getBgColorUnavailable(4,3)}>{props.cellUnavailable(4,3)}</td>
                    <td className={getBgColorUnavailable(5,3)}>{props.cellUnavailable(5,3)}</td>
                    <td className={getBgColorUnavailable(6,3)}>{props.cellUnavailable(6,3)}</td>
                </tr>
                <tr>
                    <td>13:30 - 15:00</td>
                    <td className={getBgColorUnavailable(1,4)}>{props.cellUnavailable(1,4)}</td>
                    <td className={getBgColorUnavailable(2,4)}>{props.cellUnavailable(2,4)}</td>
                    <td className={getBgColorUnavailable(3,4)}>{props.cellUnavailable(3,4)}</td>
                    <td className={getBgColorUnavailable(4,4)}>{props.cellUnavailable(4,4)}</td>
                    <td className={getBgColorUnavailable(5,4)}>{props.cellUnavailable(5,4)}</td>
                    <td className={getBgColorUnavailable(6,4)}>{props.cellUnavailable(6,4)}</td>
                </tr>
                <tr>
                    <td>15:20 - 16:50</td>
                    <td className={getBgColorUnavailable(1,5)}>{props.cellUnavailable(1,5)}</td>
                    <td className={getBgColorUnavailable(2,5)}>{props.cellUnavailable(2,5)}</td>
                    <td className={getBgColorUnavailable(3,5)}>{props.cellUnavailable(3,5)}</td>
                    <td className={getBgColorUnavailable(4,5)}>{props.cellUnavailable(4,5)}</td>
                    <td className={getBgColorUnavailable(5,5)}>{props.cellUnavailable(5,5)}</td>
                    <td className={getBgColorUnavailable(6,5)}>{props.cellUnavailable(6,5)}</td>
                </tr>
                <tr>
                    <td>17:00 - 18:30</td>
                    <td className={getBgColorUnavailable(1,6)}>{props.cellUnavailable(1,6)}</td>
                    <td className={getBgColorUnavailable(2,6)}>{props.cellUnavailable(2,6)}</td>
                    <td className={getBgColorUnavailable(3,6)}>{props.cellUnavailable(3,6)}</td>
                    <td className={getBgColorUnavailable(4,6)}>{props.cellUnavailable(4,6)}</td>
                    <td className={getBgColorUnavailable(5,6)}>{props.cellUnavailable(5,6)}</td>
                    <td className={getBgColorUnavailable(6,6)}>{props.cellUnavailable(6,6)}</td>
                </tr>
                <tr>
                    <td>18:40 - 20:10</td>
                    <td className={getBgColorUnavailable(1,7)}>{props.cellUnavailable(1,7)}</td>
                    <td className={getBgColorUnavailable(2,7)}>{props.cellUnavailable(2,7)}</td>
                    <td className={getBgColorUnavailable(3,7)}>{props.cellUnavailable(3,7)}</td>
                    <td className={getBgColorUnavailable(4,7)}>{props.cellUnavailable(4,7)}</td>
                    <td className={getBgColorUnavailable(5,7)}>{props.cellUnavailable(5,7)}</td>
                    <td className={getBgColorUnavailable(6,7)}>{props.cellUnavailable(6,7)}</td>
                </tr>
                <tr>
                    <td>20:20 - 21:50</td>
                    <td className={getBgColorUnavailable(1,8)}>{props.cellUnavailable(1,8)}</td>
                    <td className={getBgColorUnavailable(2,8)}>{props.cellUnavailable(2,8)}</td>
                    <td className={getBgColorUnavailable(3,8)}>{props.cellUnavailable(3,8)}</td>
                    <td className={getBgColorUnavailable(4,8)}>{props.cellUnavailable(4,8)}</td>
                    <td className={getBgColorUnavailable(5,8)}>{props.cellUnavailable(5,8)}</td>
                    <td className={getBgColorUnavailable(6,8)}>{props.cellUnavailable(6,8)}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UnavailableTable;