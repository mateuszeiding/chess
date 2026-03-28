import type { IPiece } from "../pieces/base/IPiece";
import type { ICondition } from "./ICondition";

export class EmptyPlaceCondition implements ICondition {
	check(to: IPiece | null): boolean {
		return to === null;
	}
}
