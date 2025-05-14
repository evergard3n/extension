import { WebSocketProvider } from "../lib/wsContext";
import ChatBubbles from "./chatbubble";
import { Chatbox } from "./chatbox";

export const Extension: React.FC = () => {
    return (
        <WebSocketProvider>
            <div className="w-96 h-[500px] bg-white rounded-lg flex flex-col">
                <div className="h-12 bg-white border-b border-zinc-100 flex flex-row justify-between px-4 items-center text-black text-md w-full font-semibold">
                    <p>Chatbot</p>
                </div>
                <ChatBubbles />
                <Chatbox />
            </div>
        </WebSocketProvider>
    );
}; 