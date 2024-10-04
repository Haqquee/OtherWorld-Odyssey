from llama_index.core.storage.chat_store import SimpleChatStore
from llama_index.core.memory import ChatMemoryBuffer

chat_store = SimpleChatStore()
chat_memory = ChatMemoryBuffer.from_defaults(
  chat_store=chat_store,
  chat_store_key="user1"
)

