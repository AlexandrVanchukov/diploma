import React, {useEffect, useState} from 'react';
import classes from "../ScheduleTable.module.css";
import TdTable from "../TdTable";
import {MultiSelect} from "primereact/multiselect";
import Button from "../../UI/Button/Button";
import WeekSwitch from "../../UI/WeekSwitch/WeekSwitch";
import LessonCell from "../Lesson_cell";
import {Dropdown} from "primereact/dropdown";

const CompareTable = (props) => {

    const [versions,setVersions] = useState();
    const [whichVersion,setWhichVersion] = useState(props.version);

    const [monday,SetMonday] = useState('');
    const [lessons,SetLessons] = useState([]);
    useEffect(get_versions,[]);
    //
    const [filterBuildings,SetFilterBuildings] = useState([]);
    const [filterSubjects,SetFilterSubjects] = useState([]);
    const [filterProfessors,SetFilterProfessors] = useState([]);
    const [filterGroupsNStreams,SetFilterGroupsNStreams] = useState([]);
    const [filterStudents,SetFilterStudents] = useState([]);
    const [filterRooms,SetFilterRooms] = useState([]);

    function cell_info(day, num_l){
        let result = [];
        for (let i= 0; i < lessons.length; i++){
            if (lessons[i].dayofweek-1 === day && lessons[i].num_lesson === num_l)
            {
                if(result.some(o => o.id_lesson === lessons[i].id_lesson)){
                    const lesson = result.find(lesson => lesson.id_lesson === lessons[i].id_lesson)
                    result.pop();
                    if (lesson.name_group.includes(lessons[i].name_group)){
                        result.push(lesson);
                    }
                    else {
                        lesson.name_group = lesson.name_group + "," + lessons[i].name_group;
                        result.push(lesson);
                    }
                }
                else {
                    result.push(lessons[i]);
                }
            }
        }
        return result;
    }

    function show_lesson(){
        console.log(whichVersion.id_version);
        console.log(monday);
        console.log(props.firstMonday);
        let xhr = new XMLHttpRequest();
        xhr.open("POST","https://sql.lavro.ru/call.php");
        let fd = new FormData();
        fd.append("pname","show_lesson");
        fd.append("db","284192");
        fd.append("p1",whichVersion.id_version);
        fd.append("p2",getStringBuilding(filterBuildings).toString());
        fd.append("p3",getStringSubject(filterSubjects).toString());
        fd.append("p4",getStringProfessor(filterProfessors).toString());
        fd.append("p5",getStringGroupNStream(filterGroupsNStreams).toString());
        fd.append("p6",getStringRooms(filterRooms).toString());
        fd.append("p7",getStringStudents(filterStudents).toString());
        fd.append("p8",monday);
        fd.append("p9",props.firstMonday);
        fd.append("format","rows");
        xhr.onload = show_lesson_temp;
        xhr.send(fd);
    }

    function show_lesson_temp(e){
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
                        if(resp.RESULTS[0][0].error === "You should choose one of the filters"){
                            alert(resp.RESULTS[0][0].rus_error);
                        }
                    }
                }
                SetLessons(resp.RESULTS[0]);
            }
        }
        else {
            alert("Ошибка сети. Проверьте интернет соединение") ;
        }
    }

    function getStringBuilding(arr){
        let ids = [];
        for(let i = 0; i < arr.length; i++){
            ids.push(arr[i].id_building);
        }
        return ids;
    }
    function getStringSubject(arr){
        let ids = [];
        for(let i = 0; i < arr.length; i++){
            ids.push(arr[i].id_subject);
        }
        return ids;
    }
    function getStringProfessor(arr){
        let ids = [];
        for(let i = 0; i < arr.length; i++){
            ids.push(arr[i].isu_id_professor);
        }
        return ids;
    }
    function getStringGroupNStream(arr){
        let ids = [];
        for(let i = 0; i < arr.length; i++){
            ids.push(arr[i].name);
        }
        return ids;
    }
    function getStringStudents(arr){
        let ids = [];
        for(let i = 0; i < arr.length; i++){
            ids.push(arr[i].isu_id_student);
        }
        return ids;
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


    function formatDateDay(date) {
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        return dd;
    }
    const setM = (m) => {SetMonday(m);}
    const [year, month, day] = monday.split('-');
    const date = new Date(year, month - 1, day);

    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    function get_versions(){
        let xhr = new XMLHttpRequest();
        xhr.open("POST","https://sql.lavro.ru/call.php");
        let fd = new FormData();
        fd.append("pname","getVersions");
        fd.append("db","284192");
        fd.append("p1",props.semester.id_root_version);
        fd.append("format","rows");
        xhr.onload = get_versions_temp;
        xhr.send(fd);
    }

    function get_versions_temp(e){
        if (e.target.status === 200){
            let resp = JSON.parse(e.target.response);
            if(!resp.RESULTS){
                alert("Произошла ошибка при обращении к базе данных");
            }
            else{
                setVersions(resp.RESULTS[0]);
            }

        }
        else {
            alert("Ошибка сети. Проверьте интернет соединение") ;
        }
    }

    function pickVersion(value){
        setWhichVersion(value);
    }

    return (
        <div>
            <div className={classes.filters}>
                <Dropdown value={whichVersion} onChange={(e) => pickVersion(e.value)} options={versions} optionLabel="title"
                          placeholder="Select a Version" className="w-full md:w-14rem"/>
                <MultiSelect value={filterBuildings} onChange={(e) => SetFilterBuildings(e.value)} options={props.buildings} optionLabel="address"
                             filter placeholder="Select Building" maxSelectedLabels={1} className="w-full md:w-20rem" />
                <MultiSelect value={filterSubjects} onChange={(e) => SetFilterSubjects(e.value)} options={props.subjects} optionLabel="name_subject"
                             filter placeholder="Select Subjects" maxSelectedLabels={1} className="w-full md:w-20rem" />
                <MultiSelect value={filterProfessors} onChange={(e) => SetFilterProfessors(e.value)} options={props.professors} optionLabel="name_professor"
                             filter placeholder="Select Professors" maxSelectedLabels={3} className="w-full md:w-20rem" />
                <MultiSelect value={filterGroupsNStreams} onChange={(e) => SetFilterGroupsNStreams(e.value)} options={props.groupsNStreams} optionLabel="name"
                             filter placeholder="Select Gruops/Streams" maxSelectedLabels={3} className="w-full md:w-20rem" />
                <MultiSelect value={filterStudents} onChange={(e) => SetFilterStudents(e.value)} options={props.students} optionLabel="name_student"
                             filter placeholder="Select Students" maxSelectedLabels={3} className="w-full md:w-20rem" />
                <MultiSelect value={filterRooms} onChange={(e) => SetFilterRooms(e.value)} options={props.rooms} optionLabel="num_room"
                             filter placeholder="Select Rooms" maxSelectedLabels={3} className="w-full md:w-10rem" />
                <Button onClick={show_lesson}>Search</Button>
            </div>

            <WeekSwitch setM={setM} onClick={show_lesson}/>

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
                    <td>{cell_info(1,1).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(2,1).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(3,1).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(4,1).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(5,1).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(6,1).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                </tr>
                <tr>
                    <td>10:00 - 11:30</td>
                    <td>{cell_info(1,2).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(2,2).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(3,2).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(4,2).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(5,2).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(6,2).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    {/*<TdTable day={1} num_l={2} cell_info={cell_info}/>
                    <TdTable day={2} num_l={2} cell_info={cell_info}/>
                    <TdTable day={3} num_l={2} cell_info={cell_info}/>
                    <TdTable day={4} num_l={2} cell_info={cell_info}/>
                    <TdTable day={5} num_l={2} cell_info={cell_info}/>
                    <TdTable day={6} num_l={2} cell_info={cell_info}/>*/}
                </tr>
                <tr>
                    <td>11:40 - 13:10</td>
                    <td>{cell_info(1,3).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(2,3).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(3,3).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(4,3).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(5,3).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(6,3).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    {/*<TdTable day={1} num_l={3} cell_info={cell_info}/>
                    <TdTable day={2} num_l={3} cell_info={cell_info}/>
                    <TdTable day={3} num_l={3} cell_info={cell_info}/>
                    <TdTable day={4} num_l={3} cell_info={cell_info}/>
                    <TdTable day={5} num_l={3} cell_info={cell_info}/>
                    <TdTable day={6} num_l={3} cell_info={cell_info}/>*/}
                </tr>
                <tr>
                    <td>13:30 - 15:00</td>
                    <td>{cell_info(1,4).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(2,4).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(3,4).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(4,4).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(5,4).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(6,4).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    {/*<TdTable day={1} num_l={4} cell_info={cell_info}/>
                    <TdTable day={2} num_l={4} cell_info={cell_info}/>
                    <TdTable day={3} num_l={4} cell_info={cell_info}/>
                    <TdTable day={4} num_l={4} cell_info={cell_info}/>
                    <TdTable day={5} num_l={4} cell_info={cell_info}/>
                    <TdTable day={6} num_l={4} cell_info={cell_info}/>*/}

                </tr>
                <tr>
                    <td>15:20 - 16:50</td>
                    <td>{cell_info(1,5).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(2,5).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(3,5).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(4,5).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(5,5).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(6,5).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    {/*<TdTable day={1} num_l={5} cell_info={cell_info}/>
                    <TdTable day={2} num_l={5} cell_info={cell_info}/>
                    <TdTable day={3} num_l={5} cell_info={cell_info}/>
                    <TdTable day={4} num_l={5} cell_info={cell_info}/>
                    <TdTable day={5} num_l={5} cell_info={cell_info}/>
                    <TdTable day={6} num_l={5} cell_info={cell_info}/>*/}
                </tr>
                <tr>
                    <td>17:00 - 18:30</td>
                    <td>{cell_info(1,6).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(2,6).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(3,6).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(4,6).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(5,6).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(6,6).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    {/*<TdTable day={1} num_l={6} cell_info={cell_info}/>
                    <TdTable day={2} num_l={6} cell_info={cell_info}/>
                    <TdTable day={3} num_l={6} cell_info={cell_info}/>
                    <TdTable day={4} num_l={6} cell_info={cell_info}/>
                    <TdTable day={5} num_l={6} cell_info={cell_info}/>
                    <TdTable day={6} num_l={6} cell_info={cell_info}/>*/}

                </tr>
                <tr>
                    <td>18:40 - 20:10</td>
                    <td>{cell_info(1,7).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(2,7).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(3,7).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(4,7).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(5,7).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(6,7).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    {/*<TdTable day={1} num_l={7} cell_info={cell_info}/>
                    <TdTable day={2} num_l={7} cell_info={cell_info}/>
                    <TdTable day={3} num_l={7} cell_info={cell_info}/>
                    <TdTable day={4} num_l={7} cell_info={cell_info}/>
                    <TdTable day={5} num_l={7} cell_info={cell_info}/>
                    <TdTable day={6} num_l={7} cell_info={cell_info}/>*/}
                </tr>
                <tr>
                    <td>20:20 - 21:50</td>
                    <td>{cell_info(1,8).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(2,8).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(3,8).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(4,8).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(5,8).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    <td>{cell_info(6,8).map((l,index) => <LessonCell lesson={l} key={index}/>)}</td>
                    {/*<TdTable day={1} num_l={8} cell_info={cell_info}/>
                    <TdTable day={2} num_l={8} cell_info={cell_info}/>
                    <TdTable day={3} num_l={8} cell_info={cell_info}/>
                    <TdTable day={4} num_l={8} cell_info={cell_info}/>
                    <TdTable day={5} num_l={8} cell_info={cell_info}/>
                    <TdTable day={6} num_l={8} cell_info={cell_info}/>*/}
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CompareTable;