import "./App.scss";
import useTimer from "../features/timer/useTimer";
import useTyping from "../features/typing/useTyping";
import { useRef, useState } from "react";
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

function App() {
	const [settings, setSettings] = useState({
		mode: "time",
		isPunctuation: false,
		count: 30,
		language: "english",
	});
	const [words, setWords] = useState(() => generateWords(wordsList, settings.count));
	const { timer, timerStatus, startTimer, resetTimer } = useTimer(settings.count);
	const { currentWordIndex, currentLetterIndex, letterStatuses, extraChars, resetTyping } =
		useTyping(words, timer, timerStatus, startTimer);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const offset = useTextScroll(currentWordIndex, wrapperRef);
	const cursorPos = useCursor(currentLetterIndex, currentWordIndex, offset, wrapperRef);

	const handleReset = (newSettings = settings) => {
		let newWords: string[];

		if (newSettings.mode === "quote") {
			const quote = quotes[Math.floor(Math.random() * quotes.length)];
			newWords = quote.split(" ");
		} else if (newSettings.isPunctuation) {
			newWords = generateWordsWithPunctuation(wordsList, newSettings.count);
		} else {
			newWords = generateWords(wordsList, newSettings.count);
		}

		setWords(newWords);
		resetTimer(newSettings.count);
		resetTyping(newWords);
	};

	return (
		<>
			<Header />
			<main className="main">
				<div className="container">
					<Settings settings={settings} setSettings={setSettings} onReset={handleReset} />
					{settings.mode === "time" ? (
						<span className="timer">{timer}</span>
					) : (
						<span className="timer">
							{currentWordIndex}/{words.length}
						</span>
					)}
					<CapsLockWarning />
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
