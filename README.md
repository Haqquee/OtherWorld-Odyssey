# OtherWorld Odyssey
# NVIDIA and LlamaIndex Developer Contest
This application was developed as a part of the NVIDIA and LlamaIndex Developer Contest.

# Table of Contents
- [Introduction](#introduction)
- [How it Works](#how-it-works)
- [Project Structure](#project-structure)
- [Installation and Use](#installation-and-use)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [How to Play](#how-to-play)
  - [Disclaimer and Guidelines](#disclaimer-and-guidelines)
  - [Instructions](#instructions)
- [Troubleshooting Potential Issues](#troubleshooting-potential-issues)
- [Current Limitations and Future Improvements](#current-limitations-and-future-improvements)

# Introduction
OtherWorld Odyssey is an interactive adventure/storytelling application that draws inpsiration from classic role-playing games, and text-based computer games where the player's choices shaped the narrative of their adventures. The application was developed with the aim to use the creative power of Generative AI to create immersive and interactive adventures. It uses Retrieval Augmented Generation (RAG) to allow players to upload literature of their choice (novels, short stoires and other documents), and embark on a journey in an alternate version of the story, while becoming a part of its narrative. Players guide the adventure by taking actions and making decisions, while a 'Game Master' in the form of an AI Agent, interprets the inputs and takes actions to dynamically alter the outcome of the scenarios.

One of the major motivations for this project was to understand how AI can work alongside humans in creative domains. This app serves as an enhancement rather than a replacement for creative humans like writers and artists. By providing an AI-generated layer of responsiveness, it allows authors’ works to transform into adaptive narratives without altering or limiting the story’s core creativity. Writers’ original texts become immersive, replayable experiences that honor their creativity while introducing readers to a new depth of engagement.

# How it Works
This application leverages NVIDIA and LlamaIndex technologies to transform uploaded literature into an immersive, AI-driven adventure experience. Here’s an overview of the key components:

- **Retrieval-Augmented Generation (RAG) with LLamaIndex and NVIDIA Embedding Model**: Uploaded files are embedded using NVIDIA Retrieval QA Embedding Model and LLamaIndex is used to create a 'VectorStoreIndex' from the embeddings. The index is used to rertrieve story context and details throughout gameplay.

- **Game Master (Large Language Model)**: A large language model serves as the primary 'Game Master', for the player's experience. This is the component of the application that interacts with the player directly. It generates scenarios, interpretes player actions, and guides the storyline. It uses LlamaIndex’s Chat Engine interface with a custom game context and memory to maintain continuity and remember player interactions.

- **Action Classification (Small Language Model)**: A lightweight language model classifies player inputs, (e.g., movement, dialogue, observation). The purpose of this component is to add agentic capabilities to the Game Master. Due to the limited scope of this project, currently it only classifies either vision based or non-vision based actions, where vision based actions are further processed for image generation. However, the scalability of the application allows for more complex action classifications to be added in the future. For example, a narration model can be added to the application to process dialogue based actions that the player takes (speech generation), or an audio generation model can be utilized to create detailed audio based on the player's actions and scenarios (sound of footsteps, rain, etc.).

- **Visual Description Extraction (Small Language Model)**: For actions that are classified as using player's vision (e.g., looking out of a window, or inspecting an item), another small language model extracts relevant visual details of the scenario. This description is then passed to an image generation model to create a visual representation of the scene.

- **Image Generation Model**: For actions that are classified as using player's vision, the extracted description is used to generate an image, giving players a custom visual of their current scenario and enhancing immersion.

- **Frontend and Backend Architecture**:

  - Frontend: Built with Next.js, the frontend provides an interactive game interface for users to choose their adventure, input actions and view the generated text and images.
  - Backend: A Python and FastAPI backend handles requests between the frontend and AI models, managing interactions and model responses.

- **NVIDIA NIM API**: All AI models used in the application are selected from [NVIDIA NIM catalogue](https://build.nvidia.com/explore/discover), ensuring reliability and optimized performance.

# Project Structure
```plaintext
project-root/
├── app.py                     # FastAPI app with necessary endpoints
├── game_master.py             # Chat Engine used for player interactions
├── index.py                   # Llamaindex's 'VectorStoreIndex' setup for RAG
├── memory.py                  # Llamaindex's Chat Memory setup
├── models.py                  # Initialization of all the models used for the application
├── prompt.py                  # Custom prompt configurations used throughout the application
├── utils.py                   # Custom utility functions
├── README.md                  # Documentation
├── requirements.txt           # Dependencies for the backend (install this)
├── .env                       # API keys (initialize NVIDIA NIM API key here)
├── Codex/                     # Upload documents here (this directory is loaded by the application)
└── frontend/                  # Next.js frontend for the user interface
```
# Installation and Use
## Prerequisites
- NVIDIA NIM Access (API key for NIM microservices is required to use the AI models for this app)
- Node.js v20 or higher (tested with Node.js v20.17.0)
- Python v3.11 or higher (tested with Python v3.11.7)
- Windows, Linux, or Mac (tested on Windows and Linux)

## Installation
1. Clone this repository, then navigate to the project folder:
```
git clone https://github.com/Haqquee/OtherWorld-Odyssey.git
cd OtherWorld-Odyssey
```
2. From the project root, install dependencies for the backend:
```
pip install -r requirements.txt
```
3. From the frontend folder within project root, install the dependencies for Next.js frontend (npm is required for this step)
```
cd frontend
npm install
```
4. Initialize NVIDIA NIM API key in a .env file in the project root (as shown):
```
NVIDIA_API_KEY=your_api_key
```
5. Start the backend for inference, from the project root folder (ensure that the server starts on default port 8000):
```
fastapi run app.py
```

6. While the backend is running, start the Next.js frontend server seperately (ensure that the server starts on default port 3000).
- To run the app in a development environment:
```
cd frontend
npm run dev
```
- To run the app in a production environment, first build the application, then start it as shown:
```
cd frontend
npm run build
npm start
```

7. At this point the app is ready to be used. Upload documents of your choice in the ``` Codex/ ``` folder in the project root. Documents could be in the form of .txt, .pdf, etc. Feel free to upload various stories (of various sizes) of your choice. This application was based around the idea of using short stories or novels as the retrieval documents. A couple of sample short stories have been uploaded that you can test.

10. Open up the application through your browser:
```
http://localhost:3000
```

## How To Play

### Disclaimer and Guidelines
Since this application utilizes document uploads, please keep in mind:

- Even though the application is for personal use, it is advised to only upload content that you own, have permission to use, or that’s in the public domain.

- Where to Find Content to upload:
  - Public Domain: You can find tons of free, copyright-free books on sites like Project Gutenberg (my personal favorite) and Internet Archive.
  - Your Own Creations: Feel free to upload your original stories and ideas.

- Personal Use Only:
This app is for personal, non-commercial fun. Please don’t upload or use content in ways that violate copyright laws or sell generated content.

- Content Moderation:
While the AI models used for this application contains some moderation, you’re responsible for ensuring your uploaded content is legal and appropriate.

### Instructions
- Once past the welcome screen, you will be prompted to enter information such as name, and the adventure of your choice. You can upload a text or pdf file that contains the story you want to explore interactively within the ```Codex/``` folder of the project root directory, and it will appear on this page. An additional text field with custom prompts is presented here as well. This field is entirely optional, but anything entered here will be passed on to the Game Master to take into consideration when generating an adventure for you. For example, if you would like to generate a very specific scenario from a story that you chose, you can request that here.

- Once in the game screen, the right side of the screen contains the game text and images, as narrated by the Game Master. This is where you will see what is happening in the story. The left side of the screen contains an input field for your actions. Use the input field to type commands or make choices, guiding your character’s actions within the story. While not limited to the following, you can type actions such as: 
  - Movement commands (e.g., "Go north" or "Enter the cave")
  - Interactions with objects or characters (e.g., "Pick up the key" or "Talk to the merchant")
  - Observational commands to get a better sense of the environment (e.g., "Look around" or "Examine the room")

- There are very little restrictions and guardrails for the player presented in place at the moment. This application currently does not have an endgame element, meaning that players can keep exploring the story indefinitely until they decide to reset the adventure by refreshing the page or restarting the application. Due to the lack of an end goal, long sessions of interactions may cause performance issues and impact on the memory of the Game Master (context length limitations).

- 'Save Adventure' button on the game screen downloads a copy of the current adventure.

## Troubleshooting potential issues


# Current Limitations and Future Improvements

Since this is was a contest project, I had to limit the overall scope of the project, to ensure that I was able to finish it on time. This means there are a couple of features that I had to ignore, but I could implement in the future to create a more robust experience.
- Lack of guardrails: Due to the creative freedom given to the players in this application, I did not get the time to come up with proper implementation of guardrails, without significantly limiting the way players interact with their adventures. But this could be done in the future.
- Lack of objectives: Currently, there are no end goals or objectives for the gameplay. This means players can continue playing indefinitely (only limited by the LLM's performance). However, feature additions such as player health, and other objectives for the player to work towards can change this.
- Implementation of a wide variety of action types: Currently the game only has two types of actions, vision based on non-vision based, where the type of action is determined by the Agentic AI. I want to create a more dynamic system, where the AI can choose between a more diverse set of actions to classify, and respond to each of them accordingly. For example, vision based actions will call image generation model to create visuals (the application already does this), dialogue based actions will call speech model for narration. Furthermore, I would also like to add an audio generation model that creates audios based on the scenario that the player is currently in, and the actions they do (sound of walking, runnning, etc.).
- Basic AI interaction: The interaction with the language model is still relatively simple. While it can create scenarios based on player input, there is room for improvement in how it understands and reacts to more complex user actions and emotional tones