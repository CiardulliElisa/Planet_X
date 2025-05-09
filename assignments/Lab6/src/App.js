import { useState } from "react";

function Header() {
    return (
        <header>
            <h1>To Do List</h1>
        </header>
    );
};

function ToDo({ toDo, index, markToDo }) {
    return (
        <div className="todo" >
            <span style={{
                textDecoration: toDo.complete ? "line-through" : ""
            }}>{toDo.task}</span>
            <span style={{ marginLeft: '1em' }}>
                <button
                    style={{ color: 'green' }}
                    onClick={() => markToDo(index)}
                >completed
                </button>
            </span>
        </div>
    );
}

function ToDoList({ toDoList, markToDo, removeCompleted }) {
    return (
        <>
            {toDoList.map((toDo, index) => {
                return (
                    <ToDo
                        key={toDo.priority + toDo.task}
                        toDo={toDo} index={index} markToDo={markToDo}
                    />
                )
            })}
            <button onClick={removeCompleted}>remove complete</button>
            {/* TODO: Add button to remove all completed items */}
        </>
    );
};

function App() {
    const [toDoList, setToDoList] = useState([
        { "priority": 1, "task": "Important task", "complete": false },
        { "priority": 2, "task": "Not so important Task", "complete": true },
        { "priority": 3, "task": "Not important Task", "complete": false },
    ]);

    const markToDo = index => {
        const newTodos = [...toDoList];
        newTodos[index].complete = true;
        setToDoList(newTodos);
    };

    const removeCompleted = () => {
        const newTodos = toDoList.filter((toDo) => toDo.complete === false)
        setToDoList(newTodos)
    };

    return (
        <div className="App">
            <Header />
            <ToDoList toDoList={toDoList} markToDo={markToDo} removeCompleted={removeCompleted} />
        </div>
    );
}

export default App;