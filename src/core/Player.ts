import type { IPiece } from "../pieces/base/IPiece";
import type { PieceColor } from "../pieces/enums";
import type { IBoard } from "./Board";

export interface IPlayer {
	color: PieceColor;
	pieces: IPiece[];
}

export class Player implements IPlayer {
	private readonly _board: IBoard;
	color: PieceColor;
	pieces: IPiece[] = [];

	constructor(board: IBoard, color: PieceColor) {
		this._board = board;
		this.color = color;

		for (const [_, row] of this._board.chessboard.Entries) {
			this.pieces.push(...row.filter((cell) => cell?.color === color));
		}
	}
}
