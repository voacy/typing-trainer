export const generateWords = (wordList: string[], count: number): string[] => {
	return Array.from({ length: count }, () => wordList[Math.floor(Math.random() * wordList.length)]);
};

export const generateWordsWithPunctuation = (wordList: string[], count: number): string[] => {
	const symbols = ["!", "?", ",", ".", ":"];
	const result: string[] = [];
	let capitalizeNext = true;

	for (let i = 0; i < count; i++) {
		let word = wordList[Math.floor(Math.random() * wordList.length)];

		if (capitalizeNext) {
			word = word[0].toUpperCase() + word.slice(1);
			capitalizeNext = false;
		}

		const isLast = i === count - 1;
		const addPunctuation = (i + 1) % (Math.floor(Math.random() * 2) + 3) === 0;

		if (isLast) {
			word = word + ".";
		} else if (addPunctuation) {
			const symbol = symbols[Math.floor(Math.random() * symbols.length)];
			word = word + symbol;
			if (symbol === "." || symbol === "!" || symbol === "?") {
				capitalizeNext = true;
			}
		}

		result.push(word);
	}

	return result;
};

export const generateQuote = (quotes: string[]): string[] => {
	const quote = quotes[Math.floor(Math.random() * quotes.length)];
	return quote.split(" ");
};
