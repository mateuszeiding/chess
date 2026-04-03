import { EmptyCondition } from "../conditions/EmptyCondition";
import type { ICondition } from "../conditions/ICondition";
import { NotCondition } from "../conditions/logical/NotCondition";
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

export class SlidingMovePattern implements IMovePattern {
	private readonly _directions: IPosition[];
	private readonly _endCondition: ICondition;
	private readonly _breakCondition: ICondition;

	constructor(
		directions: IPosition[],
		endCondition?: ICondition,
		breakCondition?: ICondition,
	) {
		this._directions = directions;
		this._endCondition =
			endCondition ?? new NotCondition([new EmptyCondition()]);
		this._breakCondition =
			breakCondition ?? new NotCondition([new EmptyCondition()]);
	}

	getMoves(board: IBoard, piece: IPiece): IMove[] {
		const possibleMoves: IMove[] = [];

		for (const dir of this._directions) {
			const currPos: IPositionInstance = piece.position.getOffset(
				dir,
				piece.color,
			);

			if (!Position.isValid(currPos)) {
				continue;
			}

			while (Position.isValid(currPos)) {
				const to = board.chessboard.at(currPos);

				const move: IMove = new Move(board, piece, to);
				if (this._breakCondition.check(move)) {
					break;
				}

				possibleMoves.push(move);

				currPos.set(currPos.getOffset(dir, piece.color));

				if (this._endCondition.check(move)) {
					break;
				}
			}
		}

		return possibleMoves;
	}
}
