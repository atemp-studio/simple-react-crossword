import React, { useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';

import { EnhancedProps } from './types';

import CrosswordProvider, {
  CrosswordProviderImperative,
  CrosswordProviderProps,
  crosswordProviderPropTypes,
} from './CrosswordProvider';
import CrosswordGrid from './CrosswordGrid';
import DirectionClues from './DirectionClues';

const crosswordPropTypes = {
  ...crosswordProviderPropTypes,
  acrossLabel: PropTypes.string, // The label for the "across" clues
  downLabel: PropTypes.string, // The label for the "down" clues
};

// @ts-expect-error TS doesn't allow non-optional props to be deleted, but we're
// building this into a new type!
delete crosswordPropTypes.children;

// This somewhat non-obvious construction is to get the typings from CrosswordProvider where they
// are "better" than the default inferred types.
export type CrosswordProps = EnhancedProps<
  typeof crosswordPropTypes,
  Omit<CrosswordProviderProps, 'children'>
>;
export type CrosswordImperative = CrosswordProviderImperative;

// Default export, full crossword grid and clues
const Crossword = React.forwardRef<CrosswordImperative, CrosswordProps>(
  ({ acrossLabel, downLabel, ...props }, ref) => {
    const providerRef = useRef<CrosswordProviderImperative>(null);

    // Expose some imperative methods
    useImperativeHandle(
      ref,
      () => ({
        // Sets focus to the crossword component.
        focus: () => providerRef.current?.focus(),
        // Resets the entire crossword; clearing all answers in the grid and also any persisted data.
        reset: () => providerRef.current?.reset(),
        // Fills all the answers in the grid and calls the `onLoadedCorrect` callback with every answer.
        fillAllAnswers: () => providerRef.current?.fillAllAnswers(),
        // Returns whether the crossword is complete entirely correct or not.
        isCrosswordComplete: () => !!providerRef.current?.isCrosswordComplete(),
        // Sets the “guess” character for a specific grid position.
        setGuess: (row: number, col: number, guess: string) =>
          providerRef.current?.setGuess(row, col, guess),
      }),
      []
    );

    return (
      <section className="crossword-wrapper">
        <CrosswordProvider {...props} ref={providerRef}>
          <div className="crossword-grid-container">
            <CrosswordGrid />
          </div>
          <div className="crossword-clues">
            <DirectionClues direction="across" label={acrossLabel} />
            <DirectionClues direction="down" label={downLabel} />
          </div>
        </CrosswordProvider>
      </section>
    );
  }
);

Crossword.displayName = 'Crossword';
Crossword.propTypes = crosswordPropTypes;
Crossword.defaultProps = {
  ...CrosswordProvider.defaultProps,
  acrossLabel: undefined,
  downLabel: undefined,
};

export default Crossword;
