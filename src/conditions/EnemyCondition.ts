import type { IPiece } from "../pieces/base/IPiece";
import type { PieceColor } from "../pieces/enums";
import type { ICondition } from "./ICondition";

export class EnemyCondition implements ICondition {
	private readonly _pieceColor: PieceColor;

	constructor(pieceColor: PieceColor) {
		this._pieceColor = pieceColor;
	}

	check(to: IPiece | null): boolean {
		return to !== null && to.color !== this._pieceColor;
	}
}
