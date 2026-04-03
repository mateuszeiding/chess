import { EmptyPlaceCondition } from "../../conditions/EmptyPlaceCondition";
import { EnemyCondition } from "../../conditions/EnemyCondition";
import { EveryCondition } from "../../conditions/logical/EveryCondition";
import { FirstMoveCondition } from "../../conditions/FirstMoveCondition";
import type { IMovePattern } from "../../movePatterns/IMovePattern";
import { ReliantPattern } from "../../movePatterns/ReliantPattern";
import { SingleMovePattern } from "../../movePatterns/SingleMovePattern";
import {
	FORWARD_DIAGONAL_DIRECTIONS,
	FORWARD_DIRECTIONS,
} from "../../moves/movePatterns";
import { Piece } from "../base/Piece";
import { PIECE_VARIANT, type PieceVariant } from "../enums";

export class Pawn extends Piece {
	variant: PieceVariant = PIECE_VARIANT.Pawn;
	hasMoved: boolean = false;

	protected _movePatterns: IMovePattern[] = [
		new ReliantPattern(
			new EmptyPlaceCondition(),
			new SingleMovePattern(FORWARD_DIRECTIONS),
		),
		new ReliantPattern(
			new EnemyCondition(),
			new SingleMovePattern(FORWARD_DIAGONAL_DIRECTIONS),
		),
		new ReliantPattern(
			new EveryCondition([
				new FirstMoveCondition(this),
				new EmptyPlaceCondition(),
			]),
			new SingleMovePattern(FORWARD_DIRECTIONS),
		),
	];

	override onMove(): void {
		this.hasMoved = true;
	}
}
