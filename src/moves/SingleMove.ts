import type { ReadonlyBoardMatrix } from "../core/Board";
import type { IPiece } from "../pieces/base/IPiece";
import { MoveBase } from "./IMove";

export class SingleMove extends MoveBase {
	getMoves(board: ReadonlyBoardMatrix, piece: IPiece): IPosition[] {
		const possibleMoves: IPosition[] = [];

		for (const dir of this.directions) {
			const to =
				board[piece.position.y + dir.y]?.[piece.position.x + dir.x] ?? null;

			if (this.conditions.every((condition) => condition.check(to))) {
				possibleMoves.push({
					x: piece.position.x + dir.x,
					y: piece.position.y + dir.y,
				});
			}
		}

		return possibleMoves;
	}
}
