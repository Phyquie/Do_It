import { useState } from "react";
import { CalendarIcon, BellIcon, PlusIcon, RefreshCcwIcon, StarIcon, TrashIcon, XIcon } from "lucide-react";

export default function RightSidebar({ task, onClose, onDelete }) {
  const [dueDate, setDueDate] = useState(null);

  if (!task) return null;

  return (
    <div className="w-full max-w-md bg-green-50 p-4 border-l shadow-lg h-screen flex flex-col bg-white dark:bg-gray-800 dark:text-white">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-lg font-semibold">{task?.title}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          <XIcon size={20} />
        </button>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <button className="flex items-center gap-2 text-gray-700 hover:text-black">
          <PlusIcon size={18} /> Add Step
        </button>
        <button className="flex items-center gap-2 text-gray-700 hover:text-black">
          <BellIcon size={18} /> Set Reminder
        </button>
        <div>
          <button className="flex items-center gap-2 text-gray-700 hover:text-black">
            <CalendarIcon size={18} /> Add Due Date
          </button>
          {dueDate && <p className="text-sm text-gray-600 mt-1">Due: {dueDate}</p>}
        </div>
        <button className="flex items-center gap-2 text-gray-700 hover:text-black">
          <RefreshCcwIcon size={18} /> Repeat
        </button>
        <textarea
          className="w-full p-2 border rounded-md"
          placeholder="Add Notes"
        />
      </div>
      <div className="mt-auto flex justify-between items-center text-gray-500 text-sm border-t pt-2">
        <span>Created Today</span>
        <button onClick={() => onDelete(task.id)} className="text-red-500 hover:text-red-700">
          <TrashIcon size={20} />
        </button>
      </div>
    </div>
  );
}
