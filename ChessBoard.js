import { files, pieces } from "./gameConstants.js";

// todo: implement zobrist hashing to prevent evaluating the same position multiple times

export default class ChessBoard {
	pos;
	turnColor;
	value;
	isTerminal = false;
	variant;

	constructor ({pos, turnColor, value, variant}) {
		this.pos = [...pos];
		this.turnColor = turnColor;
		this.value = value;
		this.variant = variant.map( move => [...move] );
	}

	copy () {
		return new this.constructor(this);
	}

	prettify () {
		return {
			...this,

			pos: this.pos
				.filter( (_, f) => !(f & 0b10001000) )   // 0x88 method: filter out what's not part of the board
				.join(" ")
				.replace( /(?=(.{16}){1,7}$)/g, "\n" ),  // insert linebreak every 16 characters

			variant: this.variant.map( move => this._getNotation(move) ),
		};
	}

	makeMove (move) {
		// todo: the following should also be terminal nodes; 3x repeated position; player with 0 move options; 50 turns without capture

		const [f, t] = move;
		const p = this.pos[f];
		const q = this.pos[t];
		const target = pieces[q];

		if (target) this.value -= target.value;

		this.variant.push([f, t, p, q]);
		this.turnColor = -this.turnColor;
		this.pos[t] = this.pos[f];
		this.pos[f] = ".";

		if (!Number.isFinite(this.value)) this.isTerminal = true;
	}

	undoMove () {}

	*[Symbol.iterator] () {
		const moves = [...this._generateMoves()].sort( (a, b) => b.value - a.value );

		for (const move of moves) {
			// todo: implement undoMove to avoid copying the board. Also call undoMove in αβ-cutoffs, since those will skip the undo call here
			//   this.makeMove(move);
			//   yield this;
			//   this.undoMove();

			const board = this.copy();
			board.makeMove(move);
			yield board;
		}
	}

	*_generateMoves () {
		for (let f = 127; f >= 0; f--) {
			const p = this.pos[f];
			const piece = pieces[p];

			if (!piece || piece.color !== this.turnColor) {
				continue;  // only move own pieces
			}

			yield* this._generateMovesForPiece(f, p, piece);
		}
	}

	*_generateMovesForPiece (f, p, piece) {
		// todo: castling and pawn movement is missing

		for (const m of piece.moves) {
			for (let t = f + m; !(t & 0b10001000); t += m) {  // 0x88 method: detect when line leaves the board
				const q = this.pos[t];
				const target = pieces[q];

				if (target && target.color === this.turnColor) {
					break;  // line is blocked, don't capture own pieces
				}

				const move = [f, t, p, q];
				move.value = target ? -this.turnColor * target.value : 0;
				yield move;

				if (target || piece.movement !== "line") {
					break;  // line is blocked, or piece can't move further
				}
			}
		}
	}

	_getNotation (move) {
		const [f, t, p, q] = move;

		const x1 = files[f & 0b00000111];
		const x2 = files[t & 0b00000111];
		const y1 = 8 - (f >> 4 & 0b00000111);
		const y2 = 8 - (t >> 4 & 0b00000111);

		return `${p} ${x1}${y1}${
			q !== "." ? "x" : " "
		}${x2}${y2} ${q} (${
			f.toString().padStart(3)
		} → ${
			t.toString().padStart(3)
		})`;
	}

}