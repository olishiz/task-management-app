import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getTask, updateTask} from "../api";
import {toast} from "react-toastify";

const UpdateTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        assignedTo: "",
        status: "PENDING",
    });

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const data = await getTask(id);
                setTask(data);
                setFormData({
                    title: data.title,
                    description: data.description,
                    assignedTo: data.assignedTo,
                    status: data.status,
                });
            } catch (error) {
                console.error("Error fetching task:", error);
                toast.error("Failed to fetch task data. Please try again later.");
            }
        };
        fetchTask();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateTask(id, formData);
            toast.success("Task updated successfully");
            navigate("/");
        } catch (error) {
            console.error("Error updating task:", error);
            toast.error("Failed to update task. Please try again later.");
        }
    };

    if (!task) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Update Task</h1>
            <div className="bg-white shadow rounded-lg p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Update task title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            name="description"
                            placeholder="Update task description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Assigned To
                        </label>
                        <input
                            type="text"
                            name="assignedTo"
                            placeholder="Update assignee's name"
                            value={formData.assignedTo}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
                        >
                            <option value="PENDING">Pending</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="COMPLETED">Completed</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Update Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateTask;
