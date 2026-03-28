import { PIECE_COLOR, type PieceColor } from "../pieces/enums";
import { MAX_BOARD_SIZE } from "../utils/constants";

export interface IPosition {
	x: number;
	y: number;
}

export interface IPositionInstance extends IPosition {
	getOffset(pos: IPosition, adjustFor?: PieceColor): IPositionInstance;
	set(pos: IPosition): void;
	isValid(pos: IPosition): boolean;
}

export class Position implements IPositionInstance {
	public x: number;
	public y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	getOffset(
		pos: IPosition,
		adjustFor: PieceColor = PIECE_COLOR.Black,
	): Position {
		const directionAdjust = adjustFor === PIECE_COLOR.White ? -1 : 1;
		return new Position(this.x + pos.x, this.y + pos.y * directionAdjust);
	}

	set(pos: IPosition): void {
		this.x = pos.x;
		this.y = pos.y;
	}

	isValid(pos: IPosition): boolean {
		return (
			pos.x >= 0 &&
			pos.x <= MAX_BOARD_SIZE &&
			pos.y >= 0 &&
			pos.y <= MAX_BOARD_SIZE
		);
	}
}
