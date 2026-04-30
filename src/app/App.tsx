import "./App.scss";
import useTimer from "../features/timer/useTimer";
import useTyping from "../features/typing/useTyping";
import useCapsLock from "../features/capsLock/useCapsLock";
import { LockKeyhole } from "lucide-react";
import { useRef, useState } from "react";
import useCursor from "../features/cursor/useCursor";
import useTextScroll from "../features/textScroll/useTextScroll";
import TypingText from "../features/typing/TypingText";
import { generateWords } from "../shared/lib";
import wordsList from "../shared/lib/wordsList";

function App() {
	const [words] = useState(() => generateWords(wordsList, 100));
	const { timer, timerStatus, startTimer } = useTimer();
	const isCapsLock = useCapsLock();
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
			<header className="header">
				<div className="container">
					<a href="/">speedkeys</a>
				</div>
			</header>

			<main className="main">
				<div className="container">
					<span className="timer">{timer}</span>
					{isCapsLock && (
						<span className="capslock-warning">
							<LockKeyhole size={25} strokeWidth={2} />
							Caps Lock
						</span>
					)}
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
