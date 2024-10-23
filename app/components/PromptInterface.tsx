import { error } from "console";
import React, { useEffect, useState } from "react";

export default function PromptInterface() {

  const [playerInput, setPlayerInput] = useState<string>('');
  const [scenarioText, setScenarioText] = useState<any[]>([]);
  const [scenarioImage, setScenarioImage] = useState('');
  const [adventureLoading, setAdventureLoading] = useState<boolean>(false);
  const [textLoading, setTextLoading] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function startAdventure() {
      setAdventureLoading(true);
      try {
        const res = await fetch("http://127.0.0.1:8000/api/start_adventure");
        const data = await res.json();
        setScenarioText((prevText) => [...prevText, data.output]);
        setAdventureLoading(false);
        
      } catch (err) {
        console.error("Failed to retrieve an LLM response", err);
        setAdventureLoading(false);
      }
    }
    
    startAdventure();
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTextLoading(true);

    if (playerInput.trim()) {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/generate_llm_response", {
          method: 'POST', 
          headers: {
            "Content-Type": "Application/JSON",
          },
          body: JSON.stringify({ player_action: playerInput })
        });
  
        const data = await res.json();
        setScenarioText((prevText) => [...prevText, data.output]);
        setPlayerInput("");

      } catch (err) {
        console.error("Error fetching LLM response: ", err);
        setScenarioText((prevText) => [...prevText, "Error fetching LLM response."]);

      } finally {
        setTextLoading(false);
      }
    }
  }

  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setImageLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/generate_image_response", {
        method: 'POST', 
        headers: {
          "Content-Type": "Application/JSON",
        },
        body: JSON.stringify({ image_description: playerInput })
      });
      
      const data = await res.json();
      const image = {
        type: "image",
        src: `data:image/png;base64,${data.base64}`,
      };

      setScenarioText((prevText) => [...prevText, image]);

    } catch (err) {
      console.error("Error fetching image response: ", err);

    } finally {
      setImageLoading(false);
    }
  }

  return (
    <div className="h-screen fixed flex justify-center gap-24 pt-48">
    {adventureLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-yellow-400"></div>
        <p className="ml-4 text-yellow-400 text-2xl">Generating Adventure...</p>
        </div>
      )}
      <div className="w-1/3">
        <form onSubmit={handleSubmit} className="flex flex-col text-white p-2 m-2">
          <input type="text" 
            placeholder="Input your action..." 
            value={playerInput}
            onChange={(e) => setPlayerInput(e.target.value)}
            className="rounded-md bg-black bg-opacity-50 text-white text-xl border-2 p-2 mb-4"  
          />
          <button type="submit" className="bg-white text-black rounded-md p-2 w-1/4 text-l hover:bg-yellow-400 hover:scale-105">Action</button>
          <button type="button" onClick={generateImage} className="bg-white text-black rounded-md p-2 w-1/4 text-l hover:bg-yellow-400 hover:scale-105">Perception</button>
        </form>
      </div>

      

      <div className="h-screen w-2/3 bg-page_background bg-repeat-y bg-local p-10 text-black overflow-y-auto">
      <h2 className="text-3xl mb-4"></h2>

      {/* Scenario Text */}
      {scenarioText.length > 0 ? (
        scenarioText.map((text, index) => (
        <div key={index} className="mb-6">
          {text.type === "image" ? (
            <div>
              <img
                src={text.src}
                alt={`Scenario image ${index}`}
                className="w-full h-auto object-cover"/>
            </div>
          ) : (
            <p className="text-xl leading-loose">{text}</p>
          )}
        </div>
        ))
      ) : (
        <p className="text-xl leading-loose"></p>
      )}
      {textLoading && (
        <div className="">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-black"></div>
        <p className="ml-4 text-black text-2xl">Generating Text...</p>
        </div>
      )}
        {/* Scenario Image */}
        <div className="mb-6 bg-black bg-opacity-50 border-double border-black border-8">
          <img
            src="/lake.jpg" 
            alt="Dark Forest"
            className="w-full h-auto rounded shadow-md"
          />
        </div>
      </div>
          
    </div>
  );
  
}
