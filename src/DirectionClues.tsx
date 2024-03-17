import { useContext } from 'react';
import PropTypes from 'prop-types';
import { CrosswordContext } from './context';
import type { Direction, EnhancedProps } from './types';
import Clue from './Clue';

const directionCluesPropTypes = {
  direction: PropTypes.string.isRequired, // Direction of this list of clues ("across" or "down")
  label: PropTypes.string, // A label to use instead of the (English) default
};

export type DirectionCluesProps = EnhancedProps<
  typeof directionCluesPropTypes,
  { direction: Direction }
>;

export default function DirectionClues({
  direction,
  label,
}: DirectionCluesProps) {
  const { clues } = useContext(CrosswordContext);

  return (
    <div className="direction">
      {/* use something other than h3? */}
      <h3 className="header">{label || direction.toUpperCase()}</h3>
      {clues?.[direction].map(({ number, clue, complete, correct }) => (
        <Clue
          key={number}
          direction={direction}
          number={number}
          complete={complete}
          correct={correct}
        >
          {clue}
        </Clue>
      ))}
    </div>
  );
}

DirectionClues.propTypes = directionCluesPropTypes;

DirectionClues.defaultProps = {
  label: undefined,
};
