import type { IPiece } from "../pieces/base/IPiece";
import { Position, type IPosition } from "./Position";

export interface IChessBoard {
	at(position: IPosition): IPiece | null;
	set(position: IPosition, piece: IPiece | null): void;
	get Entries(): IterableIterator<[number, (IPiece | null)[]]>;
}

export class ChessBoard {
	private readonly _board: (IPiece | null)[][] = Array.from({ length: 8 }, () =>
		new Array(8).fill(null),
	);

	get Entries() {
		return this._board.entries();
	}

	at(position: IPosition): IPiece | null {
		if (!Position.isValid(position)) {
			return null;
		}

		return this._board[position.y][position.x];
	}

	set(position: IPosition, piece: IPiece | null): void {
		this._board[position.y][position.x] = piece;
	}
}
