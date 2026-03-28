import type { IPiece } from "../pieces/base/IPiece";
import type { IChessBoard } from "../structures/ChessBoard";
import type { IPosition } from "../structures/Position";
import { MoveBase } from "./IMove";

export class PawnDoubleMove extends MoveBase {
	getMoves(board: IChessBoard, piece: IPiece): IPosition[] {
		const dir = this.directions[0];
		const middlePos = piece.position.getOffset(dir, piece.color);
		const middle = board.at(middlePos);

		if (middle !== null) return [];

		const targetPos = middlePos.getOffset(dir, piece.color);
		const to = board.at(targetPos);

		if (this._evaluateConditions(to)) {
			return [targetPos];
		}

		return [];
	}
}
