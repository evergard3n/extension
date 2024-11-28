
import './App.css'
import { Chatbox } from './components/chatbox'

import { Chats } from './components/chats'

function App() {
  return (
    <div className='h-96 bg-white w-96 flex flex-col'>
      <div className='flex-1'>
      <Chats/>
      </div>
      
      <Chatbox />
    </div>
  )
  
}

export default App
