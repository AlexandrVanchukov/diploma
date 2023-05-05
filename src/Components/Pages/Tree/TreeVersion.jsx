import React, {useEffect, useState} from 'react';
import classes from "../Edit/Edit.module.css";
import {MultiSelect} from "primereact/multiselect";
import Button from "../../UI/Button/Button";
import {Dropdown} from "primereact/dropdown";
import WeekSwitch from "../../UI/WeekSwitch/WeekSwitch";
import {SelectButton} from "primereact/selectbutton";
import ScheduleTableSem from "../../Schedule Table/scheduleTableSem";
import ScheduleTable from "../../Schedule Table/scheduleTable";
import Tree from 'react-d3-tree';

const TreeVersion = (props) => {
    const [semesters,setSemesters] = useState([]);
    const [whichSemester,setWhichSemester] = useState([]);

    const [versions,setVersions] = useState();
    const [whichVersion,setWhichVersion] = useState(props.version);

    const transformData = (data) => {
        if(data.length === 1){
            return {name: data[0].id_version + " " + data[0].title, children: [] };
        }
        const treeData = {};

        // First, create a map of versions keyed by ID
        const versionMap = {};
        data.forEach((version) => {
            const { id_version, id_version_parent, title } = version;
            versionMap[id_version] = {name: id_version + " " + title, children: [] };
            if (id_version_parent === id_version) {
                treeData[id_version] = versionMap[id_version];
            }
        });

        // Then, add each version to its parent's children array
        data.forEach((version) => {
            const { id_version, id_version_parent } = version;
            if (id_version_parent !== id_version) {
                versionMap[id_version_parent].children.push(versionMap[id_version]);
            }
        });

        // Finally, return the root version (which has no parent) as the top level of the tree
        return treeData[1];
    };

    const expandNode = (node, _expandedKeys) => {
        if (node.children && node.children.length) {
            _expandedKeys[node.key] = true;

            for (let child of node.children) {
                expandNode(child, _expandedKeys);
            }
        }
    };

    useEffect(get_semesters,[]);
    function get_semesters(){
        let xhr = new XMLHttpRequest();
        xhr.open("POST","https://sql.lavro.ru/call.php");
        let fd = new FormData();
        fd.append("pname","getSemesters");
        fd.append("db","284192");
        fd.append("format","rows");
        xhr.onload = get_semesters_temp;
        xhr.send(fd);
    }

    function get_semesters_temp(e){
        if (e.target.status === 200){
            let resp = JSON.parse(e.target.response);
            if(!resp.RESULTS){
                alert("Произошла ошибка при обращении к базе данных");
            }
            else{
                setSemesters(resp.RESULTS[0])
            }
        }
        else {
            alert("Ошибка сети. Проверьте интернет соединение") ;
        }
    }

    function get_versions(value){
        setWhichSemester(value);
        props.setSem(value);
        let xhr = new XMLHttpRequest();
        xhr.open("POST","https://sql.lavro.ru/call.php");
        let fd = new FormData();
        fd.append("pname","getVersions");
        fd.append("db","284192");
        fd.append("p1",value.id_root_version);
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
        props.setVer(value);
    }

    return (
        <div>
            <div className={classes.container}>
                {props.menu}
                <div>
                    <Dropdown value={whichSemester} onChange={(e) => get_versions(e.value)} options={semesters} optionLabel="first_monday"
                              placeholder="Select a Semester" className="w-full md:w-14rem"/>
                    <Dropdown value={whichVersion} onChange={(e) => pickVersion(e.value)} options={versions} optionLabel="title"
                              placeholder="Select a Version" className="w-full md:w-14rem"/>
                    {versions ? (
                        <div>Версии есть
                            <div style={{ width: '100%', height: '100vh' }}>
                                <Tree data={transformData(versions)} orientation="vertical" />
                            </div>
                        </div>
                    ) : (
                        <div>Выберите семестр</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TreeVersion;