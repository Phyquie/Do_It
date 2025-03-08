import { createSlice } from "@reduxjs/toolkit";


// Load tasks from localStorage
const loadTasks = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

// Save tasks to localStorage
const saveTasks = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: loadTasks(),
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        text: action.payload.text,
        priority: false,
        important: false,
        userId: localStorage.getItem("userId"),
        status: false,
        date:action.payload.date,
      };
      state.tasks.push(newTask);
      saveTasks(state.tasks);
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasks(state.tasks);
    },

   updateTask: (state, action) => {
    const { id, ...updatedTask } = action.payload;
    const task = state.tasks.find((t) => t.id === id);
    if (task) {
      Object.assign(task, updatedTask);
      saveTasks(state.tasks);
    }
   },
    // getTasks: (state, action) => {
    //   state.tasks = state.tasks.filter((task) => task.userId === action.payload && task.status === false);
    // },
    // getCompletedTasks: (state, action) => {
    //   state.tasks = state.tasks.filter((task) => task.status === true && task.userId === action.payload);
    // },
  },
});

export const { addTask, deleteTask, updateTask} = taskSlice.actions;
export default taskSlice.reducer;
