import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
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
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

function Board(props: Record<string, any>) {
  const renderSquare = (i: number) => (
    <Square
      value={props.squares[i]}
      onClick={() => props.onClick(i)}
    />
  );

  return (
    <div>
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

type SquareType = { squares: Array<null | string> };
type HistoryType = Array<SquareType>;

function Game() {
  const [history, setHistory] = useState<HistoryType>([{ squares: Array(9).fill(null) }]);
  const [current, setCurrent] = useState<SquareType>({ squares: [] });
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [status, setStatus] = useState<string>('');
  const [stepNumber, setStepNumber] = useState<number>(0);

  const handleClick = useCallback((i: number) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const newCurrent = newHistory[newHistory.length - 1];
    const newSquares = newCurrent.squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) return;
    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory(history.concat({ squares: newSquares }));
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  }, [history, stepNumber, xIsNext]);

  const jumpTo = useCallback((step: number) => {
    setHistory(history.slice(0, step + 1))
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }, [history]);

  useEffect(() => {
    setCurrent(history[stepNumber]);
    const winner = calculateWinner(current.squares);
    setStatus(
      winner
        ? `Winner: ${winner}`
        : `Next player: ${xIsNext ? 'X' : 'O'}`
    );
  }, [current.squares, history, stepNumber, xIsNext]);

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={handleClick}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>
          {history.map((_step, move) => {
            const desc = move
              ? `Go to move #${move}`
              : 'Go to game start';
            return (
              <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: any[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById('root')
);
