'use client'
import { useState, useEffect } from "react";

interface PlayerFormProps {
  onSubmit: (playerName: string, selectedAdventure: string | null, adventureParams: string) => void;
}

export default function PlayerForm({ onSubmit }: PlayerFormProps) {
  const [playerName, setPlayerName] = useState<string>('');
  const [filesList, setFilesList] = useState<string[]>([]);
  // const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedAdventure, setSelectedAdventure] = useState<string | null>(null);
  const [adventureParams, setAdventureParams] = useState<string>('None');
  const [loading, setLoading] = useState<boolean>(true);
  const [adventureLoading, setAdventureLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchFiles() {
      setLoading(true);
      try {
        const res = await fetch("http://127.0.0.1:8000/api/get_adventures");
        const data = await res.json();
        setFilesList(data.uploaded_adventures);
        setLoading(false);
        
      } catch (err) {
        console.error("Failed to fetch files from local directory", err);
        setLoading(false);
      }
    }
    
    fetchFiles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!playerName.trim()) {
      alert("Please enter a name")
      return;
    }
    
    if (!selectedAdventure) {
      alert("Please select an adventure.")
      return;
    }

    setAdventureLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/initialize_adventure", {
        method: 'POST', 
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'player_name': playerName,
          'adventure_name': selectedAdventure,
          'custom_params': adventureParams,
        })
      });

      if (res.ok) {
        const data = await res.json();
        setAdventureLoading(false);
        
      }
      else {
        console.log("Error generating adventure", res.statusText);
      }
    } catch (err) {
      console.log("Error generating adventure, err");
    }

    onSubmit(playerName, selectedAdventure, adventureParams);
  }

return(
  <div className="min-h-screen flex justify-center items-center w=1/2">  
    {adventureLoading && (
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-yellow-400"></div>
      <p className="ml-4 text-yellow-400 text-2xl">Loading Index...</p>
      </div>
    )}
    <form onSubmit={handleSubmit} className="">
      <h2 className="text-5xl">Enter your details to start the adventure</h2>
        <div className="py-5">
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="border p-2 w-full text-black"
          />
        </div>
        <div className="pb-5">
          <label>Select an adventure</label>
          <select 
            value={selectedAdventure || ''}
            onChange={(e) => setSelectedAdventure(e.target.value)}
            className="bg-black text-yellow-400"
          >
            <option
            value="">None</option>
            {filesList.map((file) =>(
              <option key={file} value={file}>
                {file}
              </option>
            ))}
          </select>
        </div>
        
        <div className="pb-5">
          <input
            type="text"
            placeholder="Additional prompts for adventure customization (e.g. 'Generate scenarios in the style of a horror adventure'.)"
            value={adventureParams}
            onChange={(e) => setAdventureParams(e.target.value)}
            className="border p-2 w-full text-black"
          />
        </div>
        <button
          type="submit"
          className="bg-white text-black rounded-md p-1 px-5 text-xl hover:bg-yellow-400 hover:scale-105"
        >
          Begin Adventure
        </button>
    </form>
  </div>

);
}
