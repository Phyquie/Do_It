import { useState, useEffect } from 'react'
import TaskManager from './component/TaskManager'
import Header from './component/Header'
import TodoApp from './component/Todo'
import RightSidebar from './component/RightSidebar'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Login from './component/Login'
import { Toaster } from 'react-hot-toast'
import Important from './component/Important'
import { useSelector } from 'react-redux'
import { Home, Star, UserPlus, Map } from 'lucide-react'

function App() {
  const [task, setTask] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Get dark mode state from Redux
  const isDarkMode = useSelector((state) => state.isDarkMode.isDarkMode);

  // Apply dark mode class based on Redux state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      navigate('/login');
    } else {
      setUserId(storedUserId);
    }
  }, [navigate]);

  // Protected Route wrapper component
  const ProtectedRoute = ({ children }) => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      return <Navigate to="/login" />;
    }

    const navigate = useNavigate();
    return (
      <div className='flex flex-col overflow-hidden h-screen'>
        <Header
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <div className='grow overflow-hidden'>
          {children}
        </div>
        <nav className="w-full sticky bottom-0 md:hidden border-t">
          <ul className="space-y-2 flex justify-around items-center pb-5">
            <li className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded text-black cursor-pointer dark:text-white" onClick={() => navigate('/')}>
              <Home size={20} />
            </li>
            <li className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded text-black cursor-pointer dark:text-white" onClick={() => navigate('/important')}>
              <Star size={20} />
            </li>
            <li className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded text-black dark:text-white">
              <Map size={20} />
            </li>
            <li className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded text-black dark:text-white">
              <UserPlus size={20} /></li>
          </ul>
        </nav>
      </div>
    )
  };

  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className='w-full h-full overflow-hidden bg-gray-100 flex flex-col dark:bg-gray-900 dark:text-white'>
                <div className='flex w-full h-full overflow-hidden'>
                  <TaskManager isOpen={isSidebarOpen} />
                  <TodoApp isSidebarOpen={isSidebarOpen} />
                  <RightSidebar
                    task={task}
                    onClose={() => setTask(null)}
                    onDelete={() => setTask(null)}
                  />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/important"
          element={
            <ProtectedRoute>
              <div className='w-full h-full overflow-hidden bg-gray-100 flex flex-col dark:bg-gray-900'>
                <div className='flex w-full h-full overflow-hidden'>
                  <TaskManager isOpen={isSidebarOpen} />
                  <Important isSidebarOpen={isSidebarOpen} />
                  <RightSidebar
                    task={task}
                    onClose={() => setTask(null)}
                    onDelete={() => setTask(null)}
                  />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login className="dark:bg-gray-900 " />} />
      </Routes>
    </>
  );
}

export default App
