import { Chat } from "../lib/wsContext";
import { useEffect, useRef } from "react";
import { useWebSocket } from "../lib/wsContext";
import { SyncLoader } from "react-spinners";
import Markdown from "react-markdown";
function UserBubble({ chat }: { chat: Chat }) {
    return (
        <div className="h-fit bg-zinc-200 py-2 px-4 rounded-lg text-black">
            <p className="text-right">{chat.message}</p>
        </div>
    );
}

function BotBubble({ chat }: { chat: Chat }) {
    return (
        <div className="h-fit w-full text-left">
            <Markdown>{chat.message}</Markdown>
        </div>
    );
}

export default function ChatBubbles() {
    const olRef = useRef<HTMLOListElement>(null);
    const { messages } = useWebSocket() || { messages: [] }; 
    useEffect(() => {
        const olElement = olRef.current;
        if (olElement) {
            olElement.scrollTo(0, olElement.scrollHeight);
        }
        console.log(messages);
    });

    

    return (
        <div className="grow w-full">
            <ol className="h-[400px] w-full flex flex-col items-start px-4 py-2 gap-4 overflow-y-auto" ref={olRef}>
                {messages.map((chat, index) => {
                    if (chat.sender !== "User") {
                        return (
                            <li key={index}><BotBubble chat={chat} /></li>
                        );
                    } else {
                        return (
                            <li key={index} className="self-end"><UserBubble chat={chat} /></li>
                        );
                    }
                })}
                {messages.length > 0 && messages[messages.length - 1].sender === "User" && (
                    <li className="self-start flex flex-row items-center gap-2">
                       <SyncLoader size={3} color="#000" speedMultiplier={0.5}/>
                       <p>Thinking...</p>
                    </li>
                )}
            </ol>
        </div>
    );
}