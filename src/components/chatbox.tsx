import { useState } from "react";
import { useWebSocket } from "../lib/wsContext";

export const Chatbox: React.FC = () => {
    const [message, setMessage] = useState("");
    const { sendMessage } = useWebSocket() || {};

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (sendMessage && message.trim()) {
            sendMessage(message);
            setMessage("");
        }
    };

    return (
        <div className="bg-slate-50 w-full h-14 flex flex-row p-2 items-center">
            <form onSubmit={handleSubmit} className="w-full h-full max-h-fit flex flex-row items-center bg-white rounded-full pl-5 drop-shadow-sm py-2 flex-grow">
                <input 
                    type="text" 
                    className="h-full max-h-fit bg-white text-black flex-1 focus:outline-none w-fit resize-none overflow-y-auto" 
                    value={message} 
                    onChange={e => setMessage(e.target.value)} 
                    placeholder="Ask anything..."
                />
                <button 
                    disabled={message.length === 0} 
                    className="text-black disabled:cursor-not-allowed bg-white w-8 h-8 flex justify-center items-center rounded-full disabled:bg-gray-200 mr-1" 
                    type="submit"
                >
                    <span className="material-icons-round">arrow_upward</span>
                </button>
            </form>
        </div>
    );
};