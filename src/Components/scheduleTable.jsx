import React from 'react';
import classes from './ScheduleTable.module.css';

const ScheduleTable = () => {
    return (
        <div>
            <table className={classes.schedule}>
                <thead>
                <tr>
                    <th style={{width: "50px"}}></th>
                    <th>Пн</th>
                    <th>Вт</th>
                    <th>Ср</th>
                    <th>Чт</th>
                    <th>Пт</th>
                    <th>Сб</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Row 1, Column 1</td>
                    <td>Row 1, Column 1</td>
                    <td>Row 1, Column 2</td>
                    <td>Row 1, Column 3</td>
                    <td>Row 1, Column 4</td>
                    <td>Row 1, Column 5</td>
                    <td>Row 1, Column 6</td>
                </tr>
                <tr>
                    <td>Row 1, Column 1</td>
                    <td>Row 2, Column 1</td>
                    <td>Row 2, Column 2</td>
                    <td>Row 2, Column 3</td>
                    <td>Row 2, Column 4</td>
                    <td>Row 2, Column 5</td>
                    <td>Row 2, Column 6</td>
                </tr>
                <tr>
                    <td>Row 1, Column 1</td>
                    <td>Row 3, Column 1</td>
                    <td>Row 3, Column 2</td>
                    <td>Row 3, Column 3</td>
                    <td>Row 3, Column 4</td>
                    <td>Row 3, Column 5</td>
                    <td>Row 3, Column 6</td>
                </tr>
                <tr>
                    <td>Row 1, Column 1</td>
                    <td>Row 4, Column 1</td>
                    <td>Row 4, Column 2</td>
                    <td>Row 4, Column 3</td>
                    <td>Row 4, Column 4</td>
                    <td>Row 4, Column 5</td>
                    <td>Row 4, Column 6</td>
                </tr>
                <tr>
                    <td>Row 1, Column 1</td>
                    <td>Row 5, Column 1</td>
                    <td>Row 5, Column 2</td>
                    <td>Row 5, Column 3</td>
                    <td>Row 5, Column 4</td>
                    <td>Row 5, Column 5</td>
                    <td>Row 5, Column 6</td>
                </tr>
                <tr>
                    <td>Row 1, Column 1</td>
                    <td>Row 6, Column 1</td>
                    <td>Row 6, Column 2</td>
                    <td>Row 6, Column 3</td>
                    <td>Row 6, Column 4</td>
                    <td>Row 6, Column 5</td>
                    <td>Row 6, Column 6</td>
                </tr>
                <tr>
                    <td>Row 1, Column 1</td>
                    <td>Row 7, Column 1</td>
                    <td>Row 7, Column 2</td>
                    <td>Row 7, Column 3</td>
                    <td>Row 7, Column 4</td>
                    <td>Row 7, Column 5</td>
                    <td>Row 7, Column 6</td>
                </tr>
                <tr>
                    <td>Row 1, Column 1</td>
                    <td>Row 8, Column 1</td>
                    <td>Row 8, Column 2</td>
                    <td>Row 8, Column 3</td>
                    <td>Row 8, Column 4</td>
                    <td>Row 8, Column 5</td>
                    <td>Row 8, Column 6</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleTable;