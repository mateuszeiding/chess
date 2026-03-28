import type { ReadonlyBoardMatrix } from "../core/Board";
import type { IGameEventEmitter } from "../core/GameEventEmtter";

export interface IPainter {
	paint(): void;
}

export class Painter {
	private readonly _app: HTMLDivElement;
	private readonly _eventEmitter: IGameEventEmitter;
	private _selectedPosition: IPosition | null = null;

	constructor(eventEmitter: IGameEventEmitter) {
		this._eventEmitter = eventEmitter;
		const app = document.querySelector<HTMLDivElement>("#app");

		if (!app) {
			throw new Error("#app not found");
		}

		this._app = app;
	}

	paint(matrix: ReadonlyBoardMatrix) {
		this._app.innerHTML = "";
		for (const [y, row] of matrix.entries()) {
			for (const [x, cell] of row.entries()) {
				const el = document.createElement("div");
				el.dataset.position = `${y},${x}`;

				el.onclick = () => {
					this._eventEmitter.emitTileClick({
						y,
						x,
					});
				};

				if (cell) {
					el.textContent = cell.FENChar;
				}

				this._app.appendChild(el);
			}
		}
	}

	select(position: IPosition) {
		if (this._selectedPosition) {
			const prevTile = this._getOnPosition(this._selectedPosition);
			prevTile.classList.remove("selected");
		}

		const tile = this._getOnPosition(position);
		tile.classList.add("selected");
		this._selectedPosition = position;
	}

	private _getOnPosition(position: IPosition): HTMLDivElement {
		const el = this._app.querySelector<HTMLDivElement>(
			`div[data-position="${position.y},${position.x}"]`,
		);

		if (!el) {
			throw new Error(`Tile at position ${position.y},${position.x} not found`);
		}

		return el;
	}
}
