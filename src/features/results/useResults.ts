import { useEffect, useState } from "react";
import type { LetterStatus, TypingSettings } from "../../shared/types";

const useResults = (
	letterStatuses: LetterStatus[][],
	extraChars: string[][],
	settings: TypingSettings,
	isFinished: boolean,
	elapsed: number,
) => {
	const [finalWpm, setFinalWpm] = useState(0);
	const flatStatuses = letterStatuses.flat();
	const correct = flatStatuses.filter((status) => status === "correct").length;
	const incorrect = flatStatuses.filter((status) => status === "incorrect").length;
	const extra = extraChars.flat().length;

	const wpm =
		settings.mode === "time" ? correct / 5 / (settings.count / 60) : correct / 5 / (elapsed / 60);

	const acc = (correct / (correct + incorrect + extra)) * 100;

	useEffect(() => {
		if (isFinished) {
			setFinalWpm(wpm);
		}
	}, [isFinished]);

	return { finalWpm, acc };
};

export default useResults;
