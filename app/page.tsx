'use client'

import Welcome from "./components/Welcome";
import PlayerForm from "./components/PlayerForm";
import PromptInterface from "./components/PromptInterface";
import { useState } from "react";


export default function Home() {
  const [step, setStep] = useState<'welcome' | 'input' | 'adventure'>('welcome');
  const [playerName, setPlayerName] = useState<string>('');
  const [adventureName, setAdventureName] = useState<string>('');
  
  const handleFormSubmit = (name: string, adventureInfo: string) => {
    setPlayerName(name);
    setAdventureName(adventureInfo);
    setStep('adventure');
  };

  return (
    <div className="">
      <main className="">
        {step === 'welcome' && ( 
          <div className="min-h-screen flex justify-center text-center items-center">
            <div className="w-1/2">
              <h1 className="text-9xl">
                OtherWorld Odyssey
              </h1>
              <h2 className="text-5xl text-yellow-400">
                Retrieval Augmented Adventure
              </h2>
              <p className="text-2xl py-5">
                OtherWorld is a creative application developed using the power of NVIDIA and LLamaIndex technologies. It utilizes retrieval-augmented generation (RAG) and multimodal AI pipelines, to create an interactive adventure. You can upload a world of your choosing (your favorite novel, a short story, a historical event, etc.) or let the AI generate a custom story for you. The AI will take you through your chosen world and various scenarios within it, and allow you to experience what it would be like to live in your fantasy world.
              </p>
              <button onClick={() => setStep('input')} className="bg-white text-black rounded-md p-1 px-5 text-xl hover:scale-105 hover:bg-yellow-400">
                Start
              </button>
            </div>             
          </div>
        )}

        {step === 'input' && (
          <div>
            <PlayerForm onSubmit={handleFormSubmit}/>
          </div>
        )}

        {step === 'adventure' &&(
          <div>
            <PromptInterface />
          </div>
        )}
      </main>

    </div>
  );
}
