import type { IMove } from "../moves/IMove";
import { PIECE_COLOR } from "../pieces/enums";
import type { ICondition } from "./ICondition";

export class EmptyPlaceCondition implements ICondition {
	check(move: IMove): boolean {
		return move.target.color === PIECE_COLOR.None;
	}
}
