import { EmptyPlaceCondition } from "../../conditions/EmptyPlaceCondition";
import { EnemyCondition } from "../../conditions/EnemyCondition";
import type { IMove } from "../../moves/IMove";
import { DIAGONAL_DIRECTIONS } from "../../moves/movePatterns";
import { SlidingMove } from "../../moves/SlidingMove";
import { Piece } from "../base/Piece";
import { PIECE_VARIANT, type PieceVariant } from "../enums";

export class Bishop extends Piece {
	variant: PieceVariant = PIECE_VARIANT.Bishop;
	protected _moves: IMove[] = [
		new SlidingMove(DIAGONAL_DIRECTIONS, [
			new EmptyPlaceCondition(),
			new EnemyCondition(this.color),
		]),
	];
}
