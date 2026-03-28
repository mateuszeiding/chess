import type { IPiece } from "../pieces/base/IPiece";
import type { IPosition } from "../structures/Position";
import { Painter } from "../ui/Painter";
import { Board, type IBoard } from "./Board";
import { GameEventEmitter, type IGameEventEmitter } from "./GameEventEmtter";

export class GameManager {
	private readonly _board: IBoard;
	private readonly _painter: Painter;
	private readonly _eventEmitter: IGameEventEmitter = new GameEventEmitter();
	private _selectedPiece: IPiece | null = null;
	private _possibleMoves: IPosition[] = [];

	private constructor() {
		this._eventEmitter = new GameEventEmitter();

		this._board = new Board();
		this._painter = new Painter(this._eventEmitter);
	}

	static newGame(): GameManager {
		const gm = new GameManager();

		gm._bindEvents();

		gm._painter.paint(gm._board.chessboard);

		return gm;
	}

	private _handleTileClick(position: IPosition) {
		const piece = this._board.chessboard.at(position);
		if (this._selectedPiece === piece) {
			return;
		}

		if (
			this._selectedPiece === null ||
			piece?.color === this._selectedPiece.color
		) {
			this._selectedPiece = piece;
			this._painter.select(position);
			this._possibleMoves = this._board.getMovesFor(position);
			this._painter.highlightMoves(this._possibleMoves);

			return;
		}

		if (
			this._possibleMoves.some(
				(pos) => pos.x === position.x && pos.y === position.y,
			)
		) {
			this._eventEmitter.emitMove(this._selectedPiece.position, position);
			this._selectedPiece = null;
		}
	}

	private _bindEvents() {
		this._eventEmitter.onMove((from, to) => {
			this._board.move(from, to);
			this._painter.paint(this._board.chessboard);
		});

		this._eventEmitter.onTileClick((position) => {
			this._handleTileClick(position);
		});
	}
}
