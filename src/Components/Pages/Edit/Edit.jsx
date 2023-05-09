import React, {useEffect, useState} from 'react';
import classes from "./Edit.module.css";
import Menu from "../../menu";
import {MultiSelect} from "primereact/multiselect";
import Button from "../../UI/Button/Button";
import {Dropdown} from "primereact/dropdown";
import WeekSwitch from "../../UI/WeekSwitch/WeekSwitch";
import {SelectButton} from "primereact/selectbutton";
import ScheduleTableSem from "../../Schedule Table/scheduleTableSem";
import ScheduleTable from "../../Schedule Table/scheduleTable";

const Edit = (props) => {
    const firstMonday= props.firstM.first_monday;
    const [monday,SetMonday] = useState('');
    const [lessonsGroup,SetLessonsGroup] = useState([]);
    const [lessonsStream,SetLessonsStream] = useState([]);

    const SemMode = [{value:false, name:"Неделя"},{value:true, name:"Семестр"}];
    const CreateMode = [{value:false, name:"Изменение"},{value:true, name:"Создание"}];
    const WeeksMode = [{value:0, name:"Все"},{value:1, name:"Нечёт."},{value:2, name:"Чёт."}];
    const [isSemMode,setIsSemMode] = useState(false);
    const [isCreateMode,SetIsCreateMode] = useState(false);
    const [whichWeeksMode,setWhichWeeksMode] = useState(0);

    const [subjects,SetSubjects] = useState([]);
    const [buildings,SetBuildings] = useState([]);
    const [professors,SetProfessors] = useState([]);
    const [groupsNStreams,SetGroupsNStreams] = useState([]);
    const [students,SetStudents] = useState([]);
    const [rooms,SetRooms] = useState([]);
    //
    const [filterBuildings,SetFilterBuildings] = useState([]);
    const [filterSubjects,SetFilterSubjects] = useState([]);
    const [filterProfessors,SetFilterProfessors] = useState([]);
    const [filterGroupsNStreams,SetFilterGroupsNStreams] = useState([]);
    const [filterStudents,SetFilterStudents] = useState([]);
    const [filterRooms,SetFilterRooms] = useState([]);

    const [selectedLesson,SetSelectedLesson] = useState([]);

    const [tips,SetTips] = useState([]);
    const [professorIcons,SetProfessorIcons] = useState([]);
    const [professorUnavailableIcons,SetProfessorUnavailableIcons] = useState([]);
    const [groupIcons,SetGroupIcons] = useState([]);
    const [studentsIcons,SetStudentsIcons] = useState([]);
    const [studentsUnavailableIcons,SetStudentsUnavailableIcons] = useState([]);
    const [roomsIcons,SetRoomsIcons] = useState([]);

    useEffect(get_filters_info,[]);
    function show_lesson(){
        let xhr = new XMLHttpRequest();
        xhr.open("POST","https://sql.lavro.ru/call.php");
        let fd = new FormData();
        console.log(props.version.id_version);
        console.log(getStringBuilding(filterBuildings).toString());
        console.log(getStringSubject(filterSubjects).toString());
        console.log(getStringProfessor(filterProfessors).toString());
        console.log(getStringGroupNStream(filterGroupsNStreams).toString());
        console.log(getStringRooms(filterRooms).toString());
        console.log(getStringStudents(filterStudents).toString());
        console.log(monday);
        console.log(firstMonday);
        fd.append("pname","show_lesson");
        fd.append("db","284192");
        fd.append("p1",props.version.id_version);
        fd.append("p2",getStringBuilding(filterBuildings).toString());
        fd.append("p3",getStringSubject(filterSubjects).toString());
        fd.append("p4",getStringProfessor(filterProfessors).toString());
        fd.append("p5",getStringGroupNStream(filterGroupsNStreams).toString());
        fd.append("p6",getStringRooms(filterRooms).toString());
        fd.append("p7",getStringStudents(filterStudents).toString());
        fd.append("p8",monday);
        fd.append("p9",firstMonday);
        fd.append("format","rows");
        xhr.onload = show_lesson_temp;
        xhr.send(fd);
    }

    function show_lesson_temp(e){
        if (e.target.status === 200){
            let resp = JSON.parse(e.target.response);
            console.log(resp);
            if(!resp.RESULTS){
                alert("Произошла ошибка при обращении к базе данных");
            }
            else{
                if(resp.RESULTS[0].length === 0){
                    if(resp.RESULTS[1].length === 0){
                        alert("Занятий нет!");
                    }
                }
                else {
                    if(resp.RESULTS[0][0].error){
                        if(resp.RESULTS[0][0].error === "You should choose one of the filters"){
                            alert(resp.RESULTS[0][0].rus_error);
                        }
                    }
                }
                SetLessonsGroup(resp.RESULTS[0]);
                SetLessonsStream(resp.RESULTS[1]);
            }
        }
        else {
            alert("Ошибка сети. Проверьте интернет соединение") ;
        }
    }

    function show_lesson_sem(){
        let xhr = new XMLHttpRequest();
        xhr.open("POST","https://sql.lavro.ru/call.php");
        let fd = new FormData();
        fd.append("pname","show_lesson_sem");
        fd.append("db","284192");
        fd.append("p1",props.version.id_version);
        fd.append("p2",getStringBuilding(filterBuildings).toString());
        fd.append("p3",getStringSubject(filterSubjects).toString());
        fd.append("p4",getStringProfessor(filterProfessors).toString());
        fd.append("p5",getStringGroupNStream(filterGroupsNStreams).toString());
        fd.append("p6",getStringRooms(filterRooms).toString());
        fd.append("p7",getStringStudents(filterStudents).toString());
        fd.append("p8",firstMonday);
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
            if (ids.some((x) => x === arr[i].id_cluster)){
                continue;
            }
            else {
                ids.push(arr[i].id_cluster);
            }
        }
        return ids;
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

    function show_tips(){
        let xhr = new XMLHttpRequest();
        xhr.open("POST","https://sql.lavro.ru/call.php");
        let fd = new FormData();
        fd.append("pname","show_tips");
        fd.append("db","284192");
        fd.append("p1",props.version.id_version);
        fd.append("p2",selectedLesson.id_lesson);
        fd.append("p3","20" + monday);
        fd.append("p4",firstMonday);
        fd.append("format","rows");
        xhr.onload = show_tips_temp;
        xhr.send(fd);
    }

    function show_tips_temp(e){
        if (e.target.status === 200){
            let resp = JSON.parse(e.target.response);
            console.log(resp.RESULTS);
            if(!resp.RESULTS){
                alert("Произошла ошибка при обращении к базе данных");
            }
            else{
                SetTips(resp.RESULTS);
                SetProfessorIcons(resp.RESULTS[0]);
                SetProfessorUnavailableIcons(resp.RESULTS[1]);
                SetGroupIcons(resp.RESULTS[2]);
                SetStudentsIcons(resp.RESULTS[3]);
                SetStudentsUnavailableIcons(resp.RESULTS[4]);
                SetRoomsIcons(resp.RESULTS[5]);

            }

        }
        else {
            alert("Ошибка сети. Проверьте интернет соединение") ;
        }
    }

    const setM = (m) => {SetMonday(m);}
    const handleOptionSelect = (option) => {
        console.log(`Selected option: ${option}`);
    };

    function show_l(){
        if(isSemMode === true){
            show_lesson_sem()
        }
        else {
            show_lesson();
        }
    }

    function selectMode(value){
        setIsSemMode(value);
        SetLessonsGroup([]);
    }

    function clearFilters(){
        SetFilterSubjects([]);
        SetFilterGroupsNStreams([]);
        SetFilterStudents([]);
        SetFilterSubjects([]);
        SetFilterRooms([]);
        SetFilterBuildings([]);
    }

    return (
        <div>
            <div className={classes.container}>
                {props.menu}
                <div style={{display: "inline-block", float: 'right'}}>
                    <div className={classes.filters}>
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
                                     filter placeholder="Select Rooms" maxSelectedLabels={3} className="w-full md:w-10rem" />
                        <Button onClick={show_l}>Search</Button>
                    </div>


                    <div className={classes.weekSwitch}>
                        <div className={classes.divs}>
                            {isSemMode ? (
                                <Dropdown value={whichWeeksMode} onChange={(e) => setWhichWeeksMode(e.value)} options={WeeksMode} optionLabel="name"
                                          placeholder="Select a City" className="w-full md:w-14rem"/>
                            ) : (
                                <WeekSwitch setM={setM} onClick={show_l}/>
                            )}
                        </div>
                        <div className={classes.divs}>
                            <SelectButton style={{display:"inline-block"}} value={isSemMode} onChange={(e) => selectMode(e.value)} options={SemMode} optionLabel="name"/>
                        </div>
                    </div>
                    {isSemMode ? (
                        <ScheduleTableSem lessonsGroup={lessonsGroup} lessonsStream={lessonsStream}/>
                    ) : (
                        <ScheduleTable version={props.version} firstMonday={firstMonday} lessonsGroup={lessonsGroup} lessonsStream={lessonsStream} isCreateMode={isCreateMode} monday={monday} subjects={subjects} professors={professors} groupsNStreams={groupsNStreams} rooms={rooms}
                                       show_tips={show_tips} selectedLesson={selectedLesson}  setSelectedLesson={SetSelectedLesson} professorIcons={professorIcons} professorUnavailableIcons={professorUnavailableIcons} groupIcons={groupIcons} studentsIcons={studentsIcons} studentsUnavailableIcons={studentsUnavailableIcons} roomsIcons={roomsIcons}/>
                    )}
                    <div className={classes.weekSwitch}>
                        <div className={classes.divs}>
                        </div>
                        <div className={classes.divsCreateMode}>
                            <SelectButton style={{display:"inline-block"}} value={isCreateMode} onChange={(e) => SetIsCreateMode(e.value)} options={CreateMode} optionLabel="name"/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Edit;