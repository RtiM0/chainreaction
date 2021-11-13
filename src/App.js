import { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: [...Array(9)].map(() => [...Array(6)].map(() => { return { player: null, mass: 0 } })),
      players: ['red', 'green'],
      turn: 0,
      check: false
    };
  }

  draw() {
    return (
      <>
        {this.state.game.map((x, i) => {
          return (
            <tr key={i}>
              {x.map((y, j) => {
                return (
                  <td id={`[${i},${j}]`} key={j} onClick={this.add.bind(this)} className={`p-5 border-4 border-${this.state.players[this.state.turn]}-600 text-${this.state.game[i][j].player}-600`}>{y.mass}</td>
                )
              })}
            </tr>
          )
        })}
      </>
    );
  }

  add(event) {
    var pos = JSON.parse(event.target.id);
    var board = this.state.game;
    if (board[pos[0]][pos[1]].player === this.state.players[this.state.turn] || board[pos[0]][pos[1]].player === null) {
      board[pos[0]][pos[1]] = { mass: board[pos[0]][pos[1]].mass + 1, player: this.state.players[this.state.turn] };
      this.setState({ game: board });
      this.checkunstable();
      if (this.state.check) {
        var players = this.state.players;
        for (var i = 0; i < players.length; i++) {
          if (!this.searchPlayer(players[i])) {
            players.splice(i, 1);
            i--;
          }
        }
        this.setState({ players: players });
      }
      var turn = this.state.turn;
      if (turn + 1 === this.state.players.length) {
        turn = 0;
      } else {
        turn++;
      }
      this.setState({ turn: turn });
    }
  }

  includesArray = (data, arr) => {
    return data.some(e => Array.isArray(e) && e.every((o, i) => Object.is(arr[i], o)));
  }

  masslimit = pos => {
    if (this.includesArray([[0, 0], [0, 5], [8, 0], [8, 5]], pos)) {
      return 1;
    }
    else if ([0, 8].includes(pos[0]) || [0, 5].includes(pos[1])) {
      return 2;
    }
    else {
      return 3;
    }
  }

  explode(pos) {
    var board = this.state.game;
    try {
      board[pos[0] - 1][pos[1]] = { mass: board[pos[0] - 1][pos[1]].mass + 1, player: board[pos[0]][pos[1]].player };
    } catch { }
    try {
      board[pos[0] + 1][pos[1]] = { mass: board[pos[0] + 1][pos[1]].mass + 1, player: board[pos[0]][pos[1]].player };
    } catch { }
    try {
      board[pos[0]][pos[1] - 1] = { mass: board[pos[0]][pos[1] - 1].mass + 1, player: board[pos[0]][pos[1]].player };
    } catch { }
    try {
      board[pos[0]][pos[1] + 1] = { mass: board[pos[0]][pos[1] + 1].mass + 1, player: board[pos[0]][pos[1]].player };
    } catch { }
    board[pos[0]][pos[1]] = { mass: 0, player: null };
    this.setState({ game: board });
  }

  checkunstable() {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 6; j++) {
        if (this.state.game[i][j].mass > this.masslimit([i, j])) {
          this.setState({ check: true });
          this.explode([i, j]);
          this.checkunstable();
        }
      }
    }
  }

  searchPlayer = player => {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 6; j++) {
        if (this.state.game[i][j].player === player) {
          return true;
        }
      }
    }
    return false;
  }

  render() {
    return (
      <div className="App bg-black">
        <div className="flex h-screen">
          <table className={`m-auto border-collapse border-4 border-${this.state.players[this.state.turn]}-600 text-gray-300 font-extrabold text-2xl`}>
            <thead><tr><th className="text-2xl p-1" colSpan={6}>Chain Reaction</th></tr></thead>
            <tbody>{this.draw()}</tbody>
            <tfoot></tfoot>
          </table>
          {/* for tailwind include css */}
          <div className="border-green-600 text-green-600"></div>
          <div className="border-red-600 text-red-600"></div>
        </div>
      </div>
    );
  }
}

export default App;
