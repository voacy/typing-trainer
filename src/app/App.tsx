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

function App() {
	const [words] = useState(() => generateWords(wordsList, 10));
	const { timer, timerStatus, startTimer } = useTimer();
	const { currentWordIndex, currentLetterIndex, letterStatuses, extraChars } = useTyping(
		words,
		timer,
		timerStatus,
		startTimer,
	);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const offset = useTextScroll(currentWordIndex, wrapperRef);
	const cursorPos = useCursor(currentLetterIndex, currentWordIndex, offset, wrapperRef);

	return (
		<>
			<Header />
			<main className="main">
				<div className="container">
					<Settings />
					<span className="timer">{timer}</span>
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
				</div>
			</main>
		</>
	);
}

export default App;
