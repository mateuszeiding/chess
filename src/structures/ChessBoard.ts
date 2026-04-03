import type { IPiece } from "../pieces/base/IPiece";
import { Position, type IPosition } from "./Position";

export interface IChessBoard {
	at(position: IPosition): IPiece;
	set(position: IPosition, piece: IPiece): void;
	get Entries(): IterableIterator<[number, IPiece[]]>;
}

export class ChessBoard implements IChessBoard {
	private readonly _board: IPiece[][] = Array.from({ length: 8 }, () =>
		new Array(8).fill(null),
	);

	get Entries() {
		return this._board.entries();
	}

	at(position: IPosition): IPiece {
		if (!Position.isValid(position)) {
			throw new Error("Invalid position");
		}

		return this._board[position.y][position.x];
	}

	set(position: IPosition, piece: IPiece): void {
		this._board[position.y][position.x] = piece;
	}
}
