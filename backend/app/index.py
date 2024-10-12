import os
from llama_index.core import SimpleDirectoryReader, VectorStoreIndex
from models import embedding_model
from llama_index.core import Settings

lit_directory = "./Codex/Uploaded-Adventures/" #directory where all the user's literature is stored

def list_available_lit(directory=lit_directory):
    files = os.listdir(directory)
 #   files = [os.path.splitext(f)[0] for f in files]
    return(files)

def build_index(file: str):
    file_path = os.path.join(lit_directory, file)
    data = SimpleDirectoryReader(input_files= [file_path]).load_data()
    Settings.embed_model = embedding_model
    index = VectorStoreIndex.from_documents(data)
    return index
