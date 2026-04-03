import type { IBoard } from "../core/Board";
import type { IPiece } from "../pieces/base/IPiece";

export interface IMove {
	readonly board: IBoard;
	readonly piece: IPiece;
	readonly target: IPiece;
	movePiece(): void;
}
