import { MAX_BOARD_SIZE } from "./constants";

export const isValidPosition = (pos: IPosition): boolean => {
	return (
		pos.x >= 0 &&
		pos.x <= MAX_BOARD_SIZE &&
		pos.y >= 0 &&
		pos.y <= MAX_BOARD_SIZE
	);
};
