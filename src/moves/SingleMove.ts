import type { IPiece } from "../pieces/base/IPiece";
import type { IChessBoard } from "../structures/ChessBoard";
import type { IPosition, IPositionInstance } from "../structures/Position";
import { MoveBase } from "./IMove";

export class SingleMove extends MoveBase {
	getMoves(board: IChessBoard, piece: IPiece): IPosition[] {
		const possibleMoves: IPosition[] = [];

		for (const dir of this.directions) {
			const currPos: IPositionInstance = piece.position.getOffset(
				dir,
				piece.color,
			);

			if (!currPos.isValid(currPos)) {
				continue;
			}

			const to = board.at(currPos);

			if (this._evaluateConditions(to)) {
				possibleMoves.push(currPos);
			}
		}

		return possibleMoves;
	}
}
