import React, {useEffect, useState} from "react";

import ScheduleTable from "./Components/Schedule Table/scheduleTable";
import Menu from "./Components/menu";
import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import Button from "./Components/UI/Button/Button";
import classes from "./App.module.css";
function App() {
    const firstMonday='2023-02-06';

    const [lessons,SetLessons] = useState([]);
    const [subjects,SetSubjects] = useState([]);
    const [buildings,SetBuildings] = useState([]);
    const [professors,SetProfessors] = useState([]);
    const [groupsNStreams,SetGroupsNStreams] = useState([]);
    const [students,SetStudents] = useState([]);
    const [rooms,SetRooms] = useState([]);

    const [filterBuildings,SetFilterBuildings] = useState([]);
    const [filterSubjects,SetFilterSubjects] = useState([]);
    const [filterProfessors,SetFilterProfessors] = useState([]);
    const [filterGroupsNStreams,SetFilterGroupsNStreams] = useState([]);
    const [filterStudents,SetFilterStudents] = useState([]);
    const [filterRooms,SetFilterRooms] = useState([]);

    useEffect(show_lesson,[]);
    useEffect(get_filters_info,[]);

    function show_lesson(){
        let xhr = new XMLHttpRequest();
        xhr.open("POST","https://sql.lavro.ru/call.php");
        let fd = new FormData();
        fd.append("pname","show_lesson");
        fd.append("db","284192");
        fd.append("p1",'6');
        fd.append("p2",getStringBuilding(filterBuildings).toString());
        fd.append("p3",getStringSubject(filterSubjects).toString());
        fd.append("p4",getStringProfessor(filterProfessors).toString());
        fd.append("p5",getStringGroupNStream(filterGroupsNStreams).toString());
        fd.append("p6",getStringRooms(filterRooms).toString());
        fd.append("p7",getStringStudents(filterStudents).toString());
        fd.append("p8",'2023-04-03');
        fd.append("p9",firstMonday);
        fd.append("format","rows");
        xhr.onload = show_lesson_temp;
        xhr.send(fd);
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
            ids.push(arr[i].id_cluster);
            /*if (ids.some((x) => x === arr[i].id_cluster)){
                continue;
            }
            else {

            }*/
        }
        return ids;
    }


    function show_lesson_temp(e){
        if (e.target.status === 200){
            let resp = JSON.parse(e.target.response);
            console.log(resp.RESULTS);
            if(!resp.RESULTS){
                alert("Произошла ошибка при обращении к базе данных");
            }
            else{
                if(resp.RESULTS.error){
                    if(resp.RESULTS.error === "You should choose one of the filters"){
                        alert(resp.RESULTS[0][0].rus_error);
                    }
                }
                SetLessons(resp.RESULTS[0]);
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
  const handleOptionSelect = (option) => {
    console.log(`Selected option: ${option}`);
  };

  return (
    <div className="App">
        <div className={classes.container}>
            <div>
                <Menu/>
            </div>
            <div style={{display: "inline-block"}}>
                <MultiSelect value={filterBuildings} onChange={(e) => SetFilterBuildings(e.value)} options={buildings} optionLabel="address"
                             filter placeholder="Select Building" maxSelectedLabels={1} className="w-full md:w-20rem" />
                <MultiSelect value={filterSubjects} onChange={(e) => SetFilterSubjects(e.value)} options={subjects} optionLabel="name_subject"
                             filter placeholder="Select Subjects" maxSelectedLabels={1} className="w-full md:w-20rem" />
                <MultiSelect value={filterProfessors} onChange={(e) => SetFilterProfessors(e.value)} options={professors} optionLabel="name_professor"
                             filter placeholder="Select Professors" maxSelectedLabels={3} className="w-full md:w-20rem" />
                <MultiSelect value={filterGroupsNStreams} onChange={(e) => SetFilterGroupsNStreams(e.value)} options={groupsNStreams} optionLabel="name"
                             filter placeholder="Select Gruops/Streams" maxSelectedLabels={3} className="w-full md:w-20rem" />
                <MultiSelect value={filterStudents} onChange={(e) => SetFilterStudents(e.value)} options={students} optionLabel="name_student"
                             filter placeholder="Select Students" maxSelectedLabels={3} className="w-full md:w-20rem" />
                <MultiSelect value={filterRooms} onChange={(e) => SetFilterRooms(e.value)} options={rooms} optionLabel="num_room"
                             filter placeholder="Select Rooms" maxSelectedLabels={3} className="w-full md:w-20rem" />
                <Button onClick={show_lesson}>Search</Button>
                <ScheduleTable lessons={lessons}/>
            </div>
        </div>
    </div>
  );
}
export default App;