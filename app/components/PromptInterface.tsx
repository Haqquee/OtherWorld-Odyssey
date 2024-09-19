import React, { useState } from "react";


export default function PromptInterface() {
  return (
    <div className="h-full flex justify-center gap-24 pt-48">
      <div>
        <input type="text" placeholder="Input your action..." className="rounded-md bg-black bg-opacity-50 text-white text-xl border-2 p-2 m-2 w-96" />
      </div>
      <div className="h-full w-2/3 bg-page_background p-10 text-black">
        <div className="mb-6">
          <h2 className="text-3xl mb-4">The Dark Forest</h2>
          <p className="text-xl leading-loose">
          Dracula takes a ship called the Demeter for England with boxes of earth from his castle. The captain's log narrates the crew's disappearance until he alone remains, bound to the helm to maintain course. An animal resembling a large dog is seen leaping ashore when the ship runs aground at Whitby.

Lucy Westenra's letter to her best friend, Harker's fiancée Mina Murray, describes her marriage proposals from Dr. John Seward, Quincey Morris, and Arthur Holmwood. Lucy accepts Holmwood's, but all remain friends. Mina joins Lucy on holiday in Whitby. Lucy begins sleepwalking. After his ship lands there, Dracula stalks Lucy. Mina receives a letter about her missing fiancé's illness, and goes to Budapest to nurse him. Lucy becomes very ill. Seward's old teacher, Professor Abraham Van Helsing, determines the nature of Lucy's condition, but refuses to disclose it. He diagnoses her with acute blood-loss. Van Helsing places garlic flowers around her room and makes her a necklace of them. Lucy's mother removes the garlic flowers, not knowing they repel vampires. While Seward and Van Helsing are absent, Lucy and her mother are terrified by a wolf and Mrs. Westenra dies of a heart attack; Lucy dies shortly thereafter. After her burial, newspapers report children being stalked in the night by a "bloofer lady" (beautiful lady), and Van Helsing deduces it is Lucy. The four go to her tomb and see that she is a vampire. They stake her heart, behead her, and fill her mouth with garlic. Jonathan Harker and his now-wife Mina have returned, and they join the campaign against Dracula.

Everyone stays at Dr. Seward's asylum as the men begin to hunt Dracula. Van Helsing finally reveals that vampires can only rest on earth from their homeland. Dracula communicates with Seward's patient, Renfield, an insane man who eats vermin to absorb their life force. After Dracula learns of the group's plot against him, he uses Renfield to enter the asylum. He secretly attacks Mina three times, drinking her blood each time and forcing Mina to drink his blood on the final visit. She is cursed to become a vampire after her death unless Dracula is killed. As the men find Dracula's properties, they discover many earth boxes within. The vampire hunters open each of the boxes and seal wafers of sacramental bread inside them, rendering them useless to Dracula. They attempt to trap the Count in his Piccadilly house, but he escapes. They learn that Dracula is fleeing to his castle in Transylvania with his last box. Mina has a faint psychic connection to Dracula, which Van Helsing exploits via hypnosis to track Dracula's movements. Guided by Mina, they pursue him.

In Galatz, Romania, the hunters split up. Van Helsing and Mina go to Dracula's castle, where the professor destroys the vampire women. Jonathan Harker and Arthur Holmwood follow Dracula's boat on the river, while Quincey Morris and John Seward parallel them on land. After Dracula's box is finally loaded onto a wagon by Romani men, the hunters converge and attack it. After routing the Romani, Harker decapitates Dracula as Quincey stabs him in the heart. Dracula crumbles to dust, freeing Mina from her vampiric curse. Quincey is mortally wounded in the fight against the Romani. He dies from his wounds, at peace with the knowledge that Mina is saved. A note by Jonathan Harker seven years later states that the Harkers have a son, named Quincey.
          </p>
        </div>

        {/* Scenario Image */}
        <div className="mb-6 bg-black bg-opacity-50 border-double border-black border-8">
          <img
            src="/lake.jpg" // Use appropriate dynamic image path
            alt="Dark Forest"
            className="w-full h-auto rounded shadow-md"
          />
        </div>
      </div>
          
    </div>
  );
}
