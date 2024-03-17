import { CluesInputOriginal } from "./types"

// Types
type IntermediateCrosswordData = {
	clue: string,
	answer: string | null,
	number: number | null,
	row: number | null,
	column: number | null
}[]

// Function to take data downloaded from Crosserville in Across Lite txt format and transform it into the format required by react-crossword
export function acrossLiteFormatter(solutionTxt: string, acrossTxt: string, downTxt: string): CluesInputOriginal {
	// Align data
	let solution = solutionTxt.trim().split('\n').map(x => x.split('').map(x => x === '.' ? null : x))
	let across: IntermediateCrosswordData = acrossTxt.trim().split('\n').filter(x => x).map(x => ({"clue": x, "answer": null, "number": null, "row": null, "column": null}))
	let down: IntermediateCrosswordData = downTxt.trim().split('\n').filter(x => x).map(x => ({"clue": x, "answer": null, "number": null, "row": null, "column": null}))

	let clueIndex = 1
	let acrossClueIndex = 0
	let downClueIndex = 0

	for (let i = 0; i < solution.length; i++) {
		for (let j = 0; j < solution[i].length; j++) {
			if (solution[i][j] !== null) {
				let isAcross = false
				let isDown = false
				// If a cell to the right is not null (or the end of the row) and the cell to the left is null (or the beginning of the row), start a new clue
				if ((j === 0 || solution[i][j-1] === null) && (j !== solution[i].length - 1 && solution[i][j+1] !== null)) {
					across[acrossClueIndex].number = clueIndex
					across[acrossClueIndex].row = i
					across[acrossClueIndex].column = j
					across[acrossClueIndex].answer = solution[i].slice(j).join('').split('.')[0]
					isAcross = true
					acrossClueIndex++
				}
				if ((i === 0 || solution[i-1][j] === null) && (i !== solution.length - 1 && solution[i+1][j] !== null)) {
					// If a cell down is not null (or the end of the column) and the cell above is null (or the start of a column), start a new clue
					down[downClueIndex].number = clueIndex
					down[downClueIndex].row = i
					down[downClueIndex].column = j
					down[downClueIndex].answer = solution.map(x => x[j]).slice(i).join('').split('.')[0]
					isDown = true
					downClueIndex++
				}
				if (isAcross || isDown) {
					// Increment the clue index if a new clue was started
					clueIndex++
				}
			}
		}
	}

	// Transform data into format required by react-crossword
	let crossword_data: CluesInputOriginal = {across: {}, down: {}}

	for (let i = 0; i < across.length; i++) {
		crossword_data.across[across[i].number as number] = {
			clue: across[i].clue,
			answer: across[i].answer as string,
			row: across[i].row as number,
			col: across[i].column as number
		}
	}

	for (let i = 0; i < down.length; i++) {
		crossword_data.down[down[i].number as number] = {
			clue: down[i].clue,
			answer: down[i].answer as string,
			row: down[i].row as number,
			col: down[i].column as number
		}
	}

	return crossword_data
}