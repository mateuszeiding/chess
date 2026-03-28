import type { IMove } from "../../moves/IMove";
import { ALL_DIRECTIONS } from "../../moves/movePatterns";
import { SingleMove } from "../../moves/SingleMove";
import { Piece } from "../base/Piece";
import { PIECE_VARIANT, type PieceVariant } from "../enums";

export class King extends Piece {
	variant: PieceVariant = PIECE_VARIANT.King;
	protected _moves: IMove[] = [new SingleMove(ALL_DIRECTIONS)];
}
