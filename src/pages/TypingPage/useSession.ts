import { useEffect, useState } from "react";
import useTimer from "../../features/timer/useTimer";
import useTyping from "../../features/typing/useTyping";
import useResults from "../../features/results/useResults";
import { generateWords, generateWordsWithPunctuation, generateQuote } from "../../shared/lib";
import wordsList from "../../shared/lib/wordsList";
import quotes from "../../shared/lib/quotes";
import type { TypingSettings } from "../../shared/types";

const getNewWords = (newSettings: TypingSettings): string[] => {
	const count = newSettings.mode === "time" ? 200 : newSettings.count;

	if (newSettings.mode === "quote") return generateQuote(quotes);
	if (newSettings.isPunctuation) return generateWordsWithPunctuation(wordsList, count);
	return generateWords(wordsList, count);
};

const useSession = () => {
	const [chartData, setChartData] = useState<{ wpm: number; accuracy: number; errors: number }[]>(
		[],
	);

	const [settings, setSettings] = useState<TypingSettings>({
		mode: "words",
		isPunctuation: false,
		count: 10,
		language: "english",
	});

	const [isFinished, setIsFinished] = useState(false);

	const [words, setWords] = useState(() => generateWords(wordsList, settings.count));

	const { timer, timerStatus, startTimer, resetTimer, elapsed } = useTimer(
		settings.count,
		isFinished,
		settings.mode,
	);

	const { currentWordIndex, currentLetterIndex, letterStatuses, extraChars, resetTyping } =
		useTyping(words, timer, timerStatus, startTimer);

	const { wpm, accuracy } = useResults(letterStatuses, extraChars, settings, isFinished, elapsed);

	useEffect(() => {
		if (timerStatus) {
			const flatStatuses = letterStatuses.flat();
			const correct = flatStatuses.filter((status) => status === "correct").length;
			const incorrect = flatStatuses.filter((s) => s === "incorrect").length;
			const extra = extraChars.flat().length;
			const total = correct + incorrect + extra;
			const currentWpm = elapsed > 0 ? correct / 5 / (elapsed / 60) : 0;
			const currentAccuracy = total === 0 ? 0 : Math.round((correct / total) * 100);
			setChartData((prev) => [
				...prev,
				{ wpm: Math.round(currentWpm), accuracy: currentAccuracy, errors: incorrect + extra },
			]);
		}
	}, [elapsed, isFinished, timer]);

	useEffect(() => {
		if ((settings.mode === "time" && timer === 0) || currentWordIndex >= words.length) {
			setIsFinished(true);
		}
	}, [timer, currentWordIndex]);

	const handleReset = (newSettings = settings) => {
		const newWords = getNewWords(newSettings);
		setWords(newWords);
		resetTimer(newSettings.count);
		resetTyping(newWords);
		setIsFinished(false);
		setChartData([]);
	};

	return {
		settings,
		setSettings,
		isFinished,
		words,
		timer,
		timerStatus,
		currentWordIndex,
		currentLetterIndex,
		letterStatuses,
		extraChars,
		wpm,
		accuracy,
		handleReset,
		chartData,
		elapsed,
	};
};

export default useSession;
