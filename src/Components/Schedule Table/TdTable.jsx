import React from 'react';
import LessonCell from "./Lesson_cell";
import LessonCellTips from "./Lesson_cell_tips";

const TdTable = (props) => {

    function hasDuplicateFields(array, fieldName) {
        const encounteredFields = {};
        const nameCounts = {};
        if (array[0][fieldName]){
            if(fieldName === "name_group" || fieldName === "name_stream"){
                for (let i = 0; i < array.length; i++) {
                    const element = array[i];
                    const field = element[fieldName];

                    if (typeof field === 'string') {
                        const names = field.split(',');

                        for (const name of names) {
                            if (nameCounts[name]) {
                                return true; // Return true immediately if repetition is found
                            } else {
                                nameCounts[name] = 1;
                            }
                        }
                    }
                }

                return false;
            }
            else{
                for (let i = 0; i < array.length; i++) {
                    const element = array[i];
                    const field = element[fieldName];

                    if (encounteredFields[field]) {
                        return true; // Found a duplicate field
                    } else {
                        encounteredFields[field] = true; // Mark field as encountered
                    }
                }
            }
        }
        else {
            return false
        }
        return false; // No duplicate fields found
    }

    function hasCollusion(){
        if (hasDuplicateFields(props.cell_info(props.day,props.num_l),"isu_id_professor")){
            console.log("collusion pro");
            return true;
        }
        else if(hasDuplicateFields(props.cell_info(props.day,props.num_l),"name_group")){
            console.log("collusion group");
            return true;
        }
        else if(hasDuplicateFields(props.cell_info(props.day,props.num_l),"name_stream")){
            console.log("collusion stream");
            return true;
        }
        else if(hasDuplicateFields(props.cell_info(props.day,props.num_l),"num_room")){
            console.log("collusion room");
            return true;
        }
        else {
            return false;
        }
    }

    return (
        <td onClick={() => props.handleRowClick(props.day,props.num_l)} className={props.className}>
            {props.cell_info(props.day,props.num_l).map((l,index) => <LessonCell lesson={l} key={index} hasCollusion={hasCollusion} onClick={props.handleLessonClick} selected={props.selected}/>)}
            {props.isModeTips ? (<LessonCellTips tips={props.cellTips(props.day,props.num_l)}/>) : (<div></div>)}
        </td>
    );
};

export default TdTable;