/*
	NegaMax with alpha-beta pruning

	https://en.wikipedia.org/wiki/Negamax#Negamax_with_alpha_beta_pruning
	http://frayn.net/beowulf/theory.html
*/

export default function negaMax (node, depth, _alphaCutoff=-Infinity, _betaCutoff=Infinity) {

	if (!depth || node.isTerminal) return { best: node.turnColor * node.value, variant: [node.copy()] };

	let best = -Infinity;
	let variant = null;

	for (const childNode of node) {
		const search = negaMax(childNode, depth - 1, -_betaCutoff, -_alphaCutoff);
		const rating = -search.best;

		if (rating >= best) {
			best = rating;
			variant = [node.copy(), ...search.variant];
		}

		_alphaCutoff = Math.max(_alphaCutoff, rating);

		if (_alphaCutoff >= _betaCutoff) {
			break;
		}
	}

	return {best, variant};
}