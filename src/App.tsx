
import './App.css'
import { Chatbox } from './components/chatbox'

import { Chats } from './components/chats'
import { WebSocketProvider } from './lib/wsContext'

function App() {
  return (
    <>
      <WebSocketProvider>
        <div className='h-fit bg-white w-96 flex flex-col flex-grow'>
          <div className='flex-1'>
            <Chats />
          </div>

          <Chatbox />
        </div>
      </WebSocketProvider>
    </>
  )

}

export default App
