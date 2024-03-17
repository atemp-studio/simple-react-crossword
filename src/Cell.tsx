import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';

import { CrosswordSizeContext } from './context';
import type { UsedCellData, EnhancedProps } from './types';

const cellPropTypes = {
  // The data specific to this cell
  cellData: PropTypes.shape({
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    guess: PropTypes.string, // .isRequired,
    number: PropTypes.string,
    answer: PropTypes.string,
  }).isRequired,
  focus: PropTypes.bool, // Whether this cell has focus
  highlight: PropTypes.bool, // Whether this cell is highlighted
  onClick: PropTypes.func, // Handler called when the cell is clicked
};

export type CellProps = EnhancedProps<
  typeof cellPropTypes,
  {
    cellData: UsedCellData; // the data specific to this cell
    onClick?: (cellData: UsedCellData) => void; // handler called when the cell is clicked
  }
>;

/**
 * An individual-letter answer cell within the crossword grid.
 *
 * A `Cell` lives inside the SVG for a CrosswordGrid, and renders at a position determined by the
 * `row`, `col`, and `cellSize` properties from * `cellData` and `renderContext`.
 */
export default function Cell({
  cellData,
  onClick,
  focus,
  highlight,
}: CellProps) {
  const { cellSize, cellPadding, cellInner, cellHalf, fontSize } =
    useContext(CrosswordSizeContext);
  const {
    cellBackground,
    cellBorder,
    textColor,
    numberColor,
    focusBackground,
    highlightBackground,
  } = useContext(ThemeContext);

  const handleClick = useCallback<React.MouseEventHandler>(
    (event) => {
      event.preventDefault();
      if (onClick) {
        onClick(cellData);
      }
    },
    [cellData, onClick]
  );

  const { row, col, guess, number, answer } = cellData;
  let x = col * cellSize;
  let y = row * cellSize;
  const strokeWidth = cellSize / 50;
  if (row !== 0) {
    y -= row * strokeWidth;
  }
  if (col !== 0) {
    x -= col * strokeWidth;
  }

  return (
    <g
      onClick={handleClick}
      style={{ cursor: 'default', fontSize: `${fontSize}px` }}
      className="clue-cell"
    >
      <rect
        x={x + cellPadding}
        y={y + cellPadding}
        width={cellInner}
        height={cellInner}
        fill={
          focus
            ? focusBackground
            : highlight
            ? highlightBackground
            : cellBackground
        }
        stroke={cellBorder}
        strokeWidth={strokeWidth}
      />
      {number && (
        <text
          x={x + cellPadding * 5}
          y={y + cellPadding * 5}
          textAnchor="start"
          dominantBaseline="hanging"
          style={{ fontSize: '50%', fill: numberColor }}
        >
          {number}
        </text>
      )}
      <text
        x={x + cellHalf}
        y={y + cellHalf + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fill: textColor }}
        className={
          answer === guess ? 'guess-text-correct' : 'guess-text-incorrect'
        }
      >
        {guess}
      </text>
    </g>
  );
}

Cell.propTypes = cellPropTypes;

Cell.defaultProps = {
  focus: false,
  highlight: false,
  onClick: null,
};
