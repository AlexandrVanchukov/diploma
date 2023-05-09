import React, {useEffect, useState} from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import Edit from "./Components/Pages/Edit/Edit";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import TreeVersion from "./Components/Pages/Tree/TreeVersion";
import classes from "./App.module.css";
import ScheduleTableSem from "./Components/Schedule Table/scheduleTableSem";
import ScheduleTable from "./Components/Schedule Table/scheduleTable";
import Compare from "./Components/Pages/Compare/Compare";
import RoomsAvailable from "./Components/Pages/Rooms Available/RoomsAvailable";
import ProfessorsAvailable from "./Components/Pages/Professors Available/ProfessorsAvailable";
import StreamsAvailable from "./Components/Pages/Streams Available/StreamsAvailable";
import StudentsAvailable from "./Components/Pages/Students Available/StudentsAvailable";

function App() {

    const [semester, SetSemester] = useState();
    const [version,SetVersion] = useState();

    const setSem = (d) =>{SetSemester(d)}
    const setVer = (v) =>{SetVersion(v)}


  return (
    <div className="App">
        <Router>
            <div className="App">
                <div className={classes.begin}><Link className={classes.menuLink} to="/tree">Начать</Link></div>
                {version ? (
                    <div>
                        Семестр: {semester.first_monday + " "}
                        Версия: {version.id_version + " " + version.title}
                    </div>
                ) : (
                    <div></div>
                )}
                <Routes>
                    <Route exact path='/edit' element={<Edit firstM={semester} version={version} menu={<div className={classes.menu}>
                        <div className={classes.menuItemSelected}><Link className={classes.menuLink} to="/edit">Внести изменения</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/tree">Дерево версий</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/compare">Сравнение версий</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/rooms">Занятость аудиторий</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/professors">Занятость преподавателей</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/groups">Занятость групп/потоков</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/students">Занятость студентов</Link></div>
                    </div>}/>}></Route>
                    <Route exact path='/tree' element={<TreeVersion semester={semester} version={version} setSem={setSem} setVer={setVer} menu={<div className={classes.menu}>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/edit">Внести изменения</Link></div>
                        <div className={classes.menuItemSelected}><Link className={classes.menuLink} to="/tree">Дерево версий</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/compare">Сравнение версий</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/rooms">Занятость аудиторий</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/professors">Занятость преподавателей</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/groups">Занятость групп/потоков</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/students">Занятость студентов</Link></div>
                    </div>}/>}></Route>
                    <Route exact path='/compare' element={<Compare semester={semester} version={version} menu={<div className={classes.menu}>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/edit">Внести изменения</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/tree">Дерево версий</Link></div>
                        <div className={classes.menuItemSelected}><Link className={classes.menuLink} to="/compare">Сравнение версий</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/rooms">Занятость аудиторий</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/professors">Занятость преподавателей</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/groups">Занятость групп/потоков</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/students">Занятость студентов</Link></div>
                    </div>}/>}></Route>
                    <Route exact path='/rooms' element={<RoomsAvailable semester={semester} version={version} menu={<div className={classes.menu}>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/edit">Внести изменения</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/tree">Дерево версий</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/compare">Сравнение версий</Link></div>
                        <div className={classes.menuItemSelected}><Link className={classes.menuLink} to="/rooms">Занятость аудиторий</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/professors">Занятость преподавателей</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/groups">Занятость групп/потоков</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/students">Занятость студентов</Link></div>
                    </div>}/>}></Route>
                    <Route exact path='/professors' element={<ProfessorsAvailable semester={semester} version={version} menu={<div className={classes.menu}>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/edit">Внести изменения</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/tree">Дерево версий</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/compare">Сравнение версий</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/rooms">Занятость аудиторий</Link></div>
                        <div className={classes.menuItemSelected}><Link className={classes.menuLink} to="/professors">Занятость преподавателей</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/groups">Занятость групп/потоков</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/students">Занятость студентов</Link></div>
                    </div>}/>}></Route>
                    <Route exact path='/groups' element={<StreamsAvailable semester={semester} version={version} menu={<div className={classes.menu}>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/edit">Внести изменения</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/tree">Дерево версий</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/compare">Сравнение версий</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/rooms">Занятость аудиторий</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/professors">Занятость преподавателей</Link></div>
                        <div className={classes.menuItemSelected}><Link className={classes.menuLink} to="/groups">Занятость групп/потоков</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/students">Занятость студентов</Link></div>
                    </div>}/>}></Route>
                    <Route exact path='/students' element={<StudentsAvailable semester={semester} version={version} menu={<div className={classes.menu}>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/edit">Внести изменения</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/tree">Дерево версий</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/compare">Сравнение версий</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/rooms">Занятость аудиторий</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/professors">Занятость преподавателей</Link></div>
                        <div className={classes.menuItem}><Link className={classes.menuLink} to="/groups">Занятость групп/потоков</Link></div>
                        <div className={classes.menuItemSelected}><Link className={classes.menuLink} to="/students">Занятость студентов</Link></div>
                    </div>}/>}></Route>
                </Routes>
            </div>
        </Router>
    </div>
  );
}
export default App;