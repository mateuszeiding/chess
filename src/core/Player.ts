import type { IPiece } from "../pieces/base/IPiece";
import {
	PIECE_COLOR,
	PIECE_VARIANT,
	type PieceColor,
	type PieceVariant,
} from "../pieces/enums";
import { createPiece } from "../pieces/pieceFactory";

export interface IPlayer {
	color: PieceColor;
	pieces: IPiece[];
}

const FEN_TO_PIECE_VARIANT_MAP: Record<string, PieceVariant> = {
	r: PIECE_VARIANT.Rook,
	n: PIECE_VARIANT.Knight,
	b: PIECE_VARIANT.Bishop,
	q: PIECE_VARIANT.Queen,
	k: PIECE_VARIANT.King,
	p: PIECE_VARIANT.Pawn,
};

export class Player implements IPlayer {
	color: PieceColor;
	pieces: IPiece[] = [];

	private readonly fenPieces = "rnbqkbnr/pppppppp";

	constructor(color: PieceColor) {
		this.color = color;
		this._initializePieces();
	}

	private _initializePieces() {
		const rows = this.fenPieces.split("/");

		if (this.color === PIECE_COLOR.White) {
			rows.reverse();
		}

		for (let i = 0; i < rows.length; i++) {
			const row = rows[i];
			const offset = this._getColorOffset();

			for (let colIndex = 0; colIndex < row.length; colIndex++) {
				const char = row[colIndex];
				const piece = createPiece(
					FEN_TO_PIECE_VARIANT_MAP[char.toLowerCase()],
					this.color,
					{ y: offset + i, x: colIndex },
				);

				this.pieces.push(piece);
			}
		}
	}

	private _getColorOffset() {
		return this.color === PIECE_COLOR.White ? 6 : 0;
	}
}
