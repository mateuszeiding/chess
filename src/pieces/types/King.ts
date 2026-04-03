import { EmptyPlaceCondition } from "../../conditions/EmptyPlaceCondition";
import { EnemyCondition } from "../../conditions/EnemyCondition";
import { SomeCondition } from "../../conditions/logical/SomeCondition";
import type { IMovePattern } from "../../movePatterns/IMovePattern";
import { ReliantPattern } from "../../movePatterns/ReliantPattern";
import { SingleMovePattern } from "../../movePatterns/SingleMovePattern";
import { ALL_DIRECTIONS } from "../../moves/movePatterns";
import { Piece } from "../base/Piece";
import { PIECE_VARIANT, type PieceVariant } from "../enums";

export class King extends Piece {
	variant: PieceVariant = PIECE_VARIANT.King;
	protected _movePatterns: IMovePattern[] = [
		new ReliantPattern(
			new SomeCondition([new EmptyPlaceCondition(), new EnemyCondition()]),
			new SingleMovePattern(ALL_DIRECTIONS),
		),
	];
}
