import { useState, useEffect, useCallback } from "react";
import { createLetterStatuses } from "../../shared/lib";
import type { LetterStatus } from "../../shared/types";
import useGameSounds from "../../features/sounds/useSounds";

const useTyping = (
	words: string[],
	timer: number,
	timerStatus: boolean,
	startTimer: () => void,
) => {
	const [letterStatuses, setLetterStatuses] = useState<LetterStatus[][]>(
		createLetterStatuses(words),
	);
	const [extraChars, setExtraChars] = useState<string[][]>(words.map(() => []));
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
	const currentWord = words[currentWordIndex] ?? "";
	const currentLetter = currentWord[currentLetterIndex];

	const { playCorrect, playIncorrect } = useGameSounds();

	const hasErrors = useCallback(() => {
		return (
			currentWordIndex > 0 &&
			(letterStatuses[currentWordIndex - 1].some((status) => status !== "correct") ||
				extraChars[currentWordIndex - 1].length > 0)
		);
	}, [currentWordIndex, letterStatuses, extraChars]);

	const handleLetter = useCallback(
		(e: string) => {
			const newStatuses = [...letterStatuses];
			newStatuses[currentWordIndex] = [...letterStatuses[currentWordIndex]];

			const newExtraChars = [...extraChars];
			newExtraChars[currentWordIndex] = [...extraChars[currentWordIndex], e];

			if (currentLetterIndex >= currentWord.length) {
				playIncorrect();
				setExtraChars(newExtraChars);
			} else if (e === currentLetter) {
				newStatuses[currentWordIndex][currentLetterIndex] = "correct";
				playCorrect();
			} else if (e !== currentLetter) {
				newStatuses[currentWordIndex][currentLetterIndex] = "incorrect";
				playIncorrect();
			}
			setCurrentLetterIndex((char) => char + 1);
			setLetterStatuses(newStatuses);
		},
		[
			letterStatuses,
			extraChars,
			currentWordIndex,
			currentLetterIndex,
			currentLetter,
			currentWord,
			playCorrect,
			playIncorrect,
		],
	);

	const handleSpace = useCallback(() => {
		const newStatuses = [...letterStatuses];
		newStatuses[currentWordIndex] = [...letterStatuses[currentWordIndex]];

		if (currentLetterIndex === 0) return;

		if (
			letterStatuses[currentWordIndex].some((status) => status !== "correct") ||
			extraChars[currentWordIndex].length > 0
		) {
			playIncorrect();
		} else {
			playCorrect();
		}

		setCurrentWordIndex((word) => word + 1);
		setCurrentLetterIndex(0);
		setLetterStatuses(newStatuses);
	}, [
		letterStatuses,
		currentWordIndex,
		currentLetterIndex,
		extraChars,
		playIncorrect,
		playCorrect,
	]);

	const handleBackspace = useCallback(() => {
		const newStatuses = [...letterStatuses];
		newStatuses[currentWordIndex] = [...letterStatuses[currentWordIndex]];

		const newExtraChars = [...extraChars];
		newExtraChars[currentWordIndex] = [...extraChars[currentWordIndex]];

		if (currentLetterIndex > currentWord.length) {
			playCorrect();
			setCurrentLetterIndex((char) => char - 1);
			newExtraChars[currentWordIndex] = extraChars[currentWordIndex].slice(0, -1);
			setExtraChars(newExtraChars);
			return;
		}

		if (currentLetterIndex > 0) {
			playCorrect();
			setCurrentLetterIndex((char) => char - 1);
			newStatuses[currentWordIndex][currentLetterIndex - 1] = "idle";
			setLetterStatuses(newStatuses);
		}

		if (currentLetterIndex === 0 && hasErrors()) {
			playCorrect();
			setCurrentWordIndex((word) => word - 1);
			setCurrentLetterIndex(
				words[currentWordIndex - 1].length + extraChars[currentWordIndex - 1].length,
			);
			setLetterStatuses(newStatuses);
		}
	}, [
		letterStatuses,
		currentWordIndex,
		currentLetterIndex,
		extraChars,
		currentWord,
		words,
		hasErrors,
		playCorrect,
	]);

	const handleCtrlBackspace = useCallback(() => {
		const newStatuses = [...letterStatuses];
		newStatuses[currentWordIndex] = [...letterStatuses[currentWordIndex]];

		const newExtraChars = [...extraChars];
		newExtraChars[currentWordIndex] = [...extraChars[currentWordIndex]];

		if (currentLetterIndex > currentWord.length) {
			setCurrentLetterIndex(0);
			newExtraChars[currentWordIndex] = [];
			newStatuses[currentWordIndex] = newStatuses[currentWordIndex].map(
				() => "idle" as LetterStatus,
			);
			setExtraChars(newExtraChars);
			setLetterStatuses(newStatuses);
			return;
		}

		if (currentLetterIndex > 0) {
			setCurrentLetterIndex(0);
			newStatuses[currentWordIndex] = newStatuses[currentWordIndex].map(
				() => "idle" as LetterStatus,
			);
		}

		if (currentLetterIndex === 0 && hasErrors()) {
			setCurrentWordIndex((word) => word - 1);
			setCurrentLetterIndex(0);
			newStatuses[currentWordIndex - 1] = newStatuses[currentWordIndex - 1].map(
				() => "idle" as LetterStatus,
			);
			newExtraChars[currentWordIndex - 1] = [];
			setExtraChars(newExtraChars);
		}
		setLetterStatuses(newStatuses);
	}, [letterStatuses, currentWordIndex, currentLetterIndex, extraChars, currentWord, hasErrors]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!letterStatuses[currentWordIndex]) return;
			const isLetter = e.key.length === 1 && e.key !== " ";
			if (timer === 0) return;

			if (e.key === " ") handleSpace();
			else if (e.key === "Backspace" && e.ctrlKey) handleCtrlBackspace();
			else if (e.key === "Backspace") handleBackspace();
			else if (isLetter) {
				if (!timerStatus) startTimer();
				handleLetter(e.key);
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [
		handleSpace,
		handleBackspace,
		handleCtrlBackspace,
		handleLetter,
		timer,
		timerStatus,
		startTimer,
		letterStatuses,
		currentWordIndex,
	]);

	const resetTyping = useCallback(
		(newWords?: string[]) => {
			const w = newWords ?? words;
			setLetterStatuses(createLetterStatuses(w));
			setExtraChars(w.map(() => []));
			setCurrentWordIndex(0);
			setCurrentLetterIndex(0);
		},
		[words],
	);

	return { letterStatuses, extraChars, currentWordIndex, currentLetterIndex, resetTyping };
};

export default useTyping;
