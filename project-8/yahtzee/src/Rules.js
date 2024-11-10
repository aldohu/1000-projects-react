// rules.js

const sum = (dice) => {
	const total = dice.reduce((prev, curr) => prev + curr, 0);
	console.log('Sum of dice:', total); // Log sum here
	return total;
};

const freq = (dice) => {
	// Create an object to store frequencies
	const freqs = {};

	// Count frequencies
	dice.forEach((die) => {
		freqs[die] = (freqs[die] || 0) + 1;
	});

	// Return array of frequency counts
	return Object.values(freqs);
};

const count = (dice, val) => dice.filter((d) => d === val).length;

/** Given a sought-for val, return sum of dice of that val. */
const TotalOneNumber = (val) => (dice) => {
	const result = val * count(dice, val);
	console.log(`Total for ${val}s:`, result); // Log result of specific number
	return result;
};

/** Given a required # of same dice, return sum of all dice. */ const SumDistro =
	(countRequired) => (dice) => {
		// Create a frequency map of dice values
		const freqMap = new Map();
		dice.forEach((d) => {
			freqMap.set(d, (freqMap.get(d) || 0) + 1);
		});

		// Find the value that appears the required number of times (if any)
		let matchingValue = null;
		for (const [value, count] of freqMap) {
			if (count >= countRequired) {
				matchingValue = value;
				break;
			}
		}

		// If we found a matching value, sum only those dice
		if (matchingValue !== null) {
			const sumOfMatching = matchingValue * countRequired;
			console.log(`Found ${countRequired} of kind: ${matchingValue}`);
			console.log(`Sum: ${sumOfMatching}`);
			return sumOfMatching;
		}

		console.log(`No ${countRequired} of kind found`);
		return 0;
	};

/** Check if full house (3-of-kind and 2-of-kind) */
const FullHouse = (score) => (dice) => {
	const freqs = freq(dice);
	console.log('Full House check, dice frequencies:', freqs); // Log frequencies
	return freqs.includes(3) && freqs.includes(2) ? score : 0;
};

/** Check for small straights. */
const SmallStraight = (score) => (dice) => {
	const d = new Set(dice);
	const smallStraights = [
		new Set([1, 2, 3, 4]),
		new Set([2, 3, 4, 5]),
		new Set([3, 4, 5, 6]),
	];
	const result = smallStraights.some((straight) =>
		[...straight].every((num) => d.has(num)),
	)
		? score
		: 0;
	console.log('Small Straight result:', result); // Log result of small straight
	return result;
};

/** Check for large straights. */
const LargeStraight = (score) => (dice) => {
	const d = new Set(dice);
	const result = d.size === 5 && (!d.has(1) || !d.has(6)) ? score : 0;
	console.log('Large Straight result:', result); // Log result of large straight
	return result;
};

/** Check if all dice are the same. */
const Yahtzee = (score) => (dice) => {
	const result = freq(dice)[0] === 5 ? score : 0;
	console.log('Yahtzee result:', result); // Log result of Yahtzee
	return result;
};

// Instances for scoring
const ones = TotalOneNumber(1);
const twos = TotalOneNumber(2);
const threes = TotalOneNumber(3);
const fours = TotalOneNumber(4);
const fives = TotalOneNumber(5);
const sixes = TotalOneNumber(6);

// Three/four of kind score as sum of all dice
const threeOfKind = SumDistro(3);
const fourOfKind = SumDistro(4);

// Full house scores as flat 25
const fullHouse = FullHouse(25);

// Small/large straights score as 30/40
const smallStraight = SmallStraight(30);
const largeStraight = LargeStraight(40);

// Yahtzee scores as 50
const yahtzee = Yahtzee(50);

// For chance, can view as sum of all dice, requiring at least 0 of a kind
const chance = (dice) => {
	return sum(dice); // Just sum all the dice for Chance
};

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
