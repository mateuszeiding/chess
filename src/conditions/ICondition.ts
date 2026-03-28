import type { IPiece } from "../pieces/base/IPiece";

export interface ICondition {
	check(to: IPiece | null): boolean;
}
