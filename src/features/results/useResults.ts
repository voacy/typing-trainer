import { useEffect, useState } from "react";
import type { LetterStatus, TypingSettings } from "../../shared/types";

const useResults = (
	letterStatuses: LetterStatus[][],
	extraChars: string[][],
	settings: TypingSettings,
	isFinished: boolean,
	elapsed: number,
) => {
	const [wpm, setWpm] = useState(0);
	const flatStatuses = letterStatuses.flat();
	const correct = flatStatuses.filter((status) => status === "correct").length;
	const incorrect = flatStatuses.filter((status) => status === "incorrect").length;
	const extra = extraChars.flat().length;

	const currentWpm =
		settings.mode === "time" ? correct / 5 / (settings.count / 60) : correct / 5 / (elapsed / 60);

	const total = correct + incorrect + extra;
	const accuracy = total === 0 ? 0 : (correct / total) * 100;

	useEffect(() => {
		if (isFinished) {
			setWpm(currentWpm);
		}
	}, [isFinished]);

	return { wpm, accuracy, correct, incorrect, extra };
};

export default useResults;
