import type { LetterStatus } from "../types";

export const createLetterStatuses = (words: string[]): LetterStatus[][] => {
	return words.map((word) => word.split("").map((): LetterStatus => "idle"));
};

export const getLetterClass = (
	letterStatuses: LetterStatus[][],
	arrIndex: number,
	charIndex: number,
) => {
	if (!letterStatuses[arrIndex]) return "idle";
	return letterStatuses[arrIndex][charIndex] ?? "idle";
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
