export const startingPosition = `
r n b q k b n r . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
R N B Q K B N R . . . . . . . .
`.trim().split(/\s*/g);

export const files = "abcdefgh";

export const pieces = {
	p: {
		name:  "Pawn",
		color: -1,
		value: -1,
		moves: [[0, 1]],  // [[1, 1], [0, 1], [-1, 1]],
		movement: "single",  // "single (no capture), double (no capture), diag (capture), en passant (capture enemy after double)",
	},
	P: {
		name:  "Pawn",
		color: 1,
		value: 1,
		moves: [[0, -1]],  // [[-1, -1], [0, -1], [1, -1]],
		movement: "single",  // "no capture: single, double, conversion. capture: diag, en passant",
	},
	b: {
		name:  "Bishop",
		color: -1,
		value: -3,
		moves: [[1, 1], [-1, 1], [-1, -1], [1, -1]],
		movement: "line",
	},
	B: {
		name:  "Bishop",
		color: 1,
		value: 3,
		moves: [[1, 1], [-1, 1], [-1, -1], [1, -1]],
		movement: "line",
	},
	n: {
		name:  "Knight",
		color: -1,
		value: -3,
		moves: [[2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2], [2, -1]],
		movement: "single",
	},
	N: {
		name:  "Knight",
		color: 1,
		value: 3,
		moves: [[2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2], [2, -1]],
		movement: "single",
	},
	r: {
		name:  "Rook",
		color: -1,
		value: -5,
		moves: [[1, 0], [0, 1], [-1, 0], [0, -1]],
		movement: "line",
	},
	R: {
		name:  "Rook",
		color: 1,
		value: 5,
		moves: [[1, 0], [0, 1], [-1, 0], [0, -1]],
		movement: "line",
	},
	q: {
		name:  "Queen",
		color: -1,
		value: -9,
		moves: [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]],
		movement: "line",
	},
	Q: {
		name:  "Queen",
		color: 1,
		value: 9,
		moves: [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]],
		movement: "line",
	},
	k: {
		name:  "King",
		color: -1,
		value: -Infinity,
		moves: [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]],
		movement: "single",
	},
	K: {
		name:  "King",
		color: 1,
		value: Infinity,
		moves: [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]],
		movement: "single",
	},
};

/*
	Convert move directions to 1 dimension, for 0x88 method
	https://en.wikipedia.org/wiki/Board_representation_(chess)#0x88_method
*/
for (const p in pieces) {
	pieces[p].moves = pieces[p].moves.map( ([dx, dy]) => dx + 16 * dy );
}

return { startingPosition, files, pieces };