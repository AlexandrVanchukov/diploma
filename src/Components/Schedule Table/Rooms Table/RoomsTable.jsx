import React from 'react';
import WeekSwitch from "../../UI/WeekSwitch/WeekSwitch";
import classes from "../ScheduleTable.module.css";
import LessonCell from "../Lesson_cell";
import RoomCell from "./RoomCell";

const RoomsTable = (props) => {

    function cell_info(day, num_l, parity){
        let result = [];
        for (let i= 0; i < props.unavailableRooms.length; i++){

            if (props.unavailableRooms[i].inter === 7){
                if (props.unavailableRooms[i].dayofweek-1 === day && props.unavailableRooms[i].num_lesson === num_l)
                {
                    if(result.some(o => o.num_room === props.unavailableRooms[i].num_room)){
                        continue;
                    }
                    else {
                        result.push(props.unavailableRooms[i]);
                    }
                }
            }
            else {
                if(props.unavailableRooms[i].firstWeek%2===parity){
                    if (props.unavailableRooms[i].dayofweek-1 === day && props.unavailableRooms[i].num_lesson === num_l)
                    {
                        if(result.some(o => o.num_room === props.unavailableRooms[i].num_room)){
                            continue;
                        }
                        else {
                            result.push(props.unavailableRooms[i]);
                        }
                    }
                }
                else {
                    continue;
                }
            }
        }

        for (let i= 0; i < props.unavailableRoomsAllSem.length; i++){

                    if (props.unavailableRoomsAllSem[i].dayofweek-1 === day && props.unavailableRoomsAllSem[i].num_lesson === num_l)
                    {
                        if(result.some(o => o.num_room === props.unavailableRoomsAllSem[i].num_room)){
                            continue;
                        }
                        else {
                            result.push(props.unavailableRoomsAllSem[i]);
                        }
                    }
                else {
                    continue;
                }
            }
        return result;
    }
    console.log(cell_info(1,1,1))

    return (
        <div>
            <table className={classes.scroll}>
                <thead>
                <tr>
                    <th style={{width: "50px"}}></th>
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
                    <td rowSpan={2}>8:20 - 9:50</td>
                    <td>нечёт</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(1,1,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(2,1,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(3,1,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(4,1,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(5,1,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(6,1,1)} room={r} kry={index}/>)}</td>
                </tr>
                <tr>
                    <td>чёт</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(1,1,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(2,1,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(3,1,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(4,1,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(5,1,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(6,1,0)} room={r} kry={index}/>)}</td>
                    {/*<td>чёт</td>
                    <td>{cell_info(1,1,0).map((r,index) =><RoomCell room={r} key={index}/>)}</td>
                    <td>{cell_info(2,1,0).map((r,index) =><RoomCell room={r} key={index}/>)}</td>
                    <td>{cell_info(3,1,0).map((r,index) =><RoomCell room={r} key={index}/>)}</td>
                    <td>{cell_info(4,1,0).map((r,index) =><RoomCell room={r} key={index}/>)}</td>
                    <td>{cell_info(5,1,0).map((r,index) =><RoomCell room={r} key={index}/>)}</td>
                    <td>{cell_info(6,1,0).map((r,index) =><RoomCell room={r} key={index}/>)}</td>*/}
                </tr>
                <tr>
                    <td rowSpan={2}>10:00 - 11:30</td>
                    <td>нечёт</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(1,2,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(2,2,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(3,2,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(4,2,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(5,2,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(6,2,1)} room={r} kry={index}/>)}</td>
                </tr>
                <tr>
                    <td>чёт</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(1,2,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(2,2,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(3,2,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(4,2,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(5,2,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(6,2,0)} room={r} kry={index}/>)}</td>
                </tr>
                <tr>
                    <td rowSpan={2}>11:40 - 13:10</td>
                    <td>нечёт</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(1,3,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(2,3,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(3,3,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(4,3,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(5,3,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(6,3,1)} room={r} kry={index}/>)}</td>
                </tr>
                <tr>
                    <td>чёт</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(1,3,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(2,3,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(3,3,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(4,3,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(5,3,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(6,3,0)} room={r} kry={index}/>)}</td>
                </tr>
                <tr>
                    <td rowSpan={2}>13:30 - 15:00</td>
                    <td>нечёт</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(1,4,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(2,4,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(3,4,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(4,4,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(5,4,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(6,4,1)} room={r} kry={index}/>)}</td>
                </tr>
                <tr>
                    <td>чёт</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(1,4,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(2,4,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(3,4,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(4,4,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(5,4,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(6,4,0)} room={r} kry={index}/>)}</td>
                </tr>
                <tr>
                    <td rowSpan={2}>15:20 - 16:50</td>
                    <td>нечёт</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(1,5,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(2,5,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(3,5,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(4,5,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(5,5,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(6,5,1)} room={r} kry={index}/>)}</td>
                </tr>
                <tr>
                    <td>чёт</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(1,5,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(2,5,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(3,5,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(4,5,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(5,5,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(6,5,0)} room={r} kry={index}/>)}</td>
                </tr>
                <tr>
                    <td rowSpan={2}>17:00 - 18:30</td>
                    <td>нечёт</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(1,6,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(2,6,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(3,6,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(4,6,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(5,6,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(6,6,1)} room={r} kry={index}/>)}</td>
                </tr>
                <tr>
                    <td>чёт</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(1,6,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(2,6,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(3,6,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(4,6,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(5,6,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(6,6,0)} room={r} kry={index}/>)}</td>
                </tr>
                <tr>
                    <td rowSpan={2}>18:40 - 20:10</td>
                    <td>нечёт</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(1,7,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(2,7,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(3,7,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(4,7,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(5,7,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(6,7,1)} room={r} kry={index}/>)}</td>
                </tr>
                <tr>
                    <td>чёт</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(1,7,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(2,7,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(3,7,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(4,7,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(5,7,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(6,7,0)} room={r} kry={index}/>)}</td>
                </tr>
                <tr>
                    <td rowSpan={2}>20:20 - 21:50</td>
                    <td>нечёт</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(1,8,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(2,8,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(3,8,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(4,8,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(5,8,1)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(6,8,1)} room={r} kry={index}/>)}</td>
                </tr>
                <tr>
                    <td>чёт</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(1,8,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(2,8,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(3,8,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(4,8,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(5,8,0)} room={r} kry={index}/>)}</td>
                    <td>{props.filterRooms.map((r,index) => <RoomCell whichRoomMode={props.whichRoomMode} cell_info={cell_info(6,8,0)} room={r} kry={index}/>)}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default RoomsTable;