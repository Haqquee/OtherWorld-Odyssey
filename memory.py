from llama_index.core.storage.chat_store import SimpleChatStore
from llama_index.core.memory import ChatMemoryBuffer

def init_memory():
  chat_store = SimpleChatStore()
  chat_memory = ChatMemoryBuffer.from_defaults(
    token_limit=3000,
    chat_store=chat_store,
    chat_store_key="user1"
  )
  return chat_memory

def save_memory(chat_memory, path):
  return None

def load_memory(chat_memory, path):
  return None


