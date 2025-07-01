import React, { useState } from "react";
import { Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
// import { progress } from "framer-motion";
 
const GanttChart = () => {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      name: "Design Phase",
      start: new Date("Tue Jul 01 2025 05:30:00 GMT+0530 (India Standard Time)-07-01"),
      end: new Date("2025-07-05"),
      type: "task",
      progress: 40,
      isDisabled: false,
    },
  ]);
 
  const [newTask, setNewTask] = useState({
    name: "",
    start: "",
    end: "",
    progress: 50,
  });
 
  const handleInputChange = (e) => {
setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };
 
  const addTask = (e) => {
    e.preventDefault();
if (!newTask.name || !newTask.start || !newTask.end) {
      alert("Please fill all fields.");
      return;
    }
 
    const task = {
      id: (tasks.length + 1).toString(),
name: newTask.name,
      start: new Date(newTask.start),
      end: new Date(newTask.end),
      type: "task",
      progress: 50,
      isDisabled: false,
    };
 
    setTasks([...tasks, task]);
    setNewTask({ name: "", start: "", end: "",progress:50});
  };
 
  const handleDateChange = (updatedTask) => {
    const updated = tasks.map((task) =>
task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updated);
  };
 
  const handleProgressChange = (updatedTask) => {
    const updated = tasks.map((task) =>
task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updated);
    console.log(updated);
    
  };
 
  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Task</h2>
      <form onSubmit={addTask} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Task Name"
value={newTask.name}
          onChange={handleInputChange}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="date"
          name="start"
          value={newTask.start}
          onChange={handleInputChange}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="date"
          name="end"
          value={newTask.end}
          onChange={handleInputChange}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button
          type="submit"
          style={{
            padding: "6px 12px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          ➕ Add Task
        </button>
      </form>
 
      <div style={{ height: "600px" }}>
        <Gantt
          tasks={tasks}
          viewMode={ViewMode.Day}
          onDateChange={handleDateChange}
          onProgressChange={handleProgressChange}
          listCellWidth="155px"
        />
      </div>
    </div>
  );
};
 
export default GanttChart;