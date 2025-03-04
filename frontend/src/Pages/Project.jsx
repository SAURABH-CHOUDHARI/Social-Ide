import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const Project = () => {
    const params = useParams();
    const [projectId, setProjectId] = useState(params.projectId);
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');

    const appendMessage = (msg) => {
        setMessages([...messages, msg]);
    };

    useEffect(() => {
        const tempSocket = io('http://localhost:3000/', {
            query: { projectId }
        });

        tempSocket.on('message', (msg) => {
            appendMessage(msg);
        });

        setSocket(tempSocket);
    }, []);

    return (
        <main className="flex h-screen bg-zinc-900 text-white">
            {/* Left Section - Conversation (25%) */}
            <div className="w-1/4 h-full bg-zinc-800 p-4 border-r border-zinc-700 flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Conversation</h2>
                <div className="flex-1 overflow-y-auto bg-zinc-700 p-4 rounded-lg space-y-2">
                    {messages.map((message, index) => (
                        <div key={index} className="p-2 bg-zinc-600 rounded-lg">
                            <p>{message}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex">
                    <input
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        type="text"
                        placeholder="Enter message"
                        className="flex-1 p-2 bg-zinc-800 border border-zinc-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={() => {
                            socket.emit('message', currentMessage);
                            appendMessage(currentMessage);
                            setCurrentMessage('');
                        }}
                        className="p-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-500 transition"
                    >
                        Send
                    </button>
                </div>
            </div>

            {/* Middle Section - Code (50%) */}
            <div className="w-1/2 h-full bg-zinc-900 p-4 border-r border-zinc-700 flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Code</h2>
                <div className="flex-1 bg-zinc-700 p-4 rounded-lg">Your code here...</div>
            </div>

            {/* Right Section - Review (25%) */}
            <div className="w-1/4 h-full bg-zinc-800 p-4 flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Review</h2>
                <div className="flex-1 bg-zinc-700 p-4 rounded-lg">Review content here...</div>
            </div>
        </main>
    );
};

export default Project;
