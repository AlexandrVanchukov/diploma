import React, {useState} from 'react';
import Button from "../Button/Button";
import classes from "./WeekSwitch.module.css";
import { AiFillCaretLeft } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";

const WeekSwitch = ({setM,...props}) => {
    Date.prototype.getWeek = function() {
        let onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    }
    const curr = new Date;
    const [monday,SetMonday] = useState(curr.getDate() - curr.getDay()+1);
    const nextWeek = () => SetMonday(monday + 7);
    const prevWeek = () => SetMonday(monday - 7);
    function formatDate(date) {
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return yy + '-' + mm + '-' + dd;
    }

    let firstDateOfWeekStr = formatDate(new Date(curr.setDate(monday)));
    let lastDateOfWeekStr = formatDate(new Date(curr.setDate(monday+7)));

    setM(firstDateOfWeekStr);
    return (
        <div className={classes.weekSwitch}>
            <button className={classes.arrow} onClick={prevWeek}><AiFillCaretLeft/></button>
            <span>{firstDateOfWeekStr.substring(6,8)} - {lastDateOfWeekStr.substring(6,8)} </span>
            <button className={classes.arrow} onClick={nextWeek}><AiFillCaretRight/></button>
        </div>
    );
};

export default WeekSwitch;