import React, {useEffect, useState} from 'react';
import classes from "../Edit/Edit.module.css";
import {MultiSelect} from "primereact/multiselect";
import Button from "../../UI/Button/Button";
import {Dropdown} from "primereact/dropdown";
import RoomsTable from "../../Schedule Table/Rooms Table/RoomsTable";

const RoomsAvailable = (props) => {
    const firstMonday= props.semester.first_monday;
    const version = props.version;
    const [monday,SetMonday] = useState('');

    const RoomMode = [{value: 0, name:"Все"},{value: 1, name:"Свободные"}]
    const [whichRoomMode,setWhichRoomMode] = useState(0);

    const [buildings,SetBuildings] = useState([]);
    const [rooms,SetRooms] = useState([]);

    const [filterBuildings,SetFilterBuildings] = useState([]);
    const [filterRooms,SetFilterRooms] = useState([]);

    const [unavailableRooms,SetUnavailableRooms] = useState([]);
    const [unavailableRoomsAllSem,SetUnavailableRoomsAllSem] = useState([]);

    useEffect(get_filters_info,[]);
    function get_filters_info(){
        let xhr = new XMLHttpRequest();
        xhr.open("POST","https://sql.lavro.ru/call.php");
        let fd = new FormData();
        fd.append("pname","getFiltersInfo");
        fd.append("db","284192");
        fd.append("format","rows");
        xhr.onload = get_filters_info_temp;
        xhr.send(fd);
    }

    function get_filters_info_temp(e){
        if (e.target.status === 200){
            let resp = JSON.parse(e.target.response);

            if(!resp.RESULTS){
                alert("Произошла ошибка при обращении к базе данных");
            }
            else{
                SetBuildings(resp.RESULTS[0]);
            }
        }
        else {
            alert("Ошибка сети. Проверьте интернет соединение") ;
        }
    }

    function get_rooms_info(id_b){
        let xhr = new XMLHttpRequest();
        xhr.open("POST","https://sql.lavro.ru/call.php");
        let fd = new FormData();
        fd.append("pname","getRoomsInfo");
        fd.append("db","284192");
        fd.append("p1",id_b.id_building);
        fd.append("format","rows");
        xhr.onload = get_rooms_info_temp;
        xhr.send(fd);
    }

    function get_rooms_info_temp(e){
        if (e.target.status === 200){
            let resp = JSON.parse(e.target.response);

            if(!resp.RESULTS){
                alert("Произошла ошибка при обращении к базе данных");
            }
            else{
                SetRooms(resp.RESULTS[0]);
            }
        }
        else {
            alert("Ошибка сети. Проверьте интернет соединение") ;
        }
    }

    function unavailable_rooms(){
        let xhr = new XMLHttpRequest();
        xhr.open("POST","https://sql.lavro.ru/call.php");
        let fd = new FormData();
        fd.append("pname","unavailable_rooms");
        fd.append("db","284192");
        fd.append("p1",version.id_version);
        fd.append("p2",getStringRooms(filterRooms).toString());
        fd.append("p3",firstMonday);
        console.log(version.id_version);
        console.log(getStringRooms(filterRooms).toString());
        console.log(firstMonday);
        fd.append("format","rows");
        xhr.onload = unavailable_rooms_temp;
        xhr.send(fd);
    }

    function unavailable_rooms_temp(e){
        if (e.target.status === 200){
            let resp = JSON.parse(e.target.response);

            if(!resp.RESULTS){
                alert("Произошла ошибка при обращении к базе данных");
            }
            else{
                SetUnavailableRooms(resp.RESULTS[0]);
                SetUnavailableRoomsAllSem(resp.RESULTS[1]);
            }
        }
        else {
            alert("Ошибка сети. Проверьте интернет соединение") ;
        }
    }

    function setB(id_b){
        SetFilterBuildings(id_b);
        get_rooms_info(id_b);
    }

    function getStringRooms(arr){
        let ids = [];
        console.log(arr)
        for(let i = 0; i < arr.length; i++){
            if (ids.some((x) => x === arr[i].id_cluster)){
                continue;
            }
            else {
                ids.push(arr[i].id_cluster);
            }
        }
        return ids;
    }

    const setM = (m) => {SetMonday(m);}

    return (
        <div>
            <div className={classes.container}>
                {props.menu}
                <div style={{display: "inline-block", float: 'right'}}>
                    <div className={classes.filters}>
                        <Dropdown value={filterBuildings} onChange={(e) => setB(e.value)} options={buildings} optionLabel="address"
                                     filter placeholder="Select Building" className="w-full md:w-20rem" />
                        <MultiSelect value={filterRooms} onChange={(e) => SetFilterRooms(e.value)} options={rooms} optionLabel="num_room"
                                     filter placeholder="Select Rooms" maxSelectedLabels={3} className="w-full md:w-10rem" />
                        <Button onClick={unavailable_rooms}>Search</Button>
                    </div>
                    <Dropdown value={whichRoomMode} onChange={(e) => setWhichRoomMode(e.value)} options={RoomMode} optionLabel="name"
                              placeholder="Select a City" className="w-full md:w-14rem"/>

                    <RoomsTable unavailableRooms={unavailableRooms} unavailableRoomsAllSem={unavailableRoomsAllSem} filterRooms={filterRooms} whichRoomMode={whichRoomMode}/>

                </div>
            </div>
        </div>
    );
};

export default RoomsAvailable;