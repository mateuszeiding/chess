import type { ICondition } from "../conditions/ICondition";
import type { IBoard } from "../core/Board";
import type { IMove } from "../moves/IMove";
import type { IPiece } from "../pieces/base/IPiece";
import type { IMovePattern } from "./IMovePattern";

export class ReliantPattern implements IMovePattern {
	private readonly _condition: ICondition;
	private readonly _movePattern: IMovePattern;

	constructor(condition: ICondition, movePattern: IMovePattern) {
		this._condition = condition;
		this._movePattern = movePattern;
	}

	getMoves(board: IBoard, piece: IPiece): IMove[] {
		const moves = this._movePattern.getMoves(board, piece);

		const mv = moves.filter((move) => {
			const cond = this._condition.check(move);

			return cond;
		});

		return mv;
	}
}
