import os
import requests
from game_master import GameMaster
from index import list_available_lit, build_index
from fastapi import FastAPI, HTTPException, Form, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from models import extractor_model, classification_model, image_generation_invoke_url, image_generation_headers
from utils import classify_action, get_visual_scene_description

app = FastAPI()
origins = [
    "http://localhost:3000",  
    "http://127.0.0.1:3000"   
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

class AdventureParams(BaseModel):
  player_name: str
  adventure_name: str
  custom_params: str

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
current_scenario = None

@app.get("/api/get_adventures")
async def get_adventures():
  return{"uploaded_adventures": list_available_lit()}

@app.post("/api/initialize_adventure")
async def init_adventure(adventure_params: AdventureParams):
  global game_master
  global current_player
  global current_adventure
  global current_params

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
  global current_scenario

  response = game_master.chat_engine.chat(f"Start the game with Player named {current_player} in the world of {current_adventure}. Additional parameters for the adventure: {current_params}.")
  current_scenario = str(response)
  return {"output": str(response)}

@app.post("/api/generate_response")
async def generate_(player_input: PlayerInput):
  action_type = await classify_action(player_input)

  if action_type == 'vision':
    text_response = await generate_llm_response(player_input)
    image_response = await generate_image_response()
  
    return{"type": action_type, 
           "output": text_response["output"], 
           "base64": image_response["base64"]}

  else:
    text_response = await generate_llm_response(player_input)
    return{"type": action_type, 
           "output": text_response["output"]}



@app.post("/api/generate_llm_response")
async def generate_llm_response(player_input: PlayerInput):
  global game_master
  global current_scenario

  player_response = player_input.player_action
  
  response = game_master.chat_engine.chat(f"Player Response: {player_response}")
  current_scenario = str(response)

  
  return {"output": str(response)}

@app.get("/api/describe_visuals")
async def describe_visuals():
  global current_scenario

  if current_scenario:
    return get_visual_scene_description(current_scenario)

  else:
    raise HTTPException(status_code=400, detail=f"Cannot generate visuals.")

@app.get("/api/generate_image_response")
async def generate_image_response():
  description = str(get_visual_scene_description(current_scenario))
  prompt = f"An illustration of {description}"
  invoke_url = image_generation_invoke_url
  headers = image_generation_headers
  payload = {
      "prompt": prompt,
      "cfg_scale": 5,
      "aspect_ratio": "16:9",
      "seed": 0,
      "steps": 50,
      "negative_prompt": ""
  }
  response = requests.post(invoke_url, headers=headers, json=payload)
  response.raise_for_status()
  response_body = response.json()

  return {"base64": response_body["image"]}

def conclude_adventure():
  return None

@app.delete("/api/reset_state")
async def reset_state():
    global game_master
    global current_player
    global current_adventure
    global current_params
    global current_scenario

    game_master = None
    current_player = None
    current_adventure = None
    current_params = None
    current_scenario = None

    return{"Output": "State reset."}


