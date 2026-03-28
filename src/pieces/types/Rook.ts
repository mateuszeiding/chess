import { EmptyPlaceCondition } from "../../conditions/EmptyPlaceCondition";
import { EnemyCondition } from "../../conditions/EnemyCondition";
import type { IMove } from "../../moves/IMove";
import { STRAIGHT_DIRECTIONS } from "../../moves/movePatterns";
import { SlidingMove } from "../../moves/SlidingMove";
import { Piece } from "../base/Piece";
import { PIECE_VARIANT, type PieceVariant } from "../enums";

export class Rook extends Piece {
	variant: PieceVariant = PIECE_VARIANT.Rook;
	protected _moves: IMove[] = [
		new SlidingMove(STRAIGHT_DIRECTIONS, [
			new EmptyPlaceCondition(),
			new EnemyCondition(this.color),
		]),
	];
}
