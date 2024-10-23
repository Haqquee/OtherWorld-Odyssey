import os
from game_master import GameMaster
from index import list_available_lit, build_index
from fastapi import FastAPI, HTTPException, Form, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from image import test_image

app = FastAPI()
origins = [
    "http://localhost:3000",  
    "http://127.0.0.1:3000"   
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

class AdventureParams(BaseModel):
  player_name: str
  adventure_name: str
  custom_params: str
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
current_adventure = None
current_params = None

@app.get("/api/get_adventures")
async def get_adventures():
  return{"uploaded_adventures": list_available_lit()}

@app.post("/api/initialize_adventure")
async def init_adventure(adventure_params: AdventureParams):
  global game_master
  global current_player
  global current_adventure
  global current_params

  #if game_master:
  #  raise HTTPException(status_code=400, detail=f"An adventure is already in progress with player: {current_player}")

  current_player = adventure_params.player_name
  current_adventure = adventure_params.adventure_name
  current_params = adventure_params.custom_params

  index = build_index(current_adventure)
  game_master = GameMaster(index)

  if game_master:
    return({"output": "Built index successfully."})
  else:
    return({"output": "Failed to build index."})

@app.get("/api/start_adventure")
async def generate_start_response():
  global game_master
  global current_player
  global current_adventure
  global current_params

  response = game_master.chat_engine.chat(f"Start the game with Player named {current_player} in the world of {current_adventure}. Additional parameters for the adventure: {current_params}.")
  return {"output": str(response)}


@app.post("/api/generate_llm_response")
async def generate_llm_response(player_input: PlayerInput):
  global game_master

  player_response = player_input.player_action
  
  response = game_master.chat_engine.chat(f"Player Response: {player_response}")
  return {"output": str(response)}

@app.post("/api/generate_image_response")
def generate_image_response(image_desc: ImageDescription):
  ###########################

  ###########################
  return {"base64": test_image}

def conclude_adventure():
  return None

@app.delete("/api/reset_state")
async def reset_state():
    global game_master
    global current_player
    global current_adventure
    global current_params

    game_master = None
    current_player = None
    current_adventure = None
    current_params = None

    return{"Output": "State reset."}



  


"""
response = chat_engine.chat("Start the game with Player named Mervin.")
print(response)


while True:
    user_input = input("Player: ")
    print(chat_engine.chat(user_input))
    
"""

