import type { IBoard } from "../../core/Board";
import type { IMove } from "../../moves/IMove";
import type { IPositionInstance } from "../../structures/Position";
import type { PieceColor, PieceVariant } from "../enums";

export interface IPiece {
	variant: PieceVariant;
	color: PieceColor;
	get FENChar(): string;
	position: IPositionInstance;
	getPossibleMoves(board: IBoard): IMove[];
	onMove(): void;
}
