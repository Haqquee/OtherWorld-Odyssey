#from models import classification_model
from prompt import query_classifier
import ollama

response = ollama.chat(model='llama3.1', messages=[
  {
    'role': query_classifier,
    'content': 'Hi',
  },
])
print(response['message']['content'])

#def classify_query(prompt: str):
#  response = classification_model.generate()
#  return

