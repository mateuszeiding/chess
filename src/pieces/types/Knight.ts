import { EmptyPlaceCondition } from "../../conditions/EmptyPlaceCondition";
import { EnemyCondition } from "../../conditions/EnemyCondition";
import type { IMove } from "../../moves/IMove";
import { KNIGHT_DIRECTIONS } from "../../moves/movePatterns";
import { SingleMove } from "../../moves/SingleMove";
import { Piece } from "../base/Piece";
import { PIECE_VARIANT, type PieceVariant } from "../enums";

export class Knight extends Piece {
	variant: PieceVariant = PIECE_VARIANT.Knight;
	protected _moves: IMove[] = [
		new SingleMove(KNIGHT_DIRECTIONS, [
			new EnemyCondition(this.color),
			new EmptyPlaceCondition(),
		]),
	];
}
