import { useEffect, useState } from "react";
import useTimer from "../../features/timer/useTimer";
import useTyping from "../../features/typing/useTyping";
import useResults from "../../features/results/useResults";
import { generateWordsWithOptions, generateQuote } from "../../shared/lib";
import { getLanguageWords } from "../../shared/lib/languages";
import quotes from "../../shared/lib/quotes";
import type { LetterStatus, TypingSettings } from "../../shared/types";

const getNewWords = (newSettings: TypingSettings): string[] => {
	const count = newSettings.mode === "time" ? 200 : newSettings.count;
	if (newSettings.mode === "quote") return generateQuote(quotes);
	const wordList = getLanguageWords(newSettings.language);
	return generateWordsWithOptions(wordList, count, newSettings.isPunctuation, newSettings.isNumbers);
};

const useSession = () => {
	const [chartData, setChartData] = useState<{ wpm: number; accuracy: number; errors: number }[]>(
		[],
	);

	const savedSettings = JSON.parse(localStorage.getItem("settings") || "null") as TypingSettings;

	const [settings, setSettings] = useState<TypingSettings>(
		savedSettings || {
			mode: "words",
			isPunctuation: false,
			isNumbers: false,
			count: 10,
			language: "english",
		},
	);

	useEffect(() => {
		localStorage.setItem("settings", JSON.stringify(settings));
	}, [settings]);

	const [isFinished, setIsFinished] = useState(false);

	const [snapshot, setSnapshot] = useState<{ words: string[]; letterStatuses: LetterStatus[][]; extraChars: string[][] } | null>(null);

	const [words, setWords] = useState(() => getNewWords(settings));

	const { timer, timerStatus, startTimer, resetTimer, elapsed } = useTimer(
		settings.count,
		isFinished,
		settings.mode,
	);

	const { currentWordIndex, currentLetterIndex, letterStatuses, extraChars, resetTyping } =
		useTyping(words, timer, timerStatus, startTimer);

	const { wpm, accuracy, correct, incorrect, extra } = useResults(
		letterStatuses,
		extraChars,
		settings,
		isFinished,
		elapsed,
	);

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

	useEffect(() => {
		if (isFinished) {
			setSnapshot({ words, letterStatuses, extraChars });
		}
	}, [isFinished]);

	const handleReset = (newSettings = settings) => {
		const newWords = getNewWords(newSettings);
		setWords(newWords);
		resetTimer(newSettings.count);
		resetTyping(newWords);
		setIsFinished(false);
		setChartData([]);
		setSnapshot(null);
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
		correct,
		incorrect,
		extra,
		snapshot,
	};
};

export default useSession;
