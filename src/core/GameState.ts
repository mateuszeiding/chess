import type { IBoardPlayers } from "./Board";

type GameStatus = "check" | "checkmate" | "stalemate" | "ongoing";

export interface IGameState {
	state: GameStatus;
	endTurn(): void;
}

export class GameState implements IGameState {
	state: GameStatus = "ongoing";
	private _board: IBoardPlayers;

	constructor(board: IBoardPlayers) {
		this._board = board;
	}

	endTurn() {
		[this._board.currentPlayer, this._board.waitingPlayer] = [
			this._board.waitingPlayer,
			this._board.currentPlayer,
		];
	}
}
