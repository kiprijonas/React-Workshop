import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    const squares = this.props.squares;
    return <Square value={squares[i]} onClick={() => this.props.onClick(i)} />;
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

const PLAY_MOVE = 'PLAY_MOVE';
const JUMP_TO_HISTORY = 'JUMP_TO_HISTORY';

function playMove(square_id) {
  return {
    type: PLAY_MOVE,
    square_id: square_id
  }
}

function jumpToHistory(step){
  return {
    type: JUMP_TO_HISTORY,
    step: step
  }
}

const initialState = {  history: [{squares: Array(9).fill(null)}],
                              stepNumber: 0,
                              xIsNext: true,
                    }

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
      case PLAY_MOVE:
        var history = state.history.slice(0, state.stepNumber + 1);
        var current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[action.square_id]) {
          return state;
        }
        squares[action.square_id] = state.xIsNext ? 'X' : 'O';
        return {
          history: history.concat([{
            squares: squares
          }]),
          stepNumber: history.length,
          xIsNext: !state.xIsNext,
        }
        case JUMP_TO_HISTORY:
        return {
          ...state,
          stepNumber: action.step,
          xIsNext: (action.step % 2) ? false : true,
        }
        default: return state
  }
}


const mapStateToProps = (store) => {
  return {
    history: store.history,
    stepNumber: store.stepNumber,
    xIsNext: store.xIsNext
  };
}

let gameStore = createStore(gameReducer);

class Game extends React.Component {
  handleClick(i) {
    gameStore.dispatch(playMove(i))
  }
  jumpTo(step) {
    gameStore.dispatch(jumpToHistory(step))
  }
  render() {
    const history = this.props.history;
    const current = history[this.props.stepNumber];

    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    return (
      <div className="game">
        <div>
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

Game = connect(mapStateToProps)(Game)

// ========================================

ReactDOM.render(
  <Provider store={gameStore}>
    <Game />
  </Provider>,
  document.getElementById('container')
);

function calculateWinner(squares) {
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
