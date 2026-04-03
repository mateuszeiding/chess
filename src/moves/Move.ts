import type { IBoard } from "../core/Board";
import type { IPiece } from "../pieces/base/IPiece";
import { Position } from "../structures/Position";
import type { IMove } from "./IMove";

export class Move implements IMove {
	readonly board: IBoard;
	readonly piece: IPiece;
	readonly target: IPiece;

	constructor(board: IBoard, piece: IPiece, target: IPiece) {
		this.board = board;
		this.piece = piece;
		this.target = target;
	}

	movePiece(): void {
		this.board.chessboard.set(this.target.position, this.piece);
		this.board.chessboard.set(this.piece.position, this.target);

		const piecePos = new Position(this.piece.position.x, this.piece.position.y);
		this.piece.position.set(this.target.position);
		this.target.position.set(piecePos);

		this.piece.onMove();
	}
}
