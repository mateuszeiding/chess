import { SlidingMovePattern } from "../../movePatterns/SlidingMovePattern";
import { DIAGONAL_DIRECTIONS } from "../../moves/movePatterns";
import { Piece } from "../base/Piece";
import { PIECE_VARIANT, type PieceVariant } from "../enums";
import { ReliantPattern } from "../../movePatterns/ReliantPattern";
import { SomeCondition } from "../../conditions/logical/SomeCondition";
import { EmptyPlaceCondition } from "../../conditions/EmptyPlaceCondition";
import { EnemyCondition } from "../../conditions/EnemyCondition";
import type { IMovePattern } from "../../movePatterns/IMovePattern";
import { OwnPieceCondition } from "../../conditions/OwnPieceCondition";

export class Bishop extends Piece {
	variant: PieceVariant = PIECE_VARIANT.Bishop;
	protected _movePatterns: IMovePattern[] = [
		new ReliantPattern(
			new SomeCondition([new EmptyPlaceCondition(), new EnemyCondition()]),
			new SlidingMovePattern(
				DIAGONAL_DIRECTIONS,
				new EnemyCondition(),
				new OwnPieceCondition(),
			),
		),
	];
}
