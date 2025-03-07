import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import PrismCode from "../Components/PrismCode";
import ReactMarkdown from "react-markdown"; // Import Markdown renderer

const Project = () => {
    const params = useParams();
    const [projectId] = useState(params.projectId);
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const [code, setCode] = useState(`Start Coding here...\n`);
    const [review, setReview] = useState("Click 'Generate Review' to analyze your code...");

    const appendMessage = (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
    };

    useEffect(() => {
        const tempSocket = io("http://localhost:3000/", {
            query: { projectId },
        });

        tempSocket.on("message", (msg) => {
            appendMessage(msg);
        });

        setSocket(tempSocket);

        return () => tempSocket.disconnect(); // Cleanup on unmount
    }, [projectId]);

    // Function to fetch and render Markdown-based review
    const generateReview = async () => {
        try {
            setReview("Reviewing... Please wait...");
            const response = await fetch("http://localhost:3000/v1/api/project/review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
            });

            const data = await response.json();
            setReview(data.review || "No review generated.");
        } catch (error) {
            console.error("Error generating review:", error);
            setReview("Error fetching review. Please try again.");
        }
    };

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
                            if (socket && currentMessage.trim()) {
                                socket.emit("message", currentMessage);
                                appendMessage(currentMessage);
                                setCurrentMessage("");
                            }
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
                <div className="flex-1 bg-zinc-700 p-4 rounded-lg overflow-y-scroll">
                    <PrismCode setCode={setCode} code={code} language="javascript" />
                </div>
                <button
                    onClick={generateReview}
                    className="mt-4 p-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
                >
                    Generate Review
                </button>
            </div>

            {/* Right Section - Review (25%) */}
            <div className="w-1/4 h-full bg-zinc-800 p-4 flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Review</h2>
                <div className="flex-1 bg-zinc-700 p-4 rounded-lg overflow-y-auto">
                    <ReactMarkdown>{review}</ReactMarkdown> {/* Markdown Rendering */}
                </div>
            </div>
        </main>
    );
};

export default Project;
