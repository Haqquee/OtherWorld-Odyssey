from llama_index.llms.ollama import Ollama
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

#Initialize all the AI models for the app

embedding_model = HuggingFaceEmbedding(
        model_name="BAAI/bge-small-en-v1.5"
    )

language_generation_model = Ollama(
  model="llama3.1:8b"
  )

image_generation_model = None

speech_generation_model = None

