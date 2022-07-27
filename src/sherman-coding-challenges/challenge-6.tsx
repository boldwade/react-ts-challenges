import React, { useState } from "react";

type ListItem = { [key: string]: boolean };
type ToDoList = { [key: string]: Array<ListItem> };

const INITIAL_LIST: ToDoList = {
    "Organize closet": [
        { "Donate old clothes and shoes": false },
        { "Buy new shelf": false },
        { "Put in shelf by color": false },
    ],
    "Finish homework": [
        { "Finish math homework": false },
        { "Finish science homework": false },
        { "Finish Reactjs homework": false },
    ],
    "Achieve nirvana": [
        { "Meditate a little": false },
        { "Gain some wisdom": false },
    ],
};

export const Challenge6 = () => {
    const [list, setList] = useState(INITIAL_LIST);

    const clickTask = (topTask: string, taskText: string) => {
        const newList: ToDoList = JSON.parse(JSON.stringify(list));
        const taskIndex = newList[topTask].findIndex(x => Object.keys(x)[0] === taskText);
        newList[topTask][taskIndex][taskText] = !newList[topTask][taskIndex][taskText];
        setList(newList);
    };

    return (
        <>
            <h4>Challenge 6 - List of tasks</h4>
            <div className={'d-flex flex-column align-items-start'}>
                {Object.entries(list).map(([topTask, subTasks]) => {
                    return (
                        <React.Fragment key={topTask}>
                            <h2>{topTask}</h2>
                            <div style={{ display: "flex" }}>
                                <DisplaySubtasks
                                    topTask={topTask}
                                    subTasks={subTasks}
                                    clickTask={clickTask}
                                />
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
        </>
    );
};

const DisplaySubtasks = (
    {
        topTask,
        subTasks,
        clickTask
    }: { topTask: any, subTasks: ListItem[], clickTask: (topTask: string, taskText: string) => void, }
) => {
    const incompleteTasks = subTasks.filter((subTask: ListItem) => {
        const taskText = Object.keys(subTask)[0];
        return !subTask[taskText];
    });

    const completeTasks = subTasks.filter((subTask: ListItem) => {
        const taskText = Object.keys(subTask)[0];
        return subTask[taskText];
    });

    const renderTask = (subTask: ListItem) => {
        const taskText = Object.keys(subTask)[0];
        const handleTaskClick = () => clickTask(topTask, taskText);
        return (
            <p onClick={handleTaskClick} key={taskText}>
                {taskText}
            </p>
        );
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingRight: 50,
                    width: 250,
                }}
            >
                <h3>Incomplete</h3>
                {incompleteTasks.map(renderTask)}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <h3>Completed</h3>
                {completeTasks.map(renderTask)}
            </div>
        </>
    );
};
