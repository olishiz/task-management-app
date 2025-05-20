import React from "react";
import {Link} from "react-router-dom";

const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white p-6">
                <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
                <nav>
                    <ul>
                        <li className="mb-4">
                            <Link to="/" className="hover:text-gray-300">
                                Task List
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/create" className="hover:text-gray-300">
                                Create Task
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
            {/* Main Content */}
            <main className="flex-1 bg-gray-100 p-8">{children}</main>
        </div>
    );
};

export default DashboardLayout;
