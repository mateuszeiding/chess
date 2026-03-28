import type { IPiece } from "../pieces/base/IPiece";
import { PIECE_COLOR, PIECE_VARIANT, type PieceVariant } from "../pieces/enums";
import { createPiece } from "../pieces/pieceFactory";

type BoardMatrix = (IPiece | null)[][];
export type ReadonlyBoardMatrix = ReadonlyArray<ReadonlyArray<IPiece | null>>;

export interface IBoard {
	chessboard: BoardMatrix;
	move(from: IPosition, to: IPosition): void;
	getMovesFor(position: IPosition): IPosition[];
}

const FEN_TO_PIECE_VARIANT_MAP: Record<string, PieceVariant> = {
	r: PIECE_VARIANT.Rook,
	n: PIECE_VARIANT.Knight,
	b: PIECE_VARIANT.Bishop,
	q: PIECE_VARIANT.Queen,
	k: PIECE_VARIANT.King,
	p: PIECE_VARIANT.Pawn,
};

export class Board implements IBoard {
	fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

	chessboard: BoardMatrix = Array.from({ length: 8 }, () =>
		new Array(8).fill(null),
	);

	constructor() {
		this._initializeBoard();
	}

	getMovesFor(position: IPosition) {
		const piece = this._getPieceAt(position);
		return piece.getPossibleMoves(this.chessboard);
	}

	move(from: IPosition, to: IPosition) {
		const piece = this._getPieceAt(from);
		piece.position = to;
		piece.onMove();
		this.chessboard[to.y][to.x] = piece;
		this.chessboard[from.y][from.x] = null;
	}

	private _getPieceAt(position: IPosition): IPiece {
		const piece = this.chessboard[position.y][position.x];
		if (!piece) {
			throw new Error("No piece at the given position");
		}
		return piece;
	}

	private _initializeBoard() {
		const rows = this.fen.split("/");
		for (let i = 0; i < rows.length; i++) {
			const row = rows[i];
			let colIndex = 0;
			for (const char of row) {
				if (/\d/.test(char)) {
					colIndex += Number.parseInt(char, 10);
				} else {
					const piece = createPiece(
						FEN_TO_PIECE_VARIANT_MAP[char.toLowerCase()],
						PIECE_COLOR[char === char.toUpperCase() ? "White" : "Black"],
						{ y: i, x: colIndex },
					);
					this.chessboard[i][colIndex] = piece;
					colIndex++;
				}
			}
		}
	}
}
