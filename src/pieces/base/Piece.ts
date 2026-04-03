import type { IBoard } from "../../core/Board";
import type { IMovePattern } from "../../movePatterns/IMovePattern";
import type { IMove } from "../../moves/IMove";
import {
	Position,
	type IPosition,
	type IPositionInstance,
} from "../../structures/Position";
import { PIECE_COLOR, type PieceColor, type PieceVariant } from "../enums";
import type { IPiece } from "./IPiece";

export abstract class Piece implements IPiece {
	position: IPositionInstance;
	readonly color: PieceColor;

	abstract readonly variant: PieceVariant;
	protected abstract readonly _movePatterns: IMovePattern[];

	constructor(color: PieceColor, position: IPosition) {
		this.color = color;
		this.position = new Position(position.x, position.y);
	}

	get FENChar(): string {
		return this.color === PIECE_COLOR.White
			? this.variant.toUpperCase()
			: this.variant.toLowerCase();
	}

	getPossibleMoves(board: IBoard): IMove[] {
		return this._movePatterns.flatMap((pattern) =>
			pattern.getMoves(board, this),
		);
	}

	onMove(): void {}
}
