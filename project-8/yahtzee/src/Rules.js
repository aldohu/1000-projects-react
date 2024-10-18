/** Rule for Yahtzee scoring. */
class Rule {
	constructor(params) {
		Object.assign(this, params);
	}

	sum(dice) {
		return dice.reduce((prev, curr) => prev + curr, 0);
	}

	freq(dice) {
		const freqs = new Map();
		for (let d of dice) {
			freqs.set(d, (freqs.get(d) || 0) + 1);
		}
		return Array.from(freqs.values());
	}

	count(dice, val) {
		return dice.filter((d) => d === val).length;
	}
}

/** Given a sought-for val, return sum of dice of that val. */
class TotalOneNumber extends Rule {
	evalRoll = (dice) => this.val * this.count(dice, this.val);
}

/** Given a required # of same dice, return sum of all dice. */
class SumDistro extends Rule {
	evalRoll = (dice) => {
		return this.freq(dice).some((c) => c >= this.count) ? this.sum(dice) : 0;
	};
}

/** Check if full house (3-of-kind and 2-of-kind) */
class FullHouse extends Rule {
	evalRoll = (dice) => {
		const freqs = this.freq(dice);
		return freqs.includes(3) && freqs.includes(2) ? this.score : 0;
	};
}

/** Check for small straights. */
class SmallStraight extends Rule {
	evalRoll = (dice) => {
		const d = new Set(dice);
		const smallStraights = [
			new Set([1, 2, 3, 4]),
			new Set([2, 3, 4, 5]),
			new Set([3, 4, 5, 6]),
		];
		return smallStraights.some((straight) =>
			[...straight].every((num) => d.has(num)),
		)
			? this.score
			: 0;
	};
}

/** Check for large straights. */
class LargeStraight extends Rule {
	evalRoll = (dice) => {
		const d = new Set(dice);
		return d.size === 5 && (!d.has(1) || !d.has(6)) ? this.score : 0;
	};
}

/** Check if all dice are the same. */
class Yahtzee extends Rule {
	evalRoll = (dice) => (this.freq(dice)[0] === 5 ? this.score : 0);
}

// Instances for scoring
const ones = new TotalOneNumber({ val: 1 });
const twos = new TotalOneNumber({ val: 2 });
const threes = new TotalOneNumber({ val: 3 });
const fours = new TotalOneNumber({ val: 4 });
const fives = new TotalOneNumber({ val: 5 });
const sixes = new TotalOneNumber({ val: 6 });

// Three/four of kind score as sum of all dice
const threeOfKind = new SumDistro({ count: 3 });
const fourOfKind = new SumDistro({ count: 4 });

// Full house scores as flat 25
const fullHouse = new FullHouse({ score: 25 });

// Small/large straights score as 30/40
const smallStraight = new SmallStraight({ score: 30 });
const largeStraight = new LargeStraight({ score: 40 });

// Yahtzee scores as 50
const yahtzee = new Yahtzee({ score: 50 });

// For chance, can view as some of all dice, requiring at least 0 of a kind
const chance = new SumDistro({ count: 0 });

export {
	ones,
	twos,
	threes,
	fours,
	fives,
	sixes,
	threeOfKind,
	fourOfKind,
	fullHouse,
	smallStraight,
	largeStraight,
	yahtzee,
	chance,
};
