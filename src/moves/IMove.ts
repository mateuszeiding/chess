import type { ICondition } from "../conditions/ICondition";
import type { IPiece } from "../pieces/base/IPiece";
import type { IChessBoard } from "../structures/ChessBoard";
import type { IPosition } from "../structures/Position";

export interface IMove {
	getMoves(board: IChessBoard, piece: IPiece): IPosition[];
}

export abstract class MoveBase implements IMove {
	protected readonly directions: IPosition[];
	protected readonly conditions: ICondition[] = [];

	constructor(directions: IPosition[], conditions: ICondition[] = []) {
		this.directions = directions;
		this.conditions = conditions;
	}

	abstract getMoves(board: IChessBoard, piece: IPiece): IPosition[];

	protected _evaluateConditions(to: IPiece | null): boolean {
		return this.conditions.some((condition) => condition.check(to));
	}
}
