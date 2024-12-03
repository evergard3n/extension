import { useEffect, useState, useRef } from "react";
import { Message } from "./chatbox";
import { ChatBubble } from "./chatbubble";
import { SyncLoader } from "react-spinners";
const ChatList: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const olRef = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const olElement = olRef.current;
    if (olElement) {
      olElement.scrollTo(0, olElement.scrollHeight);
    }
  });
  return (
    <div className="overflow-y-scroll">
      <ol
        ref={olRef}
        className="mx-5 h-96 flex flex-col gap-2 scrollbar-gutter:stable"
      >
        {children}
      </ol>
    </div>
  );
};
export const Chats: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [more, setMore] = useState<boolean>(false);
  const socketRef = useRef<WebSocket | null>(null);
  useEffect(() => {
    // Connect to the WebSocket server
    console.log("Connecting to WebSocket...");

    const socket = new WebSocket("ws://127.0.0.1:8000/ws");
    socketRef.current=socket;
    socket.onopen = () => {
      console.log("Connected to WebSocket.");
    };
    // Listen for incoming messages (new updates)
    socket.onmessage = (event) => {
      const messagesDict = JSON.parse(event.data);
      if(messagesDict.length === 0) {
        setMessages([]);
      } else {
        const messages: Array<Message> = messagesDict.map((messageDict: any) => {
          return { message: messageDict.message, sender: messageDict.sender };
        });
        if (messagesDict[messagesDict.length - 1].sender === "You") setMore(true);
        else setMore(false);
        setMessages(messages);
      }
      
      
    };
    socket.onerror = (event) => {
      console.log("WebSocket error:", event);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
    // Cleanup WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []);
  const handleClick = () => {
    if(socketRef.current) {
      socketRef.current.send("refresh");
    }
  }
  return (
    <div className="text-black pt-3 h-full bg-zinc-50">
      <div className="flex flex-row items-center justify-center px-6">
        <button className="text-slate-50" disabled>
          <span className="material-icons">refresh</span>
        </button>
        <h1 className="text-center font-thin text-sm flex-1">Chats</h1>
        <button className="mi-title" title="Refresh chat" onClick={handleClick}>
          <span className="material-icons">refresh</span>
        </button>
      </div>
      {/* {messages && messages.map((message, index) => (
                <ChatBubble key={index} sender={message.sender} message={message.message} />))} */}
      <ChatList>
        {messages.map((message, index) => (
          <li key={index}>
            <ChatBubble sender={message.sender} message={message.message} />
          </li>
        ))}
        {more && (
          <div className="bg-white w-fit px-4 py-2 rounded-xl drop-shadow-sm">
            <SyncLoader color="#000000" size={8} speedMultiplier={0.5} />
          </div>
        )}
      </ChatList>
    </div>
  );
};
