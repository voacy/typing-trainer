export const generateWords = (wordList: string[], count: number): string[] => {
	return Array.from({ length: count }, () => wordList[Math.floor(Math.random() * wordList.length)]);
};

const injectNumbers = (words: string[], targetCount: number): string[] => {
	const result: string[] = [];
	for (const word of words) {
		if (result.length >= targetCount) break;
		result.push(word);
		if (result.length < targetCount && Math.random() < 0.2) {
			result.push(Math.floor(Math.random() * 1000).toString());
		}
	}
	return result;
};

export const generateWordsWithOptions = (
	wordList: string[],
	count: number,
	isPunctuation: boolean,
	isNumbers: boolean,
): string[] => {
	const symbols = ["!", "?", ",", ".", ":"];
	const baseCount = isNumbers ? Math.ceil(count * 1.3) : count;
	let result: string[] = [];

	if (isPunctuation) {
		let capitalizeNext = true;
		for (let i = 0; i < baseCount; i++) {
			let word = wordList[Math.floor(Math.random() * wordList.length)];
			if (capitalizeNext) {
				word = word[0].toUpperCase() + word.slice(1);
				capitalizeNext = false;
			}
			const isLast = i === baseCount - 1;
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
	} else {
		result = generateWords(wordList, baseCount);
	}

	if (isNumbers) {
		result = injectNumbers(result, count);
	}

	return result;
};

export const generateQuote = (quotes: string[]): string[] => {
	const quote = quotes[Math.floor(Math.random() * quotes.length)];
	return quote.split(" ");
};
