import { EmptyPlaceCondition } from "../../conditions/EmptyPlaceCondition";
import { EnemyCondition } from "../../conditions/EnemyCondition";
import { SomeCondition } from "../../conditions/logical/SomeCondition";
import type { IMovePattern } from "../../movePatterns/IMovePattern";
import { ReliantPattern } from "../../movePatterns/ReliantPattern";
import { SingleMovePattern } from "../../movePatterns/SingleMovePattern";
import { KNIGHT_DIRECTIONS } from "../../moves/movePatterns";
import { Piece } from "../base/Piece";
import { PIECE_VARIANT, type PieceVariant } from "../enums";

export class Knight extends Piece {
	variant: PieceVariant = PIECE_VARIANT.Knight;
	protected _movePatterns: IMovePattern[] = [
		new ReliantPattern(
			new SomeCondition([new EnemyCondition(), new EmptyPlaceCondition()]),
			new SingleMovePattern(KNIGHT_DIRECTIONS),
		),
	];
}
