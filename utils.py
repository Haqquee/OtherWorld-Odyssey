#from models import classification_model
from prompt import query_classifier
from models import extractor_model
from models import classification_model
import ollama

# Describes the visuals of a scenario from a first person perspective, for text-to-image generation
def get_visual_scene_description(scenario_text: str):
  prompt = f"In one line, give me a visual description of the setting from the following scenario (do not include characters). Scenario: {scenario_text}"
  response = extractor_model.complete(prompt)
  return {str(response)}

# Classifies if the player's action involves using vision (if so, then it will trigger text-to-image generation)
async def classify_action(player_action: str):
  prompt = f"Use only 'text' or 'vision' to answer, if the given action made by a user contains involvement of vision. For example, if the user says 'Walk through the black door', you will respond with 'text', since the action does not involve vision. If the user says 'Look around the room', you will respond with 'vision', since the user's action involves using vision. User action: {player_action}"
  response = extractor_model.complete(prompt)
  return str(response)

