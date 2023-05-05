import React from 'react';
import professorIcon from '../UI/Icons/professor.svg'
import groupIcon from '../UI/Icons/group.svg'
import roomIcon from '../UI/Icons/room.svg'
import studentIcon from '../UI/Icons/student.svg'
const LessonCellTips = (props) => {



    return (
        <div style={{float:"right"}}>
            {props.tips[0] ? (
                <img src={professorIcon} style={{paddingRight:"5px"}}/>
            ) : (
                <span></span>
            )}

            {props.tips[1] ? (
                <img src={groupIcon} style={{paddingRight:"5px"}}/>
            ) : (
                <span></span>
            )}

            {props.tips[2] ? (
                <img src={studentIcon} style={{paddingRight:"5px"}}/>
            ) : (
                <span></span>
            )}

            {props.tips[3] ? (
                <img src={roomIcon} style={{paddingRight:"5px"}}/>
            ) : (
                <span></span>
            )}
        </div>
    );
};

export default LessonCellTips;