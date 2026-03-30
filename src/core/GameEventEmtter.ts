import type { IPosition } from "../structures/Position";

type GameListeners = {
	tileClick: ((position: IPosition) => void)[];
};

export interface IGameEventEmitter {
	onTileClick(listener: (position: IPosition) => void): void;
	emitTileClick(position: IPosition): void;
}

export class GameEventEmitter implements IGameEventEmitter {
	private readonly listeners: GameListeners = {
		tileClick: [],
	};

	onTileClick(listener: (position: IPosition) => void): void {
		this.listeners.tileClick.push(listener);
	}

	emitTileClick(position: IPosition): void {
		this.listeners.tileClick.forEach((listener) => {
			listener(position);
		});
	}
}
