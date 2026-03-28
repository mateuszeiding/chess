import type { IPiece } from "../pieces/base/IPiece";
import type { ICondition } from "./ICondition";

export class ComboCondition implements ICondition {
	private readonly conditions: ICondition[];

	constructor(conditions: ICondition[]) {
		this.conditions = conditions;
	}

	check(to: IPiece | null): boolean {
		return this.conditions.every((condition) => condition.check(to));
	}
}
