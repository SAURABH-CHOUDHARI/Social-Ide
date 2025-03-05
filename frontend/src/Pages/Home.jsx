import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectName, setProjectName] = useState('');

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setIsModalOpen(false);

        axios.post('https://7kc930b1-3000.inc1.devtunnels.ms/v1/api/project/create', {
            name: projectName,
        })
            .then(() => {
                getProjects();
                setProjectName('');
            });
    }

    function getProjects() {
        axios.get('https://7kc930b1-3000.inc1.devtunnels.ms/v1/api/project/list')
            .then((response) => {
                setProjects(response.data.projects);
            });
    }

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <main className="flex h-screen bg-zinc-900 text-white">
            {/* Left Section - Project List (75%) */}
            <div className="w-3/4 p-6 overflow-y-auto border-r border-zinc-700">
                <h2 className="text-xl font-semibold mb-4">Projects</h2>
                <div className=" grid grid-cols-5 grid-rows-5 gap-2">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/project/${project._id}`)}
                            className={`p-4 bg-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-600 transition 
                ${index === 0 ? "row-span-2" : ""}
                ${index === 2 ? "col-start-2 row-start-2" : ""}
                ${index === 3 ? "col-start-3 row-start-1 row-span-2" : ""}
                ${index === 4 ? "row-start-3" : ""}
                ${index === 5 ? "col-start-1 row-start-4" : ""}
                ${index === 6 ? "col-start-2 row-start-3 row-span-2" : ""}
                ${index === 7 ? "col-start-3 row-start-3" : ""}
                ${index === 8 ? "col-start-3 row-start-4" : ""}
                `}
                        >
                            <h1 className="text-lg font-semibold">{project.name}</h1>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Section - Button to Open Modal (25%) */}
            <div className="w-1/4 flex justify-center items-center">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="p-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-500 transition"
                >
                    + New Project
                </button>
            </div>

            {/* Modal - Create New Project */}
            {isModalOpen && (
                <div className="fixed inset-0  flex justify-center items-center">
                    <div className="relative bg-zinc-800 p-6 rounded-lg shadow-lg w-80">
                        {/* Close Button */}
                        <div
                            className="h-8 w-8 absolute top-[-5%] right-[-5%] flex items-center justify-center rounded-full hover:bg-red-500   bg-zinc-600 cursor-pointer"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ✕
                        </div>

                        <h2 className="text-xl font-semibold mb-4">Create New Project</h2>

                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                            <input
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                type="text"
                                placeholder="Enter project name"
                                className="p-2 bg-zinc-700 text-white border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                            >
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </main>
    );
};

export default Home;
