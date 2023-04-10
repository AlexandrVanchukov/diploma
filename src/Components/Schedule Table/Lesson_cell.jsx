import React from 'react';

const LessonCell = (props) => {
    return (
        <div style={{backgroundColor: "#ff851d"}}>
            <p>{props.lesson.id_lesson}</p>
            <p>{props.lesson.num_room}</p>
            <p>{props.lesson.name_group}</p>
            <p>{props.lesson.type}</p>
        </div>
    );
};

export default LessonCell;