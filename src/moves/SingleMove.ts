import type { ReadonlyBoardMatrix } from "../core/Board";
import type { IPiece } from "../pieces/base/IPiece";
import { PIECE_COLOR } from "../pieces/enums";
import { MoveBase } from "./IMove";

export class SingleMove extends MoveBase {
	getMoves(board: ReadonlyBoardMatrix, piece: IPiece): IPosition[] {
		const directionAdjust = piece.color === PIECE_COLOR.White ? -1 : 1;
		const possibleMoves: IPosition[] = [];

		for (const dir of this.directions) {
			const to =
				board[piece.position.y + dir.y * directionAdjust]?.[
					piece.position.x + dir.x
				] ?? null;

			if (this.conditions.every((condition) => condition.check(to))) {
				possibleMoves.push({
					x: piece.position.x + dir.x,
					y: piece.position.y + dir.y * directionAdjust,
				});
			}
		}

		return possibleMoves;
	}
}
