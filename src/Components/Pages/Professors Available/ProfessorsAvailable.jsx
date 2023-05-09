import React, {useEffect, useState} from 'react';
import classes from "../Edit/Edit.module.css";
import WeekSwitch from "../../UI/WeekSwitch/WeekSwitch";
import {Dropdown} from "primereact/dropdown";

import Button from "../../UI/Button/Button";
import UnavailableTable from "../../Schedule Table/Unavailable Table/UnavailableTable";

const ProfessorsAvailable = (props) => {
    const firstMonday= props.semester.first_monday;
    const [monday,SetMonday] = useState('');

    const [professors,SetProfessors] = useState([]);
    const [filterProfessors,SetFilterProfessors] = useState([]);

    const [unavailableLessonInfo, SetUnavailableLessonInfo]= useState([]);
    const [unavailableOtherInfo, SetUnavailableOtherInfo]= useState([]);


    const setM = (m) => {SetMonday(m);}

    useEffect(get_filters_info,[]);

    function unavailable_professor(){
        let xhr = new XMLHttpRequest();
        xhr.open("POST","https://sql.lavro.ru/call.php");
        let fd = new FormData();
        fd.append("pname","unavailable_professor");
        fd.append("db","284192");
        fd.append("p1",props.version.id_version);
        fd.append("p2",filterProfessors.isu_id_professor);
        fd.append("p3",monday);
        fd.append("p4",firstMonday);
        fd.append("format","rows");
        xhr.onload = unavailable_professor_temp;
        xhr.send(fd);
    }

    function unavailable_professor_temp(e){
        if (e.target.status === 200){
            let resp = JSON.parse(e.target.response);
            console.log(resp.RESULTS);
            if(!resp.RESULTS){
                alert("Произошла ошибка при обращении к базе данных");
            }
            else{
                console.log(resp.RESULTS);
                SetUnavailableLessonInfo(resp.RESULTS[0]);
                SetUnavailableOtherInfo(resp.RESULTS[1]);
            }

        }
        else {
            alert("Ошибка сети. Проверьте интернет соединение") ;
        }
    }

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
                SetProfessors(resp.RESULTS[2]);
            }
        }
        else {
            alert("Ошибка сети. Проверьте интернет соединение") ;
        }
    }

    function cellUnavailable(day, num_l) {
        let result = [];
        let lessonsUn = false;
        let otherUn = false;
        for (let i= 0; i < unavailableLessonInfo.length; i++){
            if (unavailableLessonInfo[i].dayofweek-1 === day && unavailableLessonInfo[i].num_lesson === num_l) {
                lessonsUn = unavailableLessonInfo[i].name_subject;
            }
        }
        for (let i= 0; i < unavailableOtherInfo.length; i++){
            if (unavailableOtherInfo[i].dayofweek-1 === day && unavailableOtherInfo[i].num_lesson === num_l) {
                otherUn = unavailableOtherInfo[i].type;
            }
        }
        result.push(lessonsUn);
        result.push(otherUn);
        return result;
    }

    return (
        <div>
            <div className={classes.container}>
                {props.menu}
                <div>
                    <Dropdown value={filterProfessors} onChange={(e) => SetFilterProfessors(e.value)} options={professors} optionLabel="name_professor"
                              filter placeholder="Select Professor"  />
                    <Button onClick={unavailable_professor}>Search</Button>
                    <div>
                        <WeekSwitch setM={setM}/>
                        <UnavailableTable unavailableLessonInfo={unavailableLessonInfo} unavailableOtherInfo={unavailableOtherInfo} monday={monday} cellUnavailable={cellUnavailable}/>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfessorsAvailable;