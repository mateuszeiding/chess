import type { Pawn } from "../pieces/types/Pawn";
import type { ICondition } from "./ICondition";

export class FirstMoveCondition implements ICondition {
	private readonly _piece: Pawn;

	constructor(piece: Pawn) {
		this._piece = piece;
	}

	check(): boolean {
		return this._piece.hasMoved === false;
	}
}
