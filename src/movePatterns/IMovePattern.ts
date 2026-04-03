import type { IBoard } from "../core/Board";
import type { IMove } from "../moves/IMove";
import type { IPiece } from "../pieces/base/IPiece";

export interface IMovePattern {
	getMoves(board: IBoard, piece: IPiece): IMove[];
}
