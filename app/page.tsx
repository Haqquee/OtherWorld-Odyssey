import Welcome from "./components/Welcome"
import PromptInterface from "./components/PromptInterface"

export default function Home() {
  return (
    <div className="h-full w-full">
      <main className="h-full">
        <PromptInterface />
      </main>

    </div>
  );
}
