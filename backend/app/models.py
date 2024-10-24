import getpass
import os
from dotenv import load_dotenv
from llama_index.llms.ollama import Ollama
from llama_index.llms.nvidia import NVIDIA
from llama_index.embeddings.nvidia import NVIDIAEmbedding
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

load_dotenv()
nvidia_api_key = os.getenv("NVIDIA_API_KEY")

#Initialize all the AI models for the app

"""
NVIDIA NIM
"""
"""
#RAG embedding model
embedding_model = NVIDIAEmbedding(model="NV-Embed-QA", truncate="END")

#Core Model used for the game master (ideally, a large language model with creative text generation capabilities)
language_generation_model = NVIDIA(model="meta/llama-3.1-70b-instruct")

#Model used for basic query classification (a smaller language model is applicable in this case)
classification_model = Ollama(
  model="llama3.1:8b"
  )

#Image generation model (from NVIDIA NIM API)
#image_generation_invoke_url = "https://ai.api.nvidia.com/v1/genai/stabilityai/sdxl-turbo" #Model: SDXL-Turbo

speech_generation_model = None

"""
"""
LOCAL MODELS (FOR TESTING PURPOSES)
"""


#RAG embedding model
embedding_model = HuggingFaceEmbedding(
        model_name="BAAI/bge-small-en-v1.5"
        )

#Core Model used for the game master (ideally, a large language model with creative text generation capabilities)
language_generation_model = Ollama(
  model="llama3.1:8b"
  )

#Model used for basic query classification (a smaller language model is applicable in this case)
classification_model = Ollama(
  model="llama3.1:8b"
  )

#Image generation model (from NVIDIA NIM API)
#image_generation_invoke_url = "https://ai.api.nvidia.com/v1/genai/stabilityai/sdxl-turbo" #Model: SDXL-Turbo

speech_generation_model = None

