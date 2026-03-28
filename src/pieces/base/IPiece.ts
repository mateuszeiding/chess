import type { ReadonlyBoardMatrix } from "../../core/Board";
import type { PieceColor, PieceVariant } from "../enums";

export interface IPiece {
	variant: PieceVariant;
	color: PieceColor;
	get FENChar(): string;
	position: IPosition;
	getPossibleMoves(board: ReadonlyBoardMatrix): IPosition[];
}
