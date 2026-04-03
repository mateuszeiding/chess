import { EmptyPlaceCondition } from "../../conditions/EmptyPlaceCondition";
import { EnemyCondition } from "../../conditions/EnemyCondition";
import { SomeCondition } from "../../conditions/logical/SomeCondition";
import { OwnPieceCondition } from "../../conditions/OwnPieceCondition";
import type { IMovePattern } from "../../movePatterns/IMovePattern";
import { ReliantPattern } from "../../movePatterns/ReliantPattern";
import { SlidingMovePattern } from "../../movePatterns/SlidingMovePattern";
import { ALL_DIRECTIONS } from "../../moves/movePatterns";
import { Piece } from "../base/Piece";
import { PIECE_VARIANT, type PieceVariant } from "../enums";

export class Queen extends Piece {
	variant: PieceVariant = PIECE_VARIANT.Queen;

	protected _movePatterns: IMovePattern[] = [
		new ReliantPattern(
			new SomeCondition([new EmptyPlaceCondition(), new EnemyCondition()]),
			new SlidingMovePattern(
				ALL_DIRECTIONS,
				new EnemyCondition(),
				new OwnPieceCondition(),
			),
		),
	];
}
