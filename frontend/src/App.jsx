import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TaskList from "./pages/TaskList";
import TaskForm from "./pages/TaskForm";
import UpdateTask from "./pages/UpdateTask";
import DashboardLayout from "./components/DashboardLayout";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <Router>
            <DashboardLayout>
                <Routes>
                    <Route path="/" element={<TaskList />} />
                    <Route path="/create" element={<TaskForm />} />
                    <Route path="/update/:id" element={<UpdateTask />} />
                </Routes>
                <ToastContainer position="top-right" autoClose={5000} />
            </DashboardLayout>
        </Router>
    );
}

export default App;
