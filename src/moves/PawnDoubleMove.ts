import type { ReadonlyBoardMatrix } from "../core/Board";
import type { IPiece } from "../pieces/base/IPiece";
import { PIECE_COLOR } from "../pieces/enums";
import { MoveBase } from "./IMove";

export class PawnDoubleMove extends MoveBase {
	getMoves(board: ReadonlyBoardMatrix, piece: IPiece): IPosition[] {
		const directionAdjust = piece.color === PIECE_COLOR.White ? -1 : 1;
		const dir = this.directions[0];
		const middle =
			board[piece.position.y + dir.y * directionAdjust]?.[
				piece.position.x + dir.x
			] ?? null;

		if (middle !== null) return [];

		if (this.conditions.every((condition) => condition.check(piece))) {
			return [
				{
					x: piece.position.x + 2 * dir.x,
					y: piece.position.y + 2 * (dir.y * directionAdjust),
				},
			];
		}

		return [];
	}
}
