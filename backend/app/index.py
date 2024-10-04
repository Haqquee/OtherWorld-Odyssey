import os
from llama_index.core import SimpleDirectoryReader, VectorStoreIndex
from models import embedding_model
from llama_index.core import Settings

lit_directory = "./Codex/Literature" #directory where all the literature is stored

def list_available_lit(directory=lit_directory):
    files = os.listdir(directory)
    return(files)

def build_index(file: str):
    data = SimpleDirectoryReader(input_files= file).load_data()
    Settings.embed_model = embedding_model
    index = VectorStoreIndex.from_documents(data)
