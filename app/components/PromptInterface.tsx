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
        setScenarioText((prevText) => [...prevText, {text: data.output, image: null}]);
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
      setPlayerInput("");
      try {
        const res = await fetch("http://127.0.0.1:8000/api/generate_response", {
          method: 'POST', 
          headers: {
            "Content-Type": "Application/JSON",
          },
          body: JSON.stringify({ player_action: playerInput })
        });
  
        const data = await res.json();
        const newScenarioItem = {
          text: data.output,
          image: data.base64 ? `data:image/png;base64,${data.base64}` : null
        };

        setScenarioText((prevText) => [...prevText, newScenarioItem]);
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
        method: 'GET', 
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

  {/*
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
    */}
  

  return (
    <div className="h-screen fixed flex justify-center gap-24 pt-48">
    {adventureLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-yellow-400"></div>
        <p className="ml-4 text-yellow-400 text-2xl">Generating Adventure...</p>
        </div>
      )}
      <div className="w-1/3 pl-10">
        <form onSubmit={handleSubmit} className="flex flex-col text-white p-2 m-2">
          <input type="text" 
            placeholder="Input your action..." 
            value={playerInput}
            onChange={(e) => setPlayerInput(e.target.value)}
            className="rounded-md bg-black bg-opacity-50 text-white text-xl border-2 p-2 mb-4"  
          />
          <button type="submit" className="bg-white text-black rounded-md p-2 m-2 w-1/4 text-l hover:bg-yellow-400 hover:scale-105">Take Action</button>
          <button type="button" onClick={generateImage} className="bg-white text-black rounded-md p-2 m-2 w-1/4 text-l hover:bg-yellow-400 hover:scale-105">Use Vision</button>
        </form>
      </div>

      

      <div className="h-screen w-2/3 bg-page_background bg-repeat-y bg-local p-40 pb-96 text-black overflow-y-auto border-8 border-black border-double">
      <h2 className="text-4xl mb-10">Your Adventure...</h2>

      {/* Scenario Text */}
      {scenarioText.length > 0 ? (
        scenarioText.map((item, index) => (
          <div key={index} className="mb-6">
            {/* Always render the text */}
            <p className="text-xl leading-loose">{item.text}</p>
            
            {/* Render the image if it exists */}
            {item.image && (
              <div>
                <img
                  src={item.image}
                  alt={`Scenario image ${index}`}
                  className="w-full h-auto object-cover grayscale border-8 border-black border-double scale-100"
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-xl leading-loose"></p>
      )}

      {textLoading && (
        <div className="">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-black"></div>
        </div>
      )}

      {imageLoading && (
        <div className="">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-black"></div>
        </div>
      )}
      
      </div>
          
    </div>
  );
  
}
