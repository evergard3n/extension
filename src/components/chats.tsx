import { useEffect, useState } from "react";
import { Message } from "./chatbox";
import { ChatBubble } from "./chatbubble";

export const Chats : React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    useEffect(() => {
        // Connect to the WebSocket server
        console.log("Connecting to WebSocket...");
        
        const socket = new WebSocket("ws://127.0.0.1:8000/ws");
        socket.onopen = () => {
            console.log("Connected to WebSocket.");
        }
        // Listen for incoming messages (new updates)
        socket.onmessage = (event) => {
          const messagesDict = JSON.parse(event.data);
          const messages: Array<Message> = messagesDict.map((messageDict: any) => {
            return {message: messageDict.message, sender: messageDict.sender};
          });
          setMessages(messages);
          
          
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
    return (
        <div className="text-black">
            <h1 className="text-black">{messages.length}</h1>
            {/* {messages && messages.map((message, index) => (
                <ChatBubble key={index} sender={message.sender} message={message.message} />))} */}
            <ol className="pl-5">
            {messages.map((message, index) => (
                    <li key={index}>
                      <ChatBubble sender={message.sender} message={message.message} />
                    </li>
          ))}
            </ol>
        </div>
    )
}