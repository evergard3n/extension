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
        <div className="bg-slate-50 w-full h-14 flex flex-row p-2 items-center">
          <form action=""onSubmit={(e) => {e.preventDefault(); sendMessageSocket()}} className="w-full h-full max-h-fit flex flex-row items-center bg-white rounded-full pl-5 drop-shadow-sm py-2 flex-grow">
          <input type="text" className=" h-full max-h-fit bg-white text-black flex-1 focus:outline-none w-fit resize-none overflow-y-auto" value={message} onChange={e => setMessage(e.target.value)} placeholder="Aa"/>
          <button disabled={message.length === 0} className="text-black disabled:cursor-not-allowed bg-white w-8 h-8 flex justify-center items-center rounded-full disabled:bg-gray-200 mr-1" type="submit"><span className="material-icons-round">arrow_upward</span></button>
          </form>
            
            {/* <button onClick={() => getMessage()}>reload</button>
            <button onClick={() => sendMessageSocket()} disabled={message.length === 0} className="disabled:cursor-not-allowed">socketsend</button> */}
        </div>
    )
    
}