import useTimer from "../../features/timer/useTimer";
import useTyping from "../../features/typing/useTyping";
import { useEffect, useRef, useState } from "react";
import useCursor from "../../features/cursor/useCursor";
import useTextScroll from "../../features/textScroll/useTextScroll";
import TypingText from "../../features/typing/TypingText";
import { generateWords } from "../../shared/lib";
import wordsList from "../../shared/lib/wordsList";
import Settings from "../../widgets/Settings/Settings";
import type { TypingSettings } from "../../shared/types";
import CapsLockWarning from "../../features/capsLock/CapsLockWarning";
import { ArrowsCounterClockwiseIcon } from "@phosphor-icons/react";
import { generateWordsWithPunctuation } from "../../shared/lib";
import quotes from "../../shared/lib/quotes";
import Results from "../../widgets/Results/Results";
import useResults from "../../features/results/useResults";

const TypingPage = () => {
	const [settings, setSettings] = useState<TypingSettings>({
		mode: "words",
		isPunctuation: false,
		count: 10,
		language: "english",
	});
	const [isFinished, setIsFinished] = useState(false);
	const [words, setWords] = useState(() =>
		generateWords(wordsList, settings.mode === "time" ? 200 : settings.count),
	);
	const { timer, timerStatus, startTimer, resetTimer, elapsed } = useTimer(
		settings.count,
		isFinished,
		settings.mode,
	);
	const { currentWordIndex, currentLetterIndex, letterStatuses, extraChars, resetTyping } =
		useTyping(words, timer, timerStatus, startTimer);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const offset = useTextScroll(currentWordIndex, wrapperRef);
	const cursorPos = useCursor(currentLetterIndex, currentWordIndex, offset, wrapperRef);
	const { finalWpm, acc } = useResults(letterStatuses, extraChars, settings, isFinished, elapsed);

	const handleReset = (newSettings = settings) => {
		let newWords: string[];

		if (newSettings.mode === "quote") {
			const quote = quotes[Math.floor(Math.random() * quotes.length)];
			newWords = quote.split(" ");
		} else if (newSettings.isPunctuation) {
			newWords = generateWordsWithPunctuation(
				wordsList,
				newSettings.mode === "time" ? 200 : newSettings.count,
			);
		} else {
			newWords = generateWords(wordsList, newSettings.mode === "time" ? 200 : newSettings.count);
		}

		setWords(newWords);
		resetTimer(newSettings.count);
		resetTyping(newWords);
		setIsFinished(false);
	};

	useEffect(() => {
		console.log(
			"timer:",
			timer,
			"currentWordIndex:",
			currentWordIndex,
			"words.length:",
			words.length,
		);

		if ((settings.mode === "time" && timer === 0) || currentWordIndex >= words.length) {
			setIsFinished(true);
		}
	}, [timer, currentWordIndex]);

	return (
		<>
			<main className="main">
				<div className="container">
					<Settings settings={settings} setSettings={setSettings} onReset={handleReset} />
					{!isFinished &&
						(settings.mode === "time" ? (
							<span className="timer">{timer}</span>
						) : (
							<span className="timer">
								{currentWordIndex}/{words.length}
							</span>
						))}
					<CapsLockWarning />
					{isFinished ? (
						""
					) : (
						<div className="text__wrapper" ref={wrapperRef}>
							<TypingText
								words={words}
								offset={offset}
								currentWordIndex={currentWordIndex}
								currentLetterIndex={currentLetterIndex}
								letterStatuses={letterStatuses}
								extraChars={extraChars}
								cursorPos={cursorPos}
								timerStatus={timerStatus}
							/>
						</div>
					)}
					{isFinished ? <Results finalWpm={finalWpm} acc={acc} /> : ""}
					<button
						className="reset__btn"
						onClick={(e) => {
							handleReset();
							e.currentTarget.blur();
						}}
					>
						<ArrowsCounterClockwiseIcon size={32} />
					</button>
				</div>
			</main>
		</>
	);
};

export default TypingPage;
