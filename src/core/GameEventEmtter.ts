type GameListeners = {
	move: ((from: IPosition, to: IPosition) => void)[];
	tileClick: ((position: IPosition) => void)[];
};

export interface IGameEventEmitter {
	onMove(listener: (from: IPosition, to: IPosition) => void): void;
	onTileClick(listener: (position: IPosition) => void): void;
	emitMove(from: IPosition, to: IPosition): void;
	emitTileClick(position: IPosition): void;
}

export class GameEventEmitter implements IGameEventEmitter {
	private readonly listeners: GameListeners = {
		move: [],
		tileClick: [],
	};

	onMove(listener: (from: IPosition, to: IPosition) => void): void {
		this.listeners.move.push(listener);
	}

	onTileClick(listener: (position: IPosition) => void): void {
		this.listeners.tileClick.push(listener);
	}

	emitMove(from: IPosition, to: IPosition): void {
		this.listeners.move.forEach((listener) => {
			listener(from, to);
		});
	}

	emitTileClick(position: IPosition): void {
		this.listeners.tileClick.forEach((listener) => {
			listener(position);
		});
	}
}
