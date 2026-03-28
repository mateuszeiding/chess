import type { IChessBoard } from "../../structures/ChessBoard";
import type { IPosition, IPositionInstance } from "../../structures/Position";
import type { PieceColor, PieceVariant } from "../enums";

export interface IPiece {
	variant: PieceVariant;
	color: PieceColor;
	get FENChar(): string;
	position: IPositionInstance;
	getPossibleMoves(board: IChessBoard): IPosition[];
	onMove(): void;
}
