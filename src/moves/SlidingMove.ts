import type { ReadonlyBoardMatrix } from "../core/Board";
import type { IPiece } from "../pieces/base/IPiece";
import { MAX_BOARD_SIZE } from "../utils/constants";
import { MoveBase } from "./IMove";

export class SlidingMove extends MoveBase {
	getMoves(board: ReadonlyBoardMatrix, piece: IPiece): IPosition[] {
		const possibleMoves: IPosition[] = [];

		for (const dir of this.directions) {
			const currPos: IPosition = {
				x: piece.position.x + dir.x,
				y: piece.position.y + dir.y,
			};

			while (
				currPos.x >= 0 &&
				currPos.x <= MAX_BOARD_SIZE &&
				currPos.y >= 0 &&
				currPos.y <= MAX_BOARD_SIZE
			) {
				const to = board[currPos.y]?.[currPos.x] ?? null;

				if (this._evaluateConditions(to)) {
					possibleMoves.push({ ...currPos });
				}

				if (to !== null) {
					break;
				}

				currPos.x += dir.x;
				currPos.y += dir.y;
			}
		}

		return possibleMoves;
	}
}
