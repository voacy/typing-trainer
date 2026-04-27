import { useState, useEffect } from "react";
import words from "../../shared/lib/words";
import { createLetterStatuses } from "../../shared/lib";
import type { LetterStatus } from "../../shared/types";

const useTyping = (timer: number, timerStatus: boolean, startTimer: () => void) => {
	const [letterStatuses, setLetterStatuses] = useState<LetterStatus[][]>(
		createLetterStatuses(words),
	);
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
	const currentWord = words[currentWordIndex];
	const currentLetter = currentWord[currentLetterIndex];

	const handleLetter = (e: string) => {
		const newStatuses = [...letterStatuses];
		newStatuses[currentWordIndex] = [...letterStatuses[currentWordIndex]];
		if (e === currentLetter) {
			newStatuses[currentWordIndex][currentLetterIndex] = "correct";
		} else {
			newStatuses[currentWordIndex][currentLetterIndex] = "incorrect";
		}
		setCurrentLetterIndex((e) => e + 1);
		setLetterStatuses(newStatuses);
	};

	const handleSpace = () => {
		const newStatuses = [...letterStatuses];
		newStatuses[currentWordIndex] = [...letterStatuses[currentWordIndex]];

		setCurrentWordIndex((e) => e + 1);
		setCurrentLetterIndex(0);
		setLetterStatuses(newStatuses);
	};

	const handleBackspace = () => {
		const newStatuses = [...letterStatuses];
		newStatuses[currentWordIndex] = [...letterStatuses[currentWordIndex]];

		const hasErrors =
			currentWordIndex > 0 &&
			letterStatuses[currentWordIndex - 1].some(
				(status) => status === "idle" || status === "incorrect",
			);

		if (currentLetterIndex > 0) {
			setCurrentLetterIndex((e) => e - 1);
			newStatuses[currentWordIndex][currentLetterIndex - 1] = "idle";
		}

		if (currentLetterIndex === 0 && hasErrors) {
			setCurrentWordIndex((e) => e - 1);
			setCurrentLetterIndex(words[currentWordIndex - 1].length);
		}
		setLetterStatuses(newStatuses);
	};

	const handleCtrlBackspace = () => {
		const newStatuses = [...letterStatuses];
		newStatuses[currentWordIndex] = [...letterStatuses[currentWordIndex]];

		const hasErrors =
			currentWordIndex > 0 &&
			letterStatuses[currentWordIndex - 1].some(
				(status) => status === "idle" || status === "incorrect",
			);

		if (currentLetterIndex > 0) {
			setCurrentLetterIndex(0);
			newStatuses[currentWordIndex] = newStatuses[currentWordIndex].map(
				() => "idle" as LetterStatus,
			);
		}

		if (currentLetterIndex === 0 && hasErrors) {
			setCurrentWordIndex((e) => e - 1);
			setCurrentLetterIndex(words[currentWordIndex - 1].length);
		}
		setLetterStatuses(newStatuses);
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			const isLetter = e.key.length === 1 && e.key !== " ";
			if (timer === 0) return;
			if (!timerStatus) startTimer();

			if (e.key === " ") handleSpace();
			else if (e.key === "Backspace" && e.ctrlKey) handleCtrlBackspace();
			else if (e.key === "Backspace") handleBackspace();
			else if (isLetter) handleLetter(e.key);
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [currentLetter, letterStatuses, timer, timerStatus, startTimer]);

	return { letterStatuses, currentWordIndex, currentLetterIndex };
};

export default useTyping;
