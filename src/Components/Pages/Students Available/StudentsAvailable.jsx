import React, {useEffect, useState} from 'react';
import classes from "../Edit/Edit.module.css";
import {Dropdown} from "primereact/dropdown";
import Button from "../../UI/Button/Button";
import WeekSwitch from "../../UI/WeekSwitch/WeekSwitch";
import UnavailableTable from "../../Schedule Table/Unavailable Table/UnavailableTable";

const StudentsAvailable = (props) => {
    const firstMonday= props.semester.first_monday;
    const [monday,SetMonday] = useState('');

    const [students,SetStudents] = useState([]);
    const [filterStudents,SetFilterStudents] = useState([]);

    const [unavailableStudentGroup, SetUnavailableStudentGroup] = useState([]);
    const [unavailableStudentStream, SetUnavailableStudentStream]= useState([]);
    const [unavailableStudentOtherInfo, SetUnavailableStudentOtherInfo]= useState([]);


    const setM = (m) => {SetMonday(m);}

    useEffect(getFiltersInfo,[]);

    function unavailable_student(){
        console.log(props.version.id_version);
        console.log(filterStudents.name_stream);
        console.log(monday);
        console.log(firstMonday);
        let xhr = new XMLHttpRequest();
        xhr.open("POST","https://sql.lavro.ru/call.php");
        let fd = new FormData();
        fd.append("pname","unavailable_student");
        fd.append("db","284192");
        fd.append("p1",props.version.id_version);
        fd.append("p2",filterStudents.isu_id_student);
        fd.append("p3","20"+monday);
        fd.append("p4",firstMonday);
        fd.append("format","rows");
        xhr.onload = unavailable_student_temp;
        xhr.send(fd);
    }

    function unavailable_student_temp(e){
        if (e.target.status === 200){
            let resp = JSON.parse(e.target.response);
            console.log(resp);
            if(!resp.RESULTS){
                alert("Произошла ошибка при обращении к базе данных");
            }
            else{
                console.log(resp.RESULTS);
                SetUnavailableStudentGroup(resp.RESULTS[0]);
                SetUnavailableStudentStream(resp.RESULTS[1]);
                SetUnavailableStudentOtherInfo(resp.RESULTS[2]);
            }
        }
        else {
            alert("Ошибка сети. Проверьте интернет соединение") ;
        }
    }

    function getFiltersInfo(){
        let xhr = new XMLHttpRequest();
        xhr.open("POST","https://sql.lavro.ru/call.php");
        let fd = new FormData();
        fd.append("pname","getFiltersInfo");
        fd.append("db","284192");
        fd.append("format","rows");
        xhr.onload = getFiltersInfo_temp;
        xhr.send(fd);
    }

    function getFiltersInfo_temp(e){
        if (e.target.status === 200){
            let resp = JSON.parse(e.target.response);

            if(!resp.RESULTS){
                alert("Произошла ошибка при обращении к базе данных");
            }
            else{
                SetStudents(resp.RESULTS[4]);
            }
        }
        else {
            alert("Ошибка сети. Проверьте интернет соединение") ;
        }
    }

    function cellUnavailable(day, num_l) {
        let result = [];
        let lessonsGroup = '';
        let lessonsStream = false;
        let otherUn = false;

        for (let i= 0; i < unavailableStudentStream.length; i++){
            if (unavailableStudentStream[i].dayofweek-1 === day && unavailableStudentStream[i].num_lesson === num_l) {
                lessonsStream = unavailableStudentStream[i].name_subject + "(" + unavailableStudentStream[i].type + ")";
            }
        }
        for (let i= 0; i < unavailableStudentOtherInfo.length; i++){
            if (unavailableStudentOtherInfo[i].dayofweek-1 === day && unavailableStudentOtherInfo[i].num_lesson === num_l) {
                otherUn = unavailableStudentOtherInfo[i].type;
            }
        }
        for (let i= 0; i < unavailableStudentGroup.length; i++){
            if (unavailableStudentGroup[i].dayofweek-1 === day && unavailableStudentGroup[i].num_lesson === num_l) {
                lessonsGroup = unavailableStudentGroup[i].name_subject + "(" + unavailableStudentGroup[i].type + ")";
            }
        }
        result.push(lessonsGroup);
        result.push(lessonsStream);
        result.push(otherUn);
        return result;
    }

    return (
        <div>
            <div className={classes.container}>
                {props.menu}
                <div>
                    <Dropdown value={filterStudents} onChange={(e) => SetFilterStudents(e.value)} options={students} optionLabel="name_student"
                              filter placeholder="Select Student"  />
                    <Button onClick={unavailable_student}>Search</Button>
                    <div>
                        <WeekSwitch setM={setM}/>
                        <UnavailableTable cellUnavailable={cellUnavailable} monday={monday}/>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StudentsAvailable;