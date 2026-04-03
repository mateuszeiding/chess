import type { IBoard } from "../../core/Board";
import type { IMove } from "../../moves/IMove";
import {
	Position,
	type IPosition,
	type IPositionInstance,
} from "../../structures/Position";
import {
	PIECE_COLOR,
	PIECE_VARIANT,
	type PieceColor,
	type PieceVariant,
} from "../enums";
import type { IPiece } from "./IPiece";

export class EmptyPiece implements IPiece {
	position: IPositionInstance;
	readonly color: PieceColor = PIECE_COLOR.None;
	readonly variant: PieceVariant = PIECE_VARIANT.None;
	protected readonly _moves: IMove[] = [];

	constructor(position: IPosition) {
		this.position = new Position(position.x, position.y);
	}

	get FENChar(): string {
		return "";
	}

	getPossibleMoves(_: IBoard): IMove[] {
		return [];
	}

	onMove(): void {}
}
