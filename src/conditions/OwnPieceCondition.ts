import type { IMove } from "../moves/IMove";
import type { ICondition } from "./ICondition";

export class OwnPieceCondition implements ICondition {
	check(move: IMove): boolean {
		return move.target.color === move.piece.color;
	}
}
