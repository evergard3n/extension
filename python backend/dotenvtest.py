from dotenv import load_dotenv
import os
from openai import OpenAI
load_dotenv()
print(os.getenv("OPENAI_API_KEY"))


client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
content = "what is america's independence day?"

completion = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a helpful assistant. Answer what the user says."},
        {
            "role": "user",
            "content": content
        }
    ]
)

print(completion.choices[0].message.content)