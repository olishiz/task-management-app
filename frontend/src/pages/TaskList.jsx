import { useEffect, useState } from "react";
import { deleteTask, getTasks, updateTask } from "../api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error(
        "Unable to fetch tasks. The backend service may be unavailable.",
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Unable to delete task. Please try again later.");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateTask(id, status);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Unable to update task status. Please try again later.");
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Task List</h1>
        <button
          onClick={() => navigate("/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Create New Task
        </button>
      </div>
      <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Assigned To
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {task.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {task.assignedTo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* Render status as a badge */}
                  {task.status === "PENDING" && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                      Pending
                    </span>
                  )}
                  {task.status === "IN_PROGRESS" && (
                    <span className="bg-blue-100 text-blue-800 px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                      In Progress
                    </span>
                  )}
                  {task.status === "COMPLETED" && (
                    <span className="bg-green-100 text-green-800 px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                      Completed
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(task.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/update/${task._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No tasks available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
