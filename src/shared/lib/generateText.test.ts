import { describe, test, expect } from "vitest";
import { generateWords, generateWordsWithOptions, generateQuote } from "./generateText";
import quotes from "./quotes";

const words = ["cat", "dog", "hat"];

describe("generateWords", () => {
	test("should return correct length", () => {
		const arr = generateWords(words, 10);
		expect(arr.length).toBe(10);
	});

	test("should only include words from words", () => {
		const arr = generateWords(words, 10);
		expect(arr.every((word) => words.includes(word))).toBe(true);
	});
});

describe("generateWordsWithOptions", () => {
	test("should return correct length", () => {
		const arr = generateWordsWithOptions(words, 10, true, true);
		expect(arr.length).toBe(10);
	});

	test("should add punctuation when isPunctuation is true", () => {
		const arr = generateWordsWithOptions(words, 10, true, false);
		expect(arr.some((word) => /[.!?,:]/.test(word))).toBe(true);
	});
});

describe("generateQuote", () => {
	test("should return non-empty array", () => {
		const quote = generateQuote(quotes, "russian");
		expect(quote.length).toBeGreaterThan(0);
	});
});
