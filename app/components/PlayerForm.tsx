'use client'
import { useState, useEffect } from "react";

interface PlayerFormProps {
  onSubmit: (playerName: string, selectedAdventure: string | null, uploadedFile: File | null, adventureParams: string) => void;
}

export default function PlayerForm({ onSubmit }: PlayerFormProps) {
  const [playerName, setPlayerName] = useState<string>('');
  const [filesList, setFilesList] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedAdventure, setSelectedAdventure] = useState<string | null>(null);
  const [adventureParams, setAdventureParams] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  //const [adventureParams, setAdventureParams] = useState<>

  useEffect(() => {
    async function fetchFiles() {
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


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!playerName.trim()) {
      alert("Please enter a name")
      return;
    }

    if (!selectedAdventure && !uploadedFile) {
      alert("Please select an adventure.")
      return;
    }

    onSubmit(playerName, selectedAdventure, uploadedFile, adventureParams);
  }

return(
  <div className="min-h-screen flex justify-center items-center w=1/2">  
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
          <label>Or upload a new adventure</label>
          <input className=" text-yellow-400"
            type="file" 
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                setUploadedFile(files[0]);
              }
            }}
          />
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
