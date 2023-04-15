import React, {useEffect, useState} from "react";

import ScheduleTable from "./Components/Schedule Table/scheduleTable";
import Menu from "./Components/menu";
import MultiDropdown from "./Components/UI/Dropdown/MultiDropdown";
import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
function App() {

   const firstMonday='2023-02-06';

  //let lessons = [];
  const [lessons,SetLessons] = useState([]);
  const [subjects,SetSubjects] = useState([]);
  const [filterSubjects,SetFilterSubjects] = useState([]);
  //let subjects = [];
    show_lesson();


    useEffect(get_subjects,[]);
    console.log(getString(filterSubjects).toString());

    function show_lesson(){
        let xhr = new XMLHttpRequest();
        xhr.open("POST","https://sql.lavro.ru/call.php");
        let fd = new FormData();
        fd.append("pname","show_lesson");
        fd.append("db","284192");
        fd.append("p1",'6');
        fd.append("p2",'8');
        fd.append("p3",getString(filterSubjects).toString());
        fd.append("p4",'');
        fd.append("p5",'');
        fd.append("p6",'');
        fd.append("p7",'');
        fd.append("p8",'2023-04-03');
        fd.append("p9",firstMonday);
        fd.append("format","rows");
        xhr.onload = show_lesson_temp;
        xhr.send(fd);
    }
    function getString(arr){
        let ids = [];
        for(let i = 0; i < arr.length; i++){
            ids.push(arr[i].id_subject);
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
                console.log(lessons);
            }

        }
        else {
            alert("Ошибка сети. Проверьте интернет соединение") ;
        }
    }

    function get_subjects(){
        let xhr = new XMLHttpRequest();
        xhr.open("POST","https://sql.lavro.ru/call.php");
        let fd = new FormData();
        fd.append("pname","getSubjects");
        fd.append("db","284192");
        fd.append("format","rows");
        xhr.onload = get_subjects_temp;
        xhr.send(fd);
    }



    function get_subjects_temp(e){
        if (e.target.status === 200){
            let resp = JSON.parse(e.target.response);

            if(!resp.RESULTS){
                alert("Произошла ошибка при обращении к базе данных");
            }
            else{
                SetSubjects(resp.RESULTS[0]);
            }
        }
        else {
            alert("Ошибка сети. Проверьте интернет соединение") ;
        }
    }
  const handleOptionSelect = (option) => {
    console.log(`Selected option: ${option}`);
  };

  const addNewFilterSubject = (newFilterSubject) => {
      console.log("До добавления " + filterSubjects);
      console.log("Что добавляли " + newFilterSubject);
      SetFilterSubjects(newFilterSubject[0]);
      console.log("Что добавляли " + newFilterSubject);
      console.log("После добавления " + filterSubjects);
    }
 /*   const deleteNewFilterSubject = (newFilterSubject) => {
        console.log("До удаления " + filterSubjects);
        SetFilterSubjects(filterSubjects.slice(filterSubjects.indexOf(newFilterSubject),1));
        console.log("Что удаляли " + newFilterSubject);
        console.log("После удаления " + filterSubjects);
    }
*/
  return (
    <div className="App">
        <div style={{minWidth: "300px", display: "inline-block"}}>
            <Menu/>
        </div>
        <div style={{display: "inline-block"}}>
            <div>
                {<MultiDropdown name={"Дисциплина"} add={addNewFilterSubject}>
                    {
                        subjects.map(subject => (
                            <option key={subject.id_subject} value={subject.id_subject} id={subject.type + " " + subject.name}>
                                {subject.type}  {subject.name}
                            </option>
                        ))
                    }
                </MultiDropdown>}
            </div>
            <MultiSelect value={filterSubjects} onChange={(e) => SetFilterSubjects(e.value)} options={subjects} optionLabel="name"
                         filter placeholder="Select Cities" maxSelectedLabels={3} className="w-full md:w-20rem" />
            <ScheduleTable lessons={lessons}/>
        </div>

    </div>
  );
}
export default App;