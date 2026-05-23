import { describe, test, expect } from "vitest";
import calculateResults from "./calculateResults";

describe("calculateResults", () => {
	test("should return zeros when elapsed is 0", () => {
		const result = calculateResults(
			[],
			[],
			{ mode: "words", count: 10, isPunctuation: false, isNumbers: false, language: "english" },
			0,
		);
		expect(result.wpm).toBe(0);
		expect(result.accuracy).toBe(0);
	});

	test("should calculate wpm correctly in words mode", () => {
		const letterStatuses = [["correct", "correct", "correct", "correct", "correct"]];
		const result = calculateResults(
			letterStatuses as any,
			[[]],
			{ mode: "words", count: 10, isPunctuation: false, isNumbers: false, language: "english" },
			60,
		);
		expect(result.wpm).toBe(1);
	});

	test("should calculate accuracy correctly", () => {
		const letterStatuses = [["correct", "correct", "incorrect"]];
		const result = calculateResults(
			letterStatuses as any,
			[[]],
			{ mode: "words", count: 10, isPunctuation: false, isNumbers: false, language: "english" },
			30,
		);
		expect(result.accuracy).toBeCloseTo(66.67, 1);
	});
});
