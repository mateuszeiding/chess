import type { ReadonlyBoardMatrix } from "../core/Board";
import type { IPiece } from "../pieces/base/IPiece";
import { PIECE_COLOR } from "../pieces/enums";
import { isValidPosition } from "../utils/position";
import { MoveBase } from "./IMove";

export class SingleMove extends MoveBase {
	getMoves(board: ReadonlyBoardMatrix, piece: IPiece): IPosition[] {
		const directionAdjust = piece.color === PIECE_COLOR.White ? -1 : 1;
		const possibleMoves: IPosition[] = [];

		for (const dir of this.directions) {
			const currPos: IPosition = {
				x: piece.position.x + dir.x,
				y: piece.position.y + dir.y * directionAdjust,
			};

			if (!isValidPosition(currPos)) {
				continue;
			}

			const to = board[currPos.y]?.[currPos.x] ?? null;

			if (this._evaluateConditions(to)) {
				possibleMoves.push(currPos);
			}
		}

		return possibleMoves;
	}
}
