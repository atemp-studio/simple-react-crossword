"use client";

import { Crossword } from '@atemp-studio/simple-react-crossword'

const data = {
  across: {
    1: {
      clue: 'one plus one',
      answer: 'TWO',
      row: 0,
      col: 0,
    },
  },
  down: {
    2: {
      clue: 'three minus two',
      answer: 'ONE',
      row: 0,
      col: 2,
    },
  },
};

const solution = `QUAFF
THREE
RHODE
.USE.
.HEX.`

const acrossClues = `Hearty draft
First odd prime
___ Island School of Design
"___ it or lose it"
Witch's work`

const downClues = `Time unit in basketball: Abbr.
"Sure, whatever you say ..."
Popped up
UPS competitor
Charge`

export default function Home() {
  return (
    <main>
      <h1>@atemp-studio/simple-react-crossword</h1>

      <h2>Basic Example</h2>
      <Crossword data={data}/>

      <br/><hr/>

      <h2>Across Lite Example</h2>
      <Crossword 
        solution={solution} 
        acrossClues={acrossClues} 
        downClues={downClues} 
        onCrosswordComplete={(correct) => console.log(`Complete with status: ${correct ? 'correct' : 'incorrect'}`)}
      />
    </main>
  );
}
