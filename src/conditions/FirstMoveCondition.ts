import type { IPiece } from "../pieces/base/IPiece";
import type { ICondition } from "./ICondition";

export class FirstMoveCondition implements ICondition {
	private readonly _piece: IPiece;

	constructor(piece: IPiece) {
		this._piece = piece;
	}

	check(): boolean {
		return "hasMoved" in this._piece && this._piece.hasMoved === false;
	}
}
