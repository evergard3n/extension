import { useWebSocket } from "../lib/wsContext";
import ChatBubbles from "./chatbubble";

// const ChatList: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const olRef = useRef<HTMLOListElement>(null);
//   useEffect(() => {
//     const olElement = olRef.current;
//     if (olElement) {
//       olElement.scrollTo(0, olElement.scrollHeight);
//     }
//   });
//   return (
//     <div className="overflow-y-scroll">
//       <ol
//         ref={olRef}
//         className="mx-5 h-96 flex flex-col gap-2 scrollbar-gutter:stable"
//       >
//         {children}
//       </ol>
//     </div>
//   );
// };

export const Chats: React.FC = () => {
  const {socket } = useWebSocket() || { messages: [], socket: null };

  const handleClick = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "refresh" }));
    }
  };

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
      {/* <ChatList>
        {messages.map((message, index) => (
          <li key={index} className={message.sender === "User" ? "self-end" : ""}>
            <div className={`h-fit ${message.sender === "User" ? "bg-zinc-200" : "bg-white"} py-2 px-4 rounded-full text-black`}>
              <p className={message.sender === "User" ? "text-right" : ""}>{message.message}</p>
            </div>
          </li>
        ))}
      </ChatList> */}
      <ChatBubbles />
    </div>
  );
};
