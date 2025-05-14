import { createContext, useContext, useEffect, useState } from "react";

export interface Chat {
    message: string;
    sender: string;
}

interface WebSocketContextType {
    socket: WebSocket | null;
    messages: Chat[];
    sendMessage: (message: string) => void;
}

export function convertToChatHistory(chatHistory: string[]): Chat[] {
    const result: Chat[] = [];
    let currentSender: string | null = null;
    let currentMessageLines: string[] = [];
  
    for (const line of chatHistory) {
      const match = line.match(/^(\w+):\s*(.*)/); // Match "Sender: message"
  
      if (match) {
        // Save previous chat if exists
        if (currentSender !== null) {
          result.push({
            sender: currentSender,
            message: currentMessageLines.join('\n').trim(),
          });
        }
  
        currentSender = match[1];
        currentMessageLines = [match[2]]; // Start new message
      } else if (currentSender !== null) {
        // Continuation of previous message
        currentMessageLines.push(line);
      }
    }
  
    // Push the final message
    if (currentSender !== null) {
      result.push({
        sender: currentSender,
        message: currentMessageLines.join('\n').trim(),
      });
    }
    console.log("result", result);
    return result;
  }

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<Chat[]>([]);

    useEffect(() => {
        const ws = new WebSocket("wss://e-commerce-l9d1.onrender.com/api/chat");
        
        ws.onopen = () => console.log("WebSocket connected!");
        ws.onclose = () => console.log("WebSocket disconnected!");
        ws.onerror = (error) => console.error("WebSocket error:", error);

        ws.onmessage = (event) => {
            const response = JSON.parse(event.data);
            if (response.reply && response.reply !== "Cập nhật form thành công.") {
                const newMessage: Chat = {
                    message: response.reply,
                    sender: "BOT",
                };
                setMessages((prev) => [...prev, newMessage]);
            } else {
                setMessages(convertToChatHistory(response.chat_history));
                console.log(response.chat_history);
            }
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, []);

    function sendMessage(message: string) {
        const chatMessage: Chat = {
            sender: "User",
            message: message,
        };
        setMessages((prev) => [...prev, chatMessage]);
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(message);
        } else {
            console.warn("WebSocket not ready!");
        }
    }

    return (
        <WebSocketContext.Provider value={{ socket, messages, sendMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext); 