from models import language_generation_model
from prompt import game_context
from prompt import game_context_2
from index import build_index
from memory import init_memory

#The game-master is responsible for handling interactions with the player
class GameMaster:
  def __init__(self, index):
    self.chat_engine = index.as_chat_engine(
    chat_mode="context",
    llm=language_generation_model,
    memory=init_memory(),
    system_prompt=(
        game_context_2
      ),
    )
  
  def generate_language_response(self, prompt):
    return self.chat_engine.chat(prompt)
  
  def generate_image_response(self, prompt):
    return None
  
  def generate_speech_response(self, prompt):
    return None