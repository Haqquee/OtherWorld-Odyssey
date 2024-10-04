import os
from game_master import GameMaster
from index import list_available_lit
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class AdventureParams(BaseModel):
  player_name: str
  adventure_name: str
  # adventure_difficulty: str

class PlayerInput(BaseModel):
  player_action: str

class ChatResponse(BaseException):
  scenario_title: str
  scenario_description: str

class ImageDescription(BaseModel):
  image_description: str

class ImageResponse(BaseModel):
  image: str

game_master = None
current_player = None

@app.get("/api/get_adventures")
async def get_adventures():
  return{"uploaded_adventures": list_available_lit()}

@app.post("/api/initialize_adventure")
async def init_adventure(adventure_params: AdventureParams):

  if game_master:
    raise HTTPException(status_code=400, detail=f"An adventure is already in progress with player: {current_player}")
  
  player_name = adventure_params.player_name
  adventure_name = adventure_params.adventure_name

  #game_master = 


  response = chat_engine.chat(f"Start the game with Player named {player_name} in the world of {adventure_name}.")
  return {"output": response}

@app.post("/api/generate_llm_response")
async def generate_llm_response(player_input: PlayerInput):
  player_response = player_input.player_action
  global chat_engine
  response = chat_engine.chat(f"Player Response: {player_response}")
  return {"output": str(response)}

def generate_image_response(image_desc: ImageDescription):
  return None

def conclude_adventure():
  return None


"""
response = chat_engine.chat("Start the game with Player named Mervin.")
print(response)


while True:
    user_input = input("Player: ")
    print(chat_engine.chat(user_input))
    
"""

