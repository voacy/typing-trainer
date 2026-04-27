import type { LetterStatus } from "../types";

export const createLetterStatuses = (words: string[]): LetterStatus[][] => {
	return words.map((word) => word.split("").map((): LetterStatus => "idle"));
};

export const getLetterClass = (
	letterStatuses: LetterStatus[][],
	arrIndex: number,
	charIndex: number,
) => {
	return letterStatuses[arrIndex][charIndex];
};

export const getActiveClass = (
	arrIndex: number,
	charIndex: number,
	currentWordIndex: number,
	currentLetterIndex: number,
) => {
	if (arrIndex === currentWordIndex && charIndex === currentLetterIndex) {
		return "active";
	}
	return "";
};
