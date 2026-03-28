import { EmptyPlaceCondition } from "../../conditions/EmptyPlaceCondition";
import { EnemyCondition } from "../../conditions/EnemyCondition";
import { FirstMoveCondition } from "../../conditions/FirstMoveCondition";
import type { IMove } from "../../moves/IMove";
import { FORWARD_DIRECTIONS } from "../../moves/movePatterns";
import { PawnDoubleMove } from "../../moves/PawnDoubleMove";
import { SingleMove } from "../../moves/SingleMove";
import { Piece } from "../base/Piece";
import { PIECE_VARIANT, type PieceVariant } from "../enums";

export class Pawn extends Piece {
	variant: PieceVariant = PIECE_VARIANT.Pawn;
	hasMoved: boolean = false;
	protected _moves: IMove[] = [
		new SingleMove(FORWARD_DIRECTIONS, [new EmptyPlaceCondition()]),
		new SingleMove(
			[
				{ x: 1, y: 1 },
				{ x: -1, y: 1 },
			],
			[new EnemyCondition(this.color)],
		),
		new PawnDoubleMove(FORWARD_DIRECTIONS, [
			new FirstMoveCondition(this),
			new EmptyPlaceCondition(),
		]),
	];

	override onMove(): void {
		this.hasMoved = true;
	}
}
