import { useCallback, useEffect, useRef, useState } from "react";
import useTimer from "../../features/timer/useTimer";
import useTyping from "../../features/typing/useTyping";
import calculateResults from "../../features/results/calculateResults";
import { generateWordsWithOptions, generateQuote } from "../../shared/lib";
import { getLanguageWords } from "../../shared/lib/languages";
import quotes from "../../shared/lib/quotes";
import type { LetterStatus, TypingSettings } from "../../shared/types";

const getNewWords = (newSettings: TypingSettings): string[] => {
	const count = newSettings.mode === "time" ? 200 : newSettings.count;
	if (newSettings.mode === "quote") return generateQuote(quotes, newSettings.language);
	const wordList = getLanguageWords(newSettings.language);
	return generateWordsWithOptions(
		wordList,
		count,
		newSettings.isPunctuation,
		newSettings.isNumbers,
	);
};

const DEFAULT_SETTINGS: TypingSettings = {
	mode: "words",
	isPunctuation: false,
	isNumbers: false,
	count: 10,
	language: "english",
};

const useSession = () => {
	const [chartData, setChartData] = useState<{ wpm: number; accuracy: number; errors: number }[]>(
		[],
	);

	const [settings, setSettings] = useState<TypingSettings>(() => {
		try {
			const saved = localStorage.getItem("settings");
			if (!saved) return DEFAULT_SETTINGS;
			return JSON.parse(saved) as TypingSettings;
		} catch {
			return DEFAULT_SETTINGS;
		}
	});

	useEffect(() => {
		localStorage.setItem("settings", JSON.stringify(settings));
	}, [settings]);

	const [isFinished, setIsFinished] = useState(false);
	const [isMouseActive, setIsMouseActive] = useState(false);
	const isMouseActiveRef = useRef(false);

	const [snapshot, setSnapshot] = useState<{
		words: string[];
		letterStatuses: LetterStatus[][];
		extraChars: string[][];
	} | null>(null);

	const [words, setWords] = useState(() => getNewWords(settings));

	const { timer, timerStatus, startTimer, resetTimer, elapsed } = useTimer(
		settings.count,
		isFinished,
		settings.mode,
	);

	const { currentWordIndex, currentLetterIndex, letterStatuses, extraChars, resetTyping, handleMobileInput } =
		useTyping(words, timer, timerStatus, startTimer);

	const { wpm, accuracy, correct, incorrect, extra } = calculateResults(
		letterStatuses,
		extraChars,
		settings,
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
			setSnapshot({ words, letterStatuses, extraChars });
		}
	}, [timer, currentWordIndex]);

	useEffect(() => {
		document.body.classList.toggle("session--active", timerStatus && !isMouseActive);
	}, [timerStatus, isMouseActive]);

	useEffect(() => {
		if (!timerStatus || isFinished) return;

		const handleMouseMove = () => {
			if (isMouseActiveRef.current) return;
			isMouseActiveRef.current = true;
			setIsMouseActive(true);
		};

		const handleKeyDown = () => {
			if (!isMouseActiveRef.current) return;
			isMouseActiveRef.current = false;
			setIsMouseActive(false);
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("keydown", handleKeyDown, { capture: true });

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("keydown", handleKeyDown, { capture: true });
		};
	}, [timerStatus, isFinished]);

	const handleReset = useCallback(
		(newSettings = settings) => {
			const newWords = getNewWords(newSettings);
			setWords(newWords);
			resetTimer(newSettings.count);
			resetTyping(newWords);
			setIsFinished(false);
			isMouseActiveRef.current = false;
			setIsMouseActive(false);
			setChartData([]);
			setSnapshot(null);
		},
		[settings],
	);

	return {
		settings,
		setSettings,
		isFinished,
		isMouseActive,
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
		handleMobileInput,
		chartData,
		elapsed,
		correct,
		incorrect,
		extra,
		snapshot,
	};
};

export default useSession;
