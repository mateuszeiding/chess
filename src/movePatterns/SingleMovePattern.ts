import type { IBoard } from "../core/Board";
import type { IMove } from "../moves/IMove";
import { Move } from "../moves/Move";
import type { IPiece } from "../pieces/base/IPiece";
import {
	Position,
	type IPosition,
	type IPositionInstance,
} from "../structures/Position";
import type { IMovePattern } from "./IMovePattern";

export class SingleMovePattern implements IMovePattern {
	private readonly _directions: IPosition[];

	constructor(directions: IPosition[]) {
		this._directions = directions;
	}

	getMoves(board: IBoard, piece: IPiece): IMove[] {
		const possibleMoves: IMove[] = [];

		for (const dir of this._directions) {
			const movePos: IPositionInstance = piece.position.getOffset(
				dir,
				piece.color,
			);

			if (!Position.isValid(movePos)) {
				continue;
			}

			const to = board.chessboard.at(movePos);

			const move: IMove = new Move(board, piece, to);
			possibleMoves.push(move);
		}

		return possibleMoves;
	}
}
