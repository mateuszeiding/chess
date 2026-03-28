import {
	PIECE_VARIANT,
	type IPiece,
	type PieceColor,
	type PieceVariant,
} from "./base/Piece";
import { Bishop } from "./types/Bishop";
import { King } from "./types/King";
import { Knight } from "./types/Knight";
import { Pawn } from "./types/Pawn";
import { Queen } from "./types/Queen";
import { Rook } from "./types/Rook";

export function createPiece(
	variant: PieceVariant,
	color: PieceColor,
	position: IPosition,
): IPiece {
	switch (variant) {
		case PIECE_VARIANT.Rook:
			return new Rook(color, position);
		case PIECE_VARIANT.Knight:
			return new Knight(color, position);
		case PIECE_VARIANT.Bishop:
			return new Bishop(color, position);
		case PIECE_VARIANT.Queen:
			return new Queen(color, position);
		case PIECE_VARIANT.King:
			return new King(color, position);
		case PIECE_VARIANT.Pawn:
			return new Pawn(color, position);
	}
}
