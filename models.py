import getpass
import os
from dotenv import load_dotenv
from llama_index.llms.nvidia import NVIDIA
from llama_index.embeddings.nvidia import NVIDIAEmbedding

#Initialize NVIDIA NIM API key in .env file first
load_dotenv()
nvidia_api_key = os.getenv("NVIDIA_API_KEY")

#Initialize all the AI models for the app

#Embedding model
embedding_model = NVIDIAEmbedding(model="NV-Embed-QA", truncate="END")

#Core Model used for the game master (ideally, a large language model with creative text generation capabilities)
language_generation_model = NVIDIA(model="meta/llama3-70b-instruct")
# Other models tested:
# meta/llama3-8b-instruct
# meta/llama3-70b-instruct /
# meta/llama-3.1-8b-instruct
# nvidia/llama-3.1-nemotron-51b-instruct
# nvidia/llama-3.1-nemotron-70b-instruct
# meta/llama-3.1-405b-instruct



#Model used for basic query classification (a smaller language model is applicable in this case)
classification_model = NVIDIA(model="meta/llama-3.2-3b-instruct")
extractor_model = NVIDIA(model="meta/llama-3.2-3b-instruct")
# Other models tested:
# ibm/granite-3.0-3b-a800m-instruct
# meta/llama-3.2-3b-instruct
# meta/llama3-8b-instruct

#Image generation model (from NVIDIA NIM API)
#Stable Diffusion 3 Medium
image_generation_invoke_url = "https://ai.api.nvidia.com/v1/genai/stabilityai/stable-diffusion-3-medium"
image_generation_headers = {
    "Authorization": f"Bearer {nvidia_api_key}",
    "Accept": "application/json",
}

