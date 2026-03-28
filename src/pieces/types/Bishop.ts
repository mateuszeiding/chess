import type { IMove } from "../../moves/IMove";
import { ALL_DIRECTIONS } from "../../moves/movePatterns";
import { SlidingMove } from "../../moves/SlidingMove";
import { Piece } from "../base/Piece";
import { PIECE_VARIANT, type PieceVariant } from "../enums";

export class Bishop extends Piece {
	variant: PieceVariant = PIECE_VARIANT.Bishop;
	protected _moves: IMove[] = [new SlidingMove(ALL_DIRECTIONS)];
}
