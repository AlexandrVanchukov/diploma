import React, {useEffect, useState} from "react";
import MultiChoiceDropdown from './Components/MultiChoiceDropdown';
import ScheduleTable from "./Components/Schedule Table/scheduleTable";
import Menu from "./Components/menu";
function App() {

  const options = ['Option 1', 'Option 2', 'Option 3'];
  const firstMonday='2023-02-06';
  //let lessons = [];
  const [lessons,SetLessons] = useState([]);
//setInterval(()=>show_lesson(),5000);
    show_lesson();
    function show_lesson(){
        let xhr = new XMLHttpRequest();
        xhr.open("POST","https://sql.lavro.ru/call.php");
        let fd = new FormData();
        fd.append("pname","show_lesson");
        fd.append("db","284192");
        fd.append("p1",'6');
        fd.append("p2",'8');
        fd.append("p3",'16');
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


    function show_lesson_temp(e){
        if (e.target.status === 200){
            let resp = JSON.parse(e.target.response);
            console.log(resp.RESULTS);
            if(!resp.RESULTS){
                alert("Произошла ошибка при обращении к базе данных");
            }
            else{
                if(resp.RESULTS[0][0].error){
                    if(resp.RESULTS[0][0].error=="You should choose one of the filters"){
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

  const handleOptionSelect = (option) => {
    console.log(`Selected option: ${option}`);
  };
  return (
    <div className="App">
        <div style={{minWidth: "300px", display: "inline-block"}}>
            <Menu/>
        </div>
        <div style={{display: "inline-block"}}>
            <div>
            <MultiChoiceDropdown options={options} onSelect={handleOptionSelect} />
            </div>
            <ScheduleTable lessons={lessons}/>
        </div>
    </div>
  );
}
export default App;