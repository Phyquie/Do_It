import React, { useState, useEffect } from "react";
import { Bell, RotateCw, Calendar, Star , Trash2} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { addTask,updateTask ,deleteTask} from "../redux/taskSlice";
import toast from "react-hot-toast";

const TodoApp = ({ isSidebarOpen }) => {
  const [newTaskText, setNewTaskText] = useState("");
  const tasks = useSelector((state) => state.tasks.tasks.filter((task) => task.userId === localStorage.getItem('userId') && task.status === false),[localStorage.getItem('userId')]);
  const dispatch = useDispatch();
  const isListView = useSelector((state) => state.view.isListView);

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      dispatch(addTask({
        id: Date.now(),
        text : newTaskText,
        priority : false,
        userId : localStorage.getItem('userId'),
        status : false,
        date : new Date().toISOString(),
      }));
      setNewTaskText("");
      toast.success("Task added successfully");
    }
  };
  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
    toast.success("Task deleted successfully");
  };

  

  const handleCompleteTask = (id) => {
    dispatch(updateTask({ id, status: true }));
  };

  const handleImportantTask = (id) => {
    dispatch(updateTask({ id, important: true }));
  };

  const handleUnimportantTask = (id) => {
    dispatch(updateTask({ id, important: false }));
  };
  
  const completedTasks = useSelector((state) => state.tasks.tasks.filter((task) => 
    task.status === true && task.userId === localStorage.getItem('userId')
  ),[localStorage.getItem('userId')]);
  return (
    <div className="grow bg-white dark:text-white dark:bg-gray-800 overflow-y-auto">
      <div className={`grow p-6 bg-white shadow transition-all duration-300 dark:bg-gray-800`}>
        <h2 className="text-gray-700 dark:text-white">To Do</h2>
        <div className="p-4 bg-green-50 rounded-md flex h-56 flex-col justify-items-start">
          <input 
            type="text" 
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a task" 
            className="w-full p-2 rounded-md border h-full flex-grow bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500" 
          />
          <div className="flex items-center gap-4 mt-3">
            <Bell className="text-gray-600 cursor-pointer" />
            <RotateCw className="text-gray-600 cursor-pointer" onClick={() => setNewTaskText("")} />
            <Calendar className="text-gray-600 cursor-pointer"/>
            <button onClick={handleAddTask} className="bg-green-200 px-4 py-1 rounded text-green-800">
              Add Task
            </button>
          </div>
        </div>
        <ul className={`mt-4 ${!isListView ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : ''}`}>
          {tasks.map((task) => (
            <li 
              key={task.id} 
              className={`
                ${isListView 
                  ? 'flex justify-between items-center py-2 border-b' 
                  : 'p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-700 min-h-[120px] flex flex-col justify-between'
                }
              `}
            >
              <div className={`flex items-center gap-2 ${!isListView ? 'mb-4' : ''}`}>
                <input 
                  type="checkbox" 
                  className="cursor-pointer" 
                  onChange={() => handleCompleteTask(task.id)} 
                />
                <span className={`${!isListView ? 'text-lg font-medium' : ''}`}>{task.text}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trash2 
                  className="cursor-pointer" 
                  onClick={() => handleDeleteTask(task.id)} 
                />
                <Star 
                  className={`cursor-pointer ${task.important ? "fill-black dark:fill-white" : "text-gray-500"}`} 
                  onClick={() => task.important ? handleUnimportantTask(task.id) : handleImportantTask(task.id)} 
                />
              </div>
            </li>
          ))}
        </ul>

        <h3 className="mt-6 text-gray-600">Completed</h3>
        <ul>
          {completedTasks.map((task, index) => (
            <li key={task.id} className="flex justify-between items-center gap-2 text-gray-400 line-through py-1">
              
                ✅ {task.text} 
                <Trash2 className="cursor-pointer text-gray-400" onClick={() => handleDeleteTask(task.id)} />
              
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
