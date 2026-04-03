import type { IMove } from "../moves/IMove";
import type { IPiece } from "../pieces/base/IPiece";
import { PIECE_COLOR, PIECE_VARIANT, type PieceVariant } from "../pieces/enums";
import { createPiece } from "../pieces/pieceFactory";
import { ChessBoard, type IChessBoard } from "../structures/ChessBoard";
import type { IPosition } from "../structures/Position";
import { Painter, type IPainter } from "../ui/Painter";
import { GameState, type IGameState } from "./GameState";
import { Player, type IPlayer } from "./Player";

export interface IBoardPlayers {
	currentPlayer: IPlayer;
	waitingPlayer: IPlayer;
}

export interface IBoard extends IBoardPlayers {
	chessboard: IChessBoard;
	getPieceAt(position: IPosition): IPiece;
	onTileClick(position: IPosition): void;
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
	currentPlayer: IPlayer;
	waitingPlayer: IPlayer;
	chessboard: IChessBoard = new ChessBoard();

	private _selectedPiece: IPiece | null = null;
	private _possibleMoves: IMove[] = [];

	private readonly _gameState: IGameState;
	private readonly _painter: IPainter;

	protected constructor() {
		const rows = this.fen.split("/");

		for (let i = 0; i < rows.length; i++) {
			const row = rows[i];
			const len = row.length === 1 ? 8 : row.length;

			for (let colIndex = 0; colIndex < len; colIndex++) {
				const char = row[colIndex];
				const piece = createPiece(
					FEN_TO_PIECE_VARIANT_MAP[char?.toLowerCase()],
					char === char?.toUpperCase() ? PIECE_COLOR.White : PIECE_COLOR.Black,
					{ y: i, x: colIndex },
				);

				this.chessboard.set(piece.position, piece);
			}
		}

		this.currentPlayer = new Player(this, PIECE_COLOR.White);
		this.waitingPlayer = new Player(this, PIECE_COLOR.Black);
		this._gameState = new GameState(this);
		this._painter = new Painter(this);

		this._painter.paint();
	}

	static newGame(): IBoard {
		return new Board();
	}

	getMovesFor(position: IPosition) {
		const piece = this.getPieceAt(position);
		return piece.getPossibleMoves(this);
	}

	onTileClick(position: IPosition) {
		const piece = this.chessboard.at(position);
		if (this._selectedPiece === piece) {
			return;
		}

		if (piece?.color === this.currentPlayer.color) {
			this._selectedPiece = piece;
			this._painter.select(position);
			this._possibleMoves = this.getMovesFor(position);
			this._painter.highlightMoves(this._possibleMoves);

			return;
		}

		const move = this._possibleMoves.find(
			(move) =>
				move.target.position.x === position.x &&
				move.target.position.y === position.y,
		);

		if (move) {
			move.movePiece();
			this._gameState.endTurn();
			this._painter.paint();
			this._painter.displayTurn(this.currentPlayer.color);
			this._selectedPiece = null;
			this._possibleMoves = [];
		}
	}

	getPieceAt(position: IPosition): IPiece {
		const piece = this.chessboard.at(position);
		if (!piece) {
			throw new Error("No piece at the given position");
		}
		return piece;
	}
}
