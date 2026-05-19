import type { LetterStatus, TypingSettings } from "../../shared/types";

const useResults = (
	letterStatuses: LetterStatus[][],
	extraChars: string[][],
	settings: TypingSettings,
	elapsed: number,
) => {
	if (!elapsed) {
		return { wpm: 0, accuracy: 0, correct: 0, incorrect: 0, extra: 0 };
	}

	const flatStatuses = letterStatuses.flat();
	const correct = flatStatuses.filter((status) => status === "correct").length;
	const incorrect = flatStatuses.filter((status) => status === "incorrect").length;
	const extra = extraChars.flat().length;

	const wpm =
		settings.mode === "time" ? correct / 5 / (settings.count / 60) : correct / 5 / (elapsed / 60);

	const total = correct + incorrect + extra;
	const accuracy = total === 0 ? 0 : (correct / total) * 100;

	return { wpm, accuracy, correct, incorrect, extra };
};

export default useResults;
