export default function Welcome() {
  return (
    <div className="h-full flex justify-center text-center items-center">
      <div className="w-1/2">
        <h1 className="text-9xl">
          OtherWorld
        </h1>
        <h2 className="text-5xl">
          Retrieval Augmented Adventure
        </h2>
        <p className="text-2xl py-5">
          OtherWorld is a creative application developed using the power of NVIDIA and LLamaIndex technologies. It utilizes retrieval-augmented generation (RAG) and multimodal AI pipelines, to create an interactive adventure. You can upload a world of your choosing (your favorite novel, a short story, a historical event, etc.) or let the AI generate a custom story for you. The AI will take you through your chosen world and various scenarios within it, and allow you to experience what it would be like to live in your fantasy world.
        </p>
        <button className="bg-white text-black rounded-md p-1 px-5 text-xl hover:bg-slate-500 hover:scale-105">
          Start
        </button>
      </div>
      
      
    </div>
  );
}
