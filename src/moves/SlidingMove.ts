import type { IPiece } from "../pieces/base/IPiece";
import type { IChessBoard } from "../structures/ChessBoard";
import { Position, type IPosition } from "../structures/Position";
import { MoveBase } from "./IMove";

export class SlidingMove extends MoveBase {
	getMoves(board: IChessBoard, piece: IPiece): IPosition[] {
		const possibleMoves: IPosition[] = [];

		for (const dir of this.directions) {
			const currPos: IPosition = piece.position.getOffset(dir);

			while (Position.isValid(currPos)) {
				const to = board.at(currPos);

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
