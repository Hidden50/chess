import negaMax from "./negaMax.js";
import { startingPosition } from "./gameConstants.js";
import ChessBoard from "./ChessBoard.js";

const board = new ChessBoard({
	pos:       startingPosition,
	turnColor: 1,                 // white to move
	value:     0,                 // no player is ahead on captures
	variant:   [],                // no move history
});

board.makeMove([115, 3]);
board.makeMove([4, 3]);

const result = negaMax(board, 0);
result.variant = result.variant.map( node => node.prettify() );

return result;