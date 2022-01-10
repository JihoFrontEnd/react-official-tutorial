import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

interface SquareProps {
  value: number | string;
  onClick: () => void;
}

function Square(props: SquareProps) {
  return (
    <button
      className='square'
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
}

function Board(props: Record<string, string>) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const handleClick = (i: number) => {
    const newSquares = squares.slice();
    newSquares[i] = 'X';
    setSquares(newSquares);
  };
  const renderSquare = (i: number) => (
    <Square
      value={squares[i]}
      onClick={() => handleClick(i)}
    />
  );
  const status = 'Next player: X';
  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
