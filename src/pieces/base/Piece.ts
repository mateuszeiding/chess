import type { ReadonlyBoardMatrix } from "../../core/Board";
import type { IMove } from "../../moves/IMove";
import { PIECE_COLOR, type PieceColor, type PieceVariant } from "../enums";
import type { IPiece } from "./IPiece";

export abstract class Piece implements IPiece {
	position: IPosition;
	readonly color: PieceColor;

	abstract readonly variant: PieceVariant;
	protected abstract readonly _moves: IMove[];

	constructor(color: PieceColor, position: IPosition) {
		this.color = color;
		this.position = position;
	}

	get FENChar(): string {
		return this.color === PIECE_COLOR.White
			? this.variant.toUpperCase()
			: this.variant.toLowerCase();
	}

	getPossibleMoves(board: ReadonlyBoardMatrix): IPosition[] {
		return this._moves.flatMap((move) => move.getMoves(board, this));
	}
}
