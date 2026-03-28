import type { IMove } from "../../moves/IMove";
import { ALL_DIRECTIONS } from "../../moves/movePatterns";
import { SlidingMove } from "../../moves/SlidingMove";
import { Piece } from "../base/Piece";
import { PIECE_VARIANT, type PieceVariant } from "../enums";

export class Queen extends Piece {
	variant: PieceVariant = PIECE_VARIANT.Queen;
	protected _moves: IMove[] = [new SlidingMove(ALL_DIRECTIONS)];
}
