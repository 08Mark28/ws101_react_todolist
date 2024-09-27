import React, { useState, useEffect } from 'react';
import './Design.css';

function To_Do_List(){

  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(task));
  }, [task]);

  function handleInputChange(event){
    setNewTask(event.target.value);
  }

  function addTask(){
    if(newTask.trim() !== ""){
      setTask(task => [...task, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index){
    const updatedTasks = task.filter((_, i) => i !== index);
    setTask(updatedTasks);
  }

  function moveTaskUp(index){
    if(index > 0){
      const updatedTask = [...task];
      [updatedTask[index], updatedTask[index - 1]] = 
        [updatedTask[index - 1], updatedTask[index]];
      setTask(updatedTask);
    }
  }

  function moveTaskDown(index){
    if(index < task.length - 1){
      const updatedTask = [...task];
      [updatedTask[index], updatedTask[index + 1]] = 
        [updatedTask[index + 1], updatedTask[index]];
      setTask(updatedTask);
    }
  }

  return(
    <div className="todolist-container">
      <div className="todolist-box">
        <h1>My To-Do List</h1>

        <div>
          <input
            type="text"
            placeholder="Enter a Task..."
            value={newTask}
            onChange={handleInputChange}
          />
          <button className="add-btn" onClick={addTask}>
            Add
          </button>
        </div>

        <ol>
          {task.map((task, index) => (
            <li key={index}>
              <span className="text">{task}</span>
              <button className="delete-btn" onClick={() => deleteTask(index)}>
                Delete
              </button>
              <button className="move-up-btn" onClick={() => moveTaskUp(index)}>
                UP⬆️
              </button>
              <button className="move-down-btn" onClick={() => moveTaskDown(index)}>
                DOWN⬇️
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default To_Do_List;
