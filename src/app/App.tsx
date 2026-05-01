import "./App.scss";
import useTimer from "../features/timer/useTimer";
import useTyping from "../features/typing/useTyping";
import { useEffect, useRef, useState } from "react";
import useCursor from "../features/cursor/useCursor";
import useTextScroll from "../features/textScroll/useTextScroll";
import TypingText from "../features/typing/TypingText";
import { generateWords } from "../shared/lib";
import wordsList from "../shared/lib/wordsList";
import Settings from "../widgets/Settings/Settings";
import CapsLockWarning from "../features/capsLock/CapsLockWarning";
import Header from "../widgets/Header/Header";
import { ArrowsCounterClockwiseIcon } from "@phosphor-icons/react";
import { generateWordsWithPunctuation } from "../shared/lib";
import quotes from "../shared/lib/quotes";
import Results from "../widgets/Results/Results";

function App() {
	const [settings, setSettings] = useState({
		mode: "time",
		isPunctuation: false,
		count: 30,
		language: "english",
	});
	const [isFinished, setIsFinished] = useState(false);
	const [words, setWords] = useState(() =>
		generateWords(wordsList, settings.mode === "time" ? 200 : settings.count),
	);
	const { timer, timerStatus, startTimer, resetTimer, elapsed } = useTimer(
		settings.count,
		isFinished,
	);
	const { currentWordIndex, currentLetterIndex, letterStatuses, extraChars, resetTyping } =
		useTyping(words, timer, timerStatus, startTimer);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const offset = useTextScroll(currentWordIndex, wrapperRef);
	const cursorPos = useCursor(currentLetterIndex, currentWordIndex, offset, wrapperRef);
	const [finalWpm, setFinalWpm] = useState(0);

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
		if (timer === 0 || currentWordIndex >= words.length) {
			setIsFinished(true);
		}
	}, [timer, currentWordIndex]);

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

	return (
		<>
			<Header />
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
}

export default App;
