# simple-react-crossword

A simple, beautiful, and opinionated crossword component for React apps.

Functionally, the library is a series of modifications to the excellent [react-crossword](https://github.com/JaredReisinger/react-crossword) library. Jared Reisinger, the original author, has well documented his work [here](https://react-crossword.jaredreisinger.com/).

## Improvements over react-crossword

- Across Lite support
  - Rather than using a JSON object to define the crossword, you can use three strings: the grid, the clues, and the solution. This is the format used by the popular Across Lite software and can be easily copied from any existing crossword or crossword builder.
- Styling improvements
  - The grid no longer has doubly thick lines at neighboring cells.
  - Black clue numbers are now used instead of the default gray.
  - Clue numbers have been moved to give them more space.
  - Helpful CSS class names have been added to components to allow for easy styling.

## Installation

```bash
npm install @atemp-studio/simple-react-crossword
```

## Usage

Using react-crossword compatible data:

```jsx
<Crossword data={{
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
}}/>
```

Using Across Lite style data:

```jsx
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

// ...

<Crossword 
  solution={solution} 
  acrossClues={acrossClues} 
  downClues={downClues} 
/>
```
