import React, { useState } from "react";

export default function PromptInterface() {

  const [playerInput, setPlayerInput] = useState<string>('');
  const [scenarioText, setScenarioText] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
        setLoading(false);
      }
    }
  }

  return (
    <div className="h-full flex justify-center gap-24 pt-48">
      <div className="w-1/3">
        <form onSubmit={handleSubmit} className="flex flex-col text-white p-2 m-2">
          <input type="text" 
            placeholder="Input your action..." 
            value={playerInput}
            onChange={(e) => setPlayerInput(e.target.value)}
            className="rounded-md bg-black bg-opacity-50 text-white text-xl border-2 p-2 mb-4"  
          />
          <button className="bg-white text-black rounded-md p-2 w-1/4 text-l hover:bg-yellow-400 hover:scale-105">Submit</button>

        </form>
      </div>

      <div className="h-full w-2/3 bg-page_background p-10 text-black">
      <h2 className="text-3xl mb-4"></h2>
      {/* Scenario Text */}
      {scenarioText.length > 0 ? (
        scenarioText.map((text, index) => (
        <div key={index} className="mb-6">
          <p className="text-xl leading-loose">{text}</p>
        </div>
        ))
      ) : (
        <p className="text-xl leading-loose"></p>
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
