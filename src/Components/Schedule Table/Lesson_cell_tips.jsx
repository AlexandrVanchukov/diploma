import React from 'react';

const LessonCellTips = (props) => {
    return (
        <div>
            {props.tips[0] ? (
                <span>p</span>
            ) : (
                <span></span>
            )}

            {props.tips[1] ? (
                <span>g</span>
            ) : (
                <span></span>
            )}

            {props.tips[2] ? (
                <span>s</span>
            ) : (
                <span></span>
            )}

            {props.tips[3] ? (
                <span>r</span>
            ) : (
                <span></span>
            )}
        </div>
    );
};

export default LessonCellTips;