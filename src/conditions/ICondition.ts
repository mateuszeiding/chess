import type { IMove } from "../moves/IMove";

export interface ICondition {
	check(move: IMove): boolean;
}
