import React from 'react';
import LessonCell from "./Lesson_cell";
import LessonCellTips from "./Lesson_cell_tips";

const TdTable = (props) => {


    return (
        <td onClick={() => props.handleRowClick(props.day,props.num_l)} className={props.className}>
            {props.cell_info(props.day,props.num_l).map((l,index) => <LessonCell lesson={l} key={index}  onClick={props.handleLessonClick} selected={props.selected}/>)}
            {props.isModeTips ? (<LessonCellTips tips={props.cellTips(props.day,props.num_l)}/>) : (<div></div>)}
        </td>
    );
};

export default TdTable;