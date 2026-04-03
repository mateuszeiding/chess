import type { IMove } from "../moves/IMove";
import type { ICondition } from "./ICondition";

export class EmptyCondition implements ICondition {
	check(_: IMove): boolean {
		return true;
	}
}
