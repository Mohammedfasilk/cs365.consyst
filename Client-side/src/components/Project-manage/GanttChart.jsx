import React, { useState } from "react";
import { Gantt, Willow } from "wx-react-gantt";
import "wx-react-gantt/dist/gantt.css";

const initialTasks = [
  {
    id: 1,
    text: "Task 1",
    start: new Date(2024, 5, 10),
    end: new Date(2024, 5, 15),
    duration: 5,
    progress: 20,
    type: "task",
    lazy: false,
  },
  {
    id: 2,
    text: "Task 2",
    start: new Date(2024, 5, 16),
    end: new Date(2024, 5, 20),
    duration: 4,
    progress: 50,
    type: "task",
    lazy: false,
  },
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <Willow>
        <Gantt
          tasks={tasks}
          onChangeTasks={(updatedTasks) => {
            console.log("✅ Tasks changed", updatedTasks);
            setTasks(updatedTasks);
          }}
        />
      </Willow>
    </div>
  );
}
