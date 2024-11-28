from typing import List, Union

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json
from openai import OpenAI
app = FastAPI()
from dotenv import load_dotenv
import os
from core import Reflection

load_dotenv()
class Message(BaseModel):
    message: str
    sender: str
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
reflection = Reflection(client)
messages: List[Message] =  []
clients: List[WebSocket] = []
@app.post("/chat")
async def chat(request: Message):
    response = process_message(request)
    return {"response": response}

def process_message(message: Message) -> str:
    # Replace with your chatbot logic
    reflectedQ = reflection(messages)
    res = aiResponse(reflectedQ)
    messages.append(Message(message=res, sender="Bot"))
    return f"Echo: {message}"

@app.get("/chat")
def get_messages():
    return {"messages": messages}

app.add_middleware(
    CORSMiddleware,
    # allow_origins=["chrome-extension:/jlpalndmgiboeonamcfpcpnabddlapoa"],
    allow_origins=["*"],  # Replace with your extension ID
    allow_methods=["*", "OPTIONS"],
    allow_headers=["*"],
)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.append(websocket)
    
    try:
        await websocket.send_text(json.dumps([message.dict() for message in messages]))
        while True:
            # Wait for new messages
            message = await websocket.receive_text()
            messages.append(Message(message=message, sender="You"))
            for client in clients:
                await client.send_text(json.dumps([message.dict() for message in messages]))
            process_message(Message(message=message, sender="You"))
            # messages.append(Message(message=message, sender="You"))
            # # fake response
            # messages.append(Message(message="dit me may", sender="Bot"))
            
            # Broadcast the message to all connected clients
            for client in clients:
                await client.send_text(json.dumps([message.dict() for message in messages]))
    except WebSocketDisconnect:
        print(f"WebSocket disconnected: {websocket.client}")
        clients.remove(websocket)



def aiResponse(message) -> str:
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant. Answer what the user says."},
            {
                "role": "user",
                "content": message
            }
        ]
    )
    content = completion.choices[0].message.content
    return content if content is not None else ""