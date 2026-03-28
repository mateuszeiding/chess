import type { ReadonlyBoardMatrix } from "../core/Board";
import type { IPiece } from "../pieces/base/IPiece";
import { MoveBase } from "./IMove";

const BOARD_SIZE = 8;

export class SlidingMove extends MoveBase {
	getMoves(board: ReadonlyBoardMatrix, piece: IPiece): IPosition[] {
		const possibleMoves: IPosition[] = [];

		for (const dir of this.directions) {
			const currPos: IPosition = { x: piece.position.x, y: piece.position.y };

			while (
				currPos.x >= 0 &&
				currPos.x < BOARD_SIZE &&
				currPos.y >= 0 &&
				currPos.y < BOARD_SIZE
			) {
				const to = board[currPos.y]?.[currPos.x] ?? null;

				if (to?.color === piece.color) break;

				if (to?.color !== piece.color) {
					possibleMoves.push({ x: currPos.x, y: currPos.y });
					break;
				}

				if (this.conditions.every((condition) => condition.check(to))) {
					possibleMoves.push({ x: currPos.x, y: currPos.y });
				}

				currPos.x += dir.x;
				currPos.y += dir.y;
			}
		}

		return possibleMoves;
	}
}
