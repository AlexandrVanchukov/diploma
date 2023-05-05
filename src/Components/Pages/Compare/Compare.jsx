import React, {useEffect, useState} from 'react';
import classes from "../Edit/Edit.module.css";
import {MultiSelect} from "primereact/multiselect";
import Button from "../../UI/Button/Button";
import {Dropdown} from "primereact/dropdown";
import WeekSwitch from "../../UI/WeekSwitch/WeekSwitch";
import {SelectButton} from "primereact/selectbutton";
import ScheduleTableSem from "../../Schedule Table/scheduleTableSem";
import ScheduleTable from "../../Schedule Table/scheduleTable";
import CompareTable from "../../Schedule Table/Compare Table/CompareTable";

const Compare = (props) => {
    const firstMonday= props.semester.first_monday;
    const [subjects,SetSubjects] = useState([]);
    const [buildings,SetBuildings] = useState([]);
    const [professors,SetProfessors] = useState([]);
    const [groupsNStreams,SetGroupsNStreams] = useState([]);
    const [students,SetStudents] = useState([]);
    const [rooms,SetRooms] = useState([]);

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
                console.log(resp.RESULTS)
                SetBuildings(resp.RESULTS[0]);
                SetSubjects(resp.RESULTS[1]);
                SetProfessors(resp.RESULTS[2]);
                SetGroupsNStreams(resp.RESULTS[3]);
                SetStudents(resp.RESULTS[4]);
                SetRooms(resp.RESULTS[5]);
            }
        }
        else {
            alert("Ошибка сети. Проверьте интернет соединение") ;
        }
    }


    return (
        <div>
            <div className={classes.container}>
                {props.menu}
                <div style={{display: "inline-block", float: 'right'}}>
                    <CompareTable subjects={subjects} buildings={buildings} professors={professors} groupsNStreams={groupsNStreams} students={students} rooms={rooms} firstMonday={firstMonday} semester={props.semester}/>
                    <CompareTable subjects={subjects} buildings={buildings} professors={professors} groupsNStreams={groupsNStreams} students={students} rooms={rooms} firstMonday={firstMonday} semester={props.semester}/>
                </div>
            </div>
        </div>
    );
};

export default Compare;