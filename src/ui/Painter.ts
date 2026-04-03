import type { IBoard } from "../core/Board";
import type { IMove } from "../moves/IMove";
import type { IPosition } from "../structures/Position";

export interface IPainter {
	paint(): void;
	displayTurn(playerColor: string): void;
	select(position: IPosition): void;
	highlightMoves(positions: IMove[]): void;
}

export class Painter implements IPainter {
	private readonly _app: HTMLDivElement;
	private _selectedPosition: IPosition | null = null;
	private _highlightedMoves: IMove[] = [];
	private readonly _board: IBoard;

	constructor(board: IBoard) {
		this._board = board;
		const app = document.querySelector<HTMLDivElement>("#app");

		if (!app) {
			throw new Error("#app not found");
		}

		this._app = app;

		const turnIndicator = document.createElement("div");
		turnIndicator.id = "turn-indicator";
		turnIndicator.style.marginTop = "2rem";
		turnIndicator.style.fontSize = "2rem";
		document.body.appendChild(turnIndicator);
	}

	paint() {
		this._app.innerHTML = "";
		for (const [y, row] of this._board.chessboard.Entries) {
			for (const [x, cell] of row.entries()) {
				const el = document.createElement("div");
				el.dataset.position = `${y},${x}`;
				el.textContent = cell.FENChar;

				el.onclick = () => {
					this._board.onTileClick({
						x,
						y,
					});
				};

				if ((x + y) % 2 !== 0) {
					el.classList.add("dark");
				}

				this._app.appendChild(el);
			}
		}
	}

	displayTurn(playerColor: string) {
		const turnEl = document.getElementById("turn-indicator");
		if (turnEl) {
			turnEl.textContent = `Current turn: ${playerColor}`;
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

	highlightMoves(positions: IMove[]) {
		for (const move of this._highlightedMoves) {
			const tile = this._getOnPosition(move.target.position);
			tile.classList.remove("highlight");
		}

		this._highlightedMoves = positions;
		for (const move of positions) {
			const tile = this._getOnPosition(move.target.position);
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
