import React, {useEffect, useState} from 'react';
import classes from './ScheduleTable.module.css';
import Modal from "../UI/Modal/Modal";
import {Dropdown} from "primereact/dropdown";
import {MultiSelect} from "primereact/multiselect";
import Button from "../UI/Button/Button";
import {InputNumber} from "primereact/inputnumber";
import TdTable from "./TdTable";
import { RadioButton } from "primereact/radiobutton";


const ScheduleTable = (props) => {
    const [modal, setModal] = useState(false);
    const [modalChangeLesson, setModalChangeLesson] = useState(false);
    const [modalMoveLesson, setModalMoveLesson] = useState(false);
    const [modalEditLesson, setModalEditLesson] = useState(false);

    const [isModeTips, setIsModeTips] = useState(false);

    const intervals = [{value:'', name:"Без повтора"},{value:7, name:" 7 дней"},{value:14, name:" 14 дней"},{value:28, name:" 28 дней"}];

    const [currDay,SetCurrDay] = useState(0);
    const [currNumL,SetCurrNumL] = useState(0);
    const [selectedLessonMonday,setSelectedLessonMonday] = useState([]);

    const [quantity,setQuantity] = useState(1);
    const [selectedInterval,SetSelectedInterval] = useState([]);
    const [selectedSubjects,SetSelectedSubjects] = useState([]);
    const [selectedProfessors,SetSelectedProfessors] = useState([]);
    const [selectedGroupsNStreams,SetSelectedGroupsNStreams] = useState([]);
    const [selectedRooms,SetSelectedRooms] = useState([]);

    const categories = [
        { name: 'Только это мероприятие', key: '1' },
        { name: 'Это и последующие мероприятия', key: '2' },
        { name: 'Все мероприятия', key: '3' },
    ];
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    function cell_info(day, num_l){
        let result = [];
        for (let i= 0; i < props.lessonsGroup.length; i++){
            if (props.lessonsGroup[i].dayofweek-1 === day && props.lessonsGroup[i].num_lesson === num_l)
            {
                if(result.some(o => o.id_lesson === props.lessonsGroup[i].id_lesson)){
                    const lesson = result.find(lesson => lesson.id_lesson === props.lessonsGroup[i].id_lesson)
                    result.pop();
                    if (lesson.name_group.includes(props.lessonsGroup[i].name_group)){
                        result.push(lesson);
                    }
                    else {
                        lesson.name_group = lesson.name_group + "," + props.lessonsGroup[i].name_group;
                        result.push(lesson);
                    }
                }
                else {
                    result.push(props.lessonsGroup[i]);
                }
            }
        }

        for (let i= 0; i < props.lessonsStream.length; i++){
            if (props.lessonsStream[i].dayofweek-1 === day && props.lessonsStream[i].num_lesson === num_l)
            {
                if(result.some(o => o.id_lesson === props.lessonsStream[i].id_lesson)){
                    const lesson = result.find(lesson => lesson.id_lesson === props.lessonsStream[i].id_lesson)
                    result.pop();
                    if (lesson.name_group.includes(props.lessonsStream[i].name_group)){
                        result.push(lesson);
                    }
                    else {
                        lesson.name_group = lesson.name_group + "," + props.lessonsStream[i].name_group;
                        result.push(lesson);
                    }
                }
                else {
                    result.push(props.lessonsStream[i]);
                }
            }
        }

        return result;
    }
    function cellTips(day, num_l) {
        let result = [];
        let professorIcon = false;
        let groupIcon = false;
        let studentsIcon = false;
        let roomIcon = false;
        for (let i= 0; i < props.professorIcons.length; i++){
            if (props.professorIcons[i].dayofweek-1 === day && props.professorIcons[i].num_lesson === num_l) {
                professorIcon = true;
            }
        }
        for (let i= 0; i < props.professorUnavailableIcons.length; i++){
            if (props.professorUnavailableIcons[i].dayofweek-1 === day && props.professorUnavailableIcons[i].num_lesson === num_l) {
                professorIcon = true;
            }
        }
        for (let i= 0; i < props.groupIcons.length; i++){
            if (props.groupIcons[i].dayofweek-1 === day && props.groupIcons[i].num_lesson === num_l) {
                groupIcon = true;
            }
        }
        for (let i= 0; i < props.studentsIcons.length; i++){
            if (props.studentsIcons[i].dayofweek-1 === day && props.studentsIcons[i].num_lesson === num_l) {
                studentsIcon = true;
            }
        }
        for (let i= 0; i < props.studentsUnavailableIcons.length; i++){
            if (props.studentsUnavailableIcons[i].dayofweek-1 === day && props.studentsUnavailableIcons[i].num_lesson === num_l) {
                studentsIcon = true;
            }
        }
        for (let i= 0; i < props.roomsIcons.length; i++){
            if (props.roomsIcons[i].dayofweek-1 === day && props.roomsIcons[i].num_lesson === num_l) {
                roomIcon = true;
            }
        }
        result.push(professorIcon);
        result.push(groupIcon);
        result.push(studentsIcon);
        result.push(roomIcon);
        return result;
    }

    function getBgColorTips(day, num_l){
        if(isModeTips){
            let tips = cellTips(day,num_l);
            if (tips[0]){
                return classes.red;
            }
            else if (tips[1]){
                return classes.red;
            }
            else if (tips[2]){
                return classes.yellow;
            }
            else if (tips[3]){
                return classes.yellow;
            }
            else {
                return classes.green;
            }
        }
        else {
            return classes.white;
        }
    }


    console.log(selectedRooms);
    function create_lesson(day,num_l){
        let xhr = new XMLHttpRequest();
        xhr.open("POST","https://sql.lavro.ru/call.php");
        let fd = new FormData();
        fd.append("pname","create_lesson");
        fd.append("db","284192");
        fd.append("p1",props.version.id_version);
        fd.append("p2",selectedRooms.id_cluster.toString());
        fd.append("p3",num_l);
        fd.append("p4",selectedSubjects.id_subject.toString());
        fd.append("p5",selectedProfessors.isu_id_professor.toString());
        fd.append("p6",selectedInterval.toString());
        fd.append("p7",formatDateFul(new Date(date.addDays(day-1))));
        fd.append("p8",quantity);
        fd.append("p9",getStringGroupNStream(selectedGroupsNStreams).toString());
        fd.append("format","rows");
        xhr.onload = create_lesson_temp;
        xhr.send(fd);
    }

    function create_lesson_temp(e){
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
                            alert(resp.RESULTS[0][0].rus_error);
                    }
                    else {
                        alert("Занятие успешно создано!")
                    }

                }

            }

        }
        else {
            alert("Ошибка сети. Проверьте интернет соединение") ;
        }
    }

    function move_lesson(){
        let xhr = new XMLHttpRequest();
        xhr.open("POST","https://sql.lavro.ru/call.php");
        let fd = new FormData();
        fd.append("pname","move_lesson");
        fd.append("db","284192");
        fd.append("p1",props.version.id_version);
        fd.append("p2",props.selectedLesson.id_lesson);
        fd.append("p3",formatDateFul(new Date(date.addDays(currDay-1))));
        fd.append("p4",currNumL);
        fd.append("p5",props.selectedLesson.id_cluster);
        fd.append("p6",selectedLessonMonday);
        fd.append("p7",selectedCategory.key);
        fd.append("format","rows");
        xhr.onload = move_lesson_temp;
        xhr.send(fd);
    }

    function move_lesson_temp(e){
        if (e.target.status === 200){
            let resp = JSON.parse(e.target.response);
            console.log(resp.RESULTS);
            if(!resp.RESULTS){
                alert("Произошла ошибка при обращении к базе данных");
            }
            else{
                
            }

        }
        else {
            alert("Ошибка сети. Проверьте интернет соединение") ;
        }
    }

    function edit_lesson(){
        let xhr = new XMLHttpRequest();
        xhr.open("POST","https://sql.lavro.ru/call.php");
        let fd = new FormData();
        console.log(selectedInter(selectedInterval));
        fd.append("pname","edit_lesson");
        fd.append("db","284192");
        fd.append("p1",props.version.id_version);
        fd.append("p2",props.selectedLesson.id_lesson);
        fd.append("p3",selectedRooms.id_cluster.toString());
        fd.append("p4",selectedProfessors.isu_id_professor.toString());
        fd.append("p5",selectedInter(selectedInterval));
        fd.append("p6",quantity);
        fd.append("p7",getStringGroupNStream(selectedGroupsNStreams).toString());
        fd.append("format","rows");
        xhr.onload = edit_lesson_temp;
        xhr.send(fd);
    }

    function selectedInter(i){
        if (i === null){
            return "NULL";
        }
        else {
            return i.toString();
        }

    }

    function edit_lesson_temp(e){
        if (e.target.status === 200){
            let resp = JSON.parse(e.target.response);
            console.log(resp.RESULTS);
            if(!resp.RESULTS){
                alert("Произошла ошибка при обращении к базе данных");
            }
            else{

            }

        }
        else {
            alert("Ошибка сети. Проверьте интернет соединение") ;
        }
    }


    function getStringGroupNStream(arr){
        let ids = [];
        for(let i = 0; i < arr.length; i++){
            ids.push(arr[i].name);
        }
        return ids;
    }


    const handleRowClick = (day,num_l) => {
        if(props.isCreateMode){
            setModal(true);
            SetCurrDay(day);
            SetCurrNumL(num_l);

        }
        else {
            if(isModeTips){
                setModalMoveLesson(true);
                SetCurrDay(day);
                SetCurrNumL(num_l);
            }
        }
    };

    const handleCreateLessonButtonClick = (day,num_l) => {
            create_lesson(day,num_l);
    };
    const handleChangeLessonButtonClick = () => {
        setModalChangeLesson(false);
        SetSelectedRooms(props.rooms.find(room => room.id_cluster === props.selectedLesson.id_cluster));
        SetSelectedProfessors(props.professors.find(professor => professor.isu_id_professor === props.selectedLesson.isu_id_professor));
        SetSelectedInterval(props.selectedLesson.inter);
        setQuantity(props.selectedLesson.quantity);
        setModalEditLesson(true);
    };
    const handleMoveLessonButtonClick = () => {
        setIsModeTips(true);
        setModalChangeLesson(false);
        props.show_tips();
    };

    const handleLessonClick = (lesson) => {
        props.setSelectedLesson(lesson);
        setModalChangeLesson(true);
        setSelectedLessonMonday(props.monday);
    };

    const handleCancelMoveLessonButton = () => {
        setModalMoveLesson(false);
        setIsModeTips(false);
        props.setSelectedLesson([]);
    };
    const handleAcceptMoveLessonButton = () => {
        setModalMoveLesson(false);
        setIsModeTips(false);
        props.setSelectedLesson([]);
        move_lesson();
    };
    const handleCancelEditLessonButton = () => {
        setModalEditLesson(false);
        props.setSelectedLesson([]);
    };
    const handleAcceptEditLessonButton = () => {
        setModalEditLesson(false);
        props.setSelectedLesson([]);
        edit_lesson();
    };

    function formatDateFul(date) {
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return yy + '-' + mm + '-' + dd;
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
                    <TdTable day={1} num_l={1} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(1,1)}/>
                    <TdTable day={2} num_l={1} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(2,1)}/>
                    <TdTable day={3} num_l={1} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(3,1)}/>
                    <TdTable day={4} num_l={1} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(4,1)}/>
                    <TdTable day={5} num_l={1} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(5,1)}/>
                    <TdTable day={6} num_l={1} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(6,1)}/>
                </tr>
                <tr>
                    <td>10:00 - 11:30</td>
                    <TdTable day={1} num_l={2} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(1,2)}/>
                    <TdTable day={2} num_l={2} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(2,2)}/>
                    <TdTable day={3} num_l={2} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(3,2)}/>
                    <TdTable day={4} num_l={2} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(4,2)}/>
                    <TdTable day={5} num_l={2} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(5,2)}/>
                    <TdTable day={6} num_l={2} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(6,2)}/>
                </tr>
                <tr>
                    <td>11:40 - 13:10</td>
                    <TdTable day={1} num_l={3} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(1,3)}/>
                    <TdTable day={2} num_l={3} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(2,3)}/>
                    <TdTable day={3} num_l={3} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(3,3)}/>
                    <TdTable day={4} num_l={3} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(4,3)}/>
                    <TdTable day={5} num_l={3} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(5,3)}/>
                    <TdTable day={6} num_l={3} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(6,3)}/>
                </tr>
                <tr>
                    <td>13:30 - 15:00</td>
                    <TdTable day={1} num_l={4} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(1,4)}/>
                    <TdTable day={2} num_l={4} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(2,4)}/>
                    <TdTable day={3} num_l={4} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(3,4)}/>
                    <TdTable day={4} num_l={4} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(4,4)}/>
                    <TdTable day={5} num_l={4} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(5,4)}/>
                    <TdTable day={6} num_l={4} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(6,4)}/>

                </tr>
                <tr>
                    <td>15:20 - 16:50</td>
                    <TdTable day={1} num_l={5} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(1,5)}/>
                    <TdTable day={2} num_l={5} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(2,5)}/>
                    <TdTable day={3} num_l={5} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(3,5)}/>
                    <TdTable day={4} num_l={5} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(4,5)}/>
                    <TdTable day={5} num_l={5} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(5,5)}/>
                    <TdTable day={6} num_l={5} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(6,5)}/>
                </tr>
                <tr>
                    <td>17:00 - 18:30</td>
                    <TdTable day={1} num_l={6} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(1,6)}/>
                    <TdTable day={2} num_l={6} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(2,6)}/>
                    <TdTable day={3} num_l={6} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(3,6)}/>
                    <TdTable day={4} num_l={6} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(4,6)}/>
                    <TdTable day={5} num_l={6} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(5,6)}/>
                    <TdTable day={6} num_l={6} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(6,6)}/>

                </tr>
                <tr>
                    <td>18:40 - 20:10</td>
                    <TdTable day={1} num_l={7} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(1,7)}/>
                    <TdTable day={2} num_l={7} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(2,7)}/>
                    <TdTable day={3} num_l={7} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(3,7)}/>
                    <TdTable day={4} num_l={7} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(4,7)}/>
                    <TdTable day={5} num_l={7} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(5,7)}/>
                    <TdTable day={6} num_l={7} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(6,7)}/>
                </tr>
                <tr>
                    <td>20:20 - 21:50</td>
                    <TdTable day={1} num_l={8} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(1,8)}/>
                    <TdTable day={2} num_l={8} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(2,8)}/>
                    <TdTable day={3} num_l={8} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(3,8)}/>
                    <TdTable day={4} num_l={8} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(4,8)}/>
                    <TdTable day={5} num_l={8} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(5,8)}/>
                    <TdTable day={6} num_l={8} handleRowClick={handleRowClick} handleLessonClick={handleLessonClick} cell_info={cell_info} isModeTips={isModeTips} cellTips={cellTips} selected={props.selectedLesson} className={getBgColorTips(6,8)}/>
                </tr>
                </tbody>
            </table>

            <Modal visible={modal} setVisible={setModal}>
                <Dropdown value={selectedSubjects} onChange={(e) => SetSelectedSubjects(e.value)} options={props.subjects} optionLabel="name_subject"
                          filter placeholder="Select a Subject" className="w-full md:w-14rem" />
                <Dropdown value={selectedProfessors} onChange={(e) => SetSelectedProfessors(e.value)} options={props.professors} optionLabel="name_professor"
                          filter placeholder="Select a Professor" className="w-full md:w-14rem" />
                <MultiSelect value={selectedGroupsNStreams} onChange={(e) => SetSelectedGroupsNStreams(e.value)} options={props.groupsNStreams} optionLabel="name"
                             filter placeholder="Select Gruops/Streams" maxSelectedLabels={3} className="w-full md:w-20rem" />
                <Dropdown value={selectedRooms} onChange={(e) => SetSelectedRooms(e.value)} options={props.rooms} optionLabel="num_room"
                          filter placeholder="Select a Room" className="w-full md:w-14rem" />
                <Dropdown value={selectedInterval} onChange={(e) => SetSelectedInterval(e.value)} options={intervals} optionLabel="name"
                           placeholder="Select an Interval" className="w-full md:w-14rem" />
                <InputNumber value={quantity} onValueChange={(e) => setQuantity(e.value)} />
                <Button onClick={() => handleCreateLessonButtonClick(currDay,currNumL)}>Создать</Button>
            </Modal>
            <Modal visible={modalChangeLesson} setVisible={setModalChangeLesson}>
                <div>
                    <div>{props.selectedLesson.name_subject}</div>
                    <div>{props.selectedLesson.name_professor}</div>
                    <div>{props.selectedLesson.num_room},{props.selectedLesson.address}</div>
                    {props.selectedLesson.name_stream ? (
                        <div>{props.selectedLesson.name_stream}</div>
                    ) : (
                        <div>{props.selectedLesson.name_group}</div>
                    )}
                    <Button onClick={() => handleChangeLessonButtonClick()}>Изменить</Button>
                    <Button onClick={() => handleMoveLessonButtonClick()}>Перенести</Button>
                </div>
            </Modal>
            <Modal visible={modalMoveLesson} setVisible={setModalMoveLesson}>
                <div>
                    Изменение повторяющегося мероприятия
                    {categories.map((category) => {
                        return (
                            <div key={category.key} className="flex align-items-center">
                                <RadioButton inputId={category.key} name="category" value={category} onChange={(e) => setSelectedCategory(e.value)} checked={selectedCategory.key === category.key} />
                                <label htmlFor={category.key} className="ml-2">{category.name}</label>
                            </div>
                        );
                    })}
                    <Button onClick={() => handleCancelMoveLessonButton()}>Отмена</Button>
                    <Button onClick={() => handleAcceptMoveLessonButton()}>ОК</Button>
                </div>
            </Modal>
            <Modal visible={modalEditLesson} setVisible={setModalEditLesson}>
                <div>
                    <Dropdown value={selectedProfessors} onChange={(e) => SetSelectedProfessors(e.value)} options={props.professors} optionLabel="name_professor"
                              filter placeholder="Select a Professor" className="w-full md:w-14rem" />
                    <MultiSelect value={selectedGroupsNStreams} onChange={(e) => SetSelectedGroupsNStreams(e.value)} options={props.groupsNStreams} optionLabel="name"
                                 filter placeholder="Select Gruops/Streams" maxSelectedLabels={3} className="w-full md:w-20rem" />
                    <Dropdown value={selectedRooms} onChange={(e) => SetSelectedRooms(e.value)} options={props.rooms} optionLabel="num_room"
                              filter placeholder="Select a Room" className="w-full md:w-14rem" />
                    <Dropdown value={selectedInterval} onChange={(e) => SetSelectedInterval(e.value)} options={intervals} optionLabel="name"
                              placeholder="Select an Interval" className="w-full md:w-14rem" />
                    <InputNumber value={quantity} onValueChange={(e) => setQuantity(e.value)} />
                    <Button onClick={() => handleCancelEditLessonButton()}>Отмена</Button>
                    <Button onClick={() => handleAcceptEditLessonButton()}>Сохранить</Button>
                </div>
            </Modal>
        </div>
    );
};

export default ScheduleTable;