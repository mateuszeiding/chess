import type { IPiece } from "../pieces/base/IPiece";
import { PIECE_COLOR } from "../pieces/enums";
import { ChessBoard, type IChessBoard } from "../structures/ChessBoard";
import type { IPosition } from "../structures/Position";
import { Player, type IPlayer } from "./Player";

export interface IBoardPlayers {
	currentPlayer: IPlayer;
	waitingPlayer: IPlayer;
}

export interface IBoard extends IBoardPlayers {
	chessboard: IChessBoard;
	move(from: IPosition, to: IPosition): void;
	getMovesFor(position: IPosition): IPosition[];
}

export class Board implements IBoard {
	fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
	currentPlayer: IPlayer = new Player(PIECE_COLOR.White);
	waitingPlayer: IPlayer = new Player(PIECE_COLOR.Black);
	chessboard: IChessBoard = new ChessBoard();

	constructor() {
		this._initializeBoard();
	}

	getMovesFor(position: IPosition) {
		const piece = this._getPieceAt(position);
		return piece.getPossibleMoves(this.chessboard);
	}

	move(from: IPosition, to: IPosition) {
		const piece = this._getPieceAt(from);
		this.chessboard.set(to, piece);
		this.chessboard.set(from, null);

		piece.position.set(to);
		piece.onMove();
	}

	private _getPieceAt(position: IPosition): IPiece {
		const piece = this.chessboard.at(position);
		if (!piece) {
			throw new Error("No piece at the given position");
		}
		return piece;
	}

	private _initializeBoard() {
		for (const player of [this.currentPlayer, this.waitingPlayer]) {
			console.log(player.color, player.pieces);
			player.pieces.forEach((piece) => {
				this.chessboard.set(piece.position, piece);
			});
		}
	}
}
