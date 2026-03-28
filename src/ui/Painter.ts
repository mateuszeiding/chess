import type { IGameEventEmitter } from "../core/GameEventEmtter";
import type { IChessBoard } from "../structures/ChessBoard";
import type { IPosition } from "../structures/Position";

export interface IPainter {
	paint(): void;
}

export class Painter {
	private readonly _app: HTMLDivElement;
	private readonly _eventEmitter: IGameEventEmitter;
	private _selectedPosition: IPosition | null = null;
	private _highlightedPositions: IPosition[] = [];

	constructor(eventEmitter: IGameEventEmitter) {
		this._eventEmitter = eventEmitter;
		const app = document.querySelector<HTMLDivElement>("#app");

		if (!app) {
			throw new Error("#app not found");
		}

		this._app = app;
	}

	paint(matrix: IChessBoard) {
		this._app.innerHTML = "";
		for (const [y, row] of matrix.Entries) {
			for (const [x, cell] of row.entries()) {
				const el = document.createElement("div");
				el.dataset.position = `${y},${x}`;

				el.onclick = () => {
					this._eventEmitter.emitTileClick({
						x,
						y,
					});
				};

				if (cell) {
					el.textContent = cell.FENChar;
				}

				if ((x + y) % 2 !== 0) {
					el.classList.add("dark");
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

	highlightMoves(positions: IPosition[]) {
		for (const pos of this._highlightedPositions) {
			const tile = this._getOnPosition(pos);
			tile.classList.remove("highlight");
		}

		this._highlightedPositions = positions;
		for (const pos of positions) {
			const tile = this._getOnPosition(pos);
			tile.classList.add("highlight");
		}
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
