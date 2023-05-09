import React, {useEffect, useState} from 'react';
import classes from "../Edit/Edit.module.css";
import {Dropdown} from "primereact/dropdown";
import Button from "../../UI/Button/Button";
import WeekSwitch from "../../UI/WeekSwitch/WeekSwitch";
import UnavailableTable from "../../Schedule Table/Unavailable Table/UnavailableTable";

const StreamsAvailable = (props) => {
    const firstMonday= props.semester.first_monday;
    const [monday,SetMonday] = useState('');

    const [streams,SetStreams] = useState([]);
    const [filterStreams,SetFilterStreams] = useState([]);

    const [unavailableSteamInfo, SetUnavailableSteamInfo] = useState([]);
    const [unavailableStudentLessonInfo, SetUnavailableStudentLessonInfo]= useState([]);
    const [unavailableStudentOtherInfo, SetUnavailableStudentOtherInfo]= useState([]);


    const setM = (m) => {SetMonday(m);}

    useEffect(getStreams,[]);

    function unavailable_stream(){
        console.log(props.version.id_version);
        console.log(filterStreams.name_stream);
        console.log(monday);
        console.log(firstMonday);
        let xhr = new XMLHttpRequest();
        xhr.open("POST","https://sql.lavro.ru/call.php");
        let fd = new FormData();
        fd.append("pname","unavailable_stream");
        fd.append("db","284192");
        fd.append("p1",props.version.id_version);
        fd.append("p2",filterStreams.name_stream);
        fd.append("p3","20"+monday);
        fd.append("p4",firstMonday);
        fd.append("format","rows");
        xhr.onload = unavailable_stream_temp;
        xhr.send(fd);
    }

    function unavailable_stream_temp(e){
        if (e.target.status === 200){
            let resp = JSON.parse(e.target.response);
            console.log(resp);
            if(!resp.RESULTS){
                alert("Произошла ошибка при обращении к базе данных");
            }
            else{
                console.log(resp.RESULTS);
                SetUnavailableSteamInfo(resp.RESULTS[0]);
                SetUnavailableStudentLessonInfo(resp.RESULTS[1]);
                SetUnavailableStudentOtherInfo(resp.RESULTS[2]);
            }
        }
        else {
            alert("Ошибка сети. Проверьте интернет соединение") ;
        }
    }

    function getStreams(){
        let xhr = new XMLHttpRequest();
        xhr.open("POST","https://sql.lavro.ru/call.php");
        let fd = new FormData();
        fd.append("pname","getStreams");
        fd.append("db","284192");
        fd.append("format","rows");
        xhr.onload = getStreams_temp;
        xhr.send(fd);
    }

    function getStreams_temp(e){
        if (e.target.status === 200){
            let resp = JSON.parse(e.target.response);

            if(!resp.RESULTS){
                alert("Произошла ошибка при обращении к базе данных");
            }
            else{
                SetStreams(resp.RESULTS[0]);
            }
        }
        else {
            alert("Ошибка сети. Проверьте интернет соединение") ;
        }
    }

    function cellUnavailable(day, num_l) {
        let result = [];
        let lessonsUn = '';
        let otherUn = false;
        let streamUn = false;

        for (let i= 0; i < unavailableStudentLessonInfo.length; i++){
            if (unavailableStudentLessonInfo[i].dayofweek-1 === day && unavailableStudentLessonInfo[i].num_lesson === num_l) {
                if(lessonsUn.indexOf(unavailableStudentLessonInfo[i].name_student + " " + unavailableStudentLessonInfo[i].isu_id_student) >= 0){
                    continue;
                }
                else {
                    lessonsUn = lessonsUn + unavailableStudentLessonInfo[i].name_student + " " + unavailableStudentLessonInfo[i].isu_id_student + ', ';
                }

            }
        }
        for (let i= 0; i < unavailableStudentOtherInfo.length; i++){
            if (unavailableStudentOtherInfo[i].dayofweek-1 === day && unavailableStudentOtherInfo[i].num_lesson === num_l) {
                otherUn = unavailableStudentOtherInfo[i].type;
            }
        }
        for (let i= 0; i < unavailableSteamInfo.length; i++){
            if (unavailableSteamInfo[i].dayofweek-1 === day && unavailableSteamInfo[i].num_lesson === num_l) {
                streamUn = unavailableSteamInfo[i].type;
            }
        }
        result.push(lessonsUn);
        result.push(otherUn);
        result.push(streamUn);
        return result;
    }

    return (
        <div>
            <div className={classes.container}>
                {props.menu}
                <div>
                    <Dropdown value={filterStreams} onChange={(e) => SetFilterStreams(e.value)} options={streams} optionLabel="name_stream"
                              filter placeholder="Select Stream"  />
                    <Button onClick={unavailable_stream}>Search</Button>
                    <div>
                        <WeekSwitch setM={setM}/>
                        <UnavailableTable cellUnavailable={cellUnavailable} monday={monday}/>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StreamsAvailable;