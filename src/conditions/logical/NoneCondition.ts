import type { IMove } from "../../moves/IMove";
import type { ICondition } from "./../ICondition";

export class NoneCondition implements ICondition {
	private readonly conditions: ICondition[];

	constructor(conditions: ICondition[]) {
		this.conditions = conditions;
	}

	check(val: IMove): boolean {
		return this.conditions.every((condition) => !condition.check(val));
	}
}
