import { useState } from "react";
export type Message = {message: string, sender: string};
// Send message using POST method
// const sendMessage = async (message:Message) => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(message),
//       });
//       const data = await response.json();
//       console.log(data.response);
//       return data.response;
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };
  // const getMessage = async () => {
  //   try {
  //     const response = await fetch("http://127.0.0.1:8000/chat", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
        
  //     });
  //     const data = await response.json();
  //     console.log(data.messages[1]);
      
  //     return data.response;
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }
export const Chatbox: React.FC = () => {
    const [message, setMessage] = useState("");
    const sendMessageSocket = () => {
      const socket = new WebSocket("ws://127.0.0.1:8000/ws");
      socket.onopen = () => {
      socket.send(message);
      setMessage("");
    };
    }
    return (
        <div className=" bg-amber-500 w-full h-fit flex flex-row p-2 items-center">
            <input type="text" className="bg-white rounded-full pl-5 h-full text-black flex-1 focus:outline-none" value={message} onChange={e => setMessage(e.target.value)} placeholder="Aa"/>
            <button disabled={message.length === 0} className="text-black disabled:cursor-not-allowed bg-white w-10 h-10 rounded-full disabled:bg-gray-200" onClick={() => sendMessageSocket()}><span className="material-icons-round pt-2">arrow_upward</span></button>
            {/* <button onClick={() => getMessage()}>reload</button>
            <button onClick={() => sendMessageSocket()} disabled={message.length === 0} className="disabled:cursor-not-allowed">socketsend</button> */}
        </div>
    )
    
}