import type { IMove } from "../moves/IMove";
import type { ICondition } from "./ICondition";

export class NotCondition implements ICondition {
	private readonly condition: ICondition;

	constructor(condition: ICondition) {
		this.condition = condition;
	}

	check(val: IMove): boolean {
		return !this.condition.check(val);
	}
}
