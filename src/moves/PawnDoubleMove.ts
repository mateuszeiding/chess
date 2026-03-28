import type { ReadonlyBoardMatrix } from "../core/Board";
import type { IPiece } from "../pieces/base/IPiece";
import { MoveBase } from "./IMove";

export class PawnDoubleMove extends MoveBase {
	getMoves(board: ReadonlyBoardMatrix, piece: IPiece): IPosition[] {
		const dir = this.directions[0];
		const middle =
			board[piece.position.y + dir.y]?.[piece.position.x + dir.x] ?? null;

		if (middle === null || middle.color === piece.color) return [];

		return [
			{
				x: piece.position.x + 2 * dir.x,
				y: piece.position.y + 2 * dir.y,
			},
		];
	}
}
