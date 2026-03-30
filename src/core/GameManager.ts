import type { IPiece } from "../pieces/base/IPiece";
import type { IPosition } from "../structures/Position";
import { Painter } from "../ui/Painter";
import { Board, type IBoard } from "./Board";
import { GameEventEmitter, type IGameEventEmitter } from "./GameEventEmtter";
import { GameState, type IGameState } from "./GameState";

export class GameManager {
	private readonly _board: IBoard;
	private readonly _painter: Painter;
	private readonly _eventEmitter: IGameEventEmitter = new GameEventEmitter();
	private readonly _gameState: IGameState;
	private _selectedPiece: IPiece | null = null;
	private _possibleMoves: IPosition[] = [];

	private constructor() {
		this._eventEmitter = new GameEventEmitter();

		this._board = new Board();
		this._painter = new Painter(this._eventEmitter);
		this._gameState = new GameState(this._board);
	}

	static newGame(): GameManager {
		const gm = new GameManager();

		gm._bindEvents();

		gm._painter.paint(gm._board.chessboard);
		gm._painter.displayTurn(gm._board.currentPlayer.color);

		return gm;
	}

	private _handleTileClick(position: IPosition) {
		const piece = this._board.chessboard.at(position);
		if (this._selectedPiece === piece) {
			return;
		}

		if (piece?.color === this._board.currentPlayer.color) {
			this._selectedPiece = piece;
			this._painter.select(position);
			this._possibleMoves = this._board.getMovesFor(position);
			this._painter.highlightMoves(this._possibleMoves);

			return;
		}

		if (!this._selectedPiece) {
			return;
		}

		if (
			this._possibleMoves.some(
				(pos) => pos.x === position.x && pos.y === position.y,
			)
		) {
			this._board.move(this._selectedPiece.position, position);
			this._painter.paint(this._board.chessboard);
			this._selectedPiece = null;
			this._possibleMoves = [];
			this._gameState.endTurn();
			this._painter.displayTurn(this._board.currentPlayer.color);
		}
	}

	private _bindEvents() {
		this._eventEmitter.onTileClick((position) => {
			this._handleTileClick(position);
		});
	}
}
