export const PIECE_VARIANT = {
	Rook: "r",
	Knight: "n",
	Bishop: "b",
	Queen: "q",
	King: "k",
	Pawn: "p",
} as const;

export type PieceVariant = (typeof PIECE_VARIANT)[keyof typeof PIECE_VARIANT];

export const PIECE_COLOR = {
	White: "w",
	Black: "b",
} as const;

export type PieceColor = (typeof PIECE_COLOR)[keyof typeof PIECE_COLOR];
