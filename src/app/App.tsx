import "./App.scss";
import useTimer from "../features/timer/useTimer";
import useTyping from "../features/typing/useTyping";
import useCapsLock from "../features/capsLock/useCapsLock";
import { LockKeyhole } from "lucide-react";
import { useRef } from "react";
import useCursor from "../features/cursor/useCursor";
import useTextScroll from "../features/textScroll/useTextScroll";
import TypingText from "../features/typing/TypingText";

function App() {
	const { timer, timerStatus, startTimer } = useTimer();
	const isCapsLock = useCapsLock();
	const { currentWordIndex, currentLetterIndex, letterStatuses, extraChars } = useTyping(
		timer,
		timerStatus,
		startTimer,
	);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const currentLine = useTextScroll(currentWordIndex, wrapperRef);
	const cursorPos = useCursor(currentLetterIndex, currentWordIndex, currentLine, wrapperRef);

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
						<span
							className={`cursor ${!timerStatus ? "cursor--blinking" : ""}`}
							style={{ top: `${cursorPos.top}px`, left: `${cursorPos.left}px` }}
						></span>
						<TypingText
							currentLine={currentLine}
							currentWordIndex={currentWordIndex}
							currentLetterIndex={currentLetterIndex}
							letterStatuses={letterStatuses}
							extraChars={extraChars}
						/>
					</div>
				</div>
			</main>
		</>
	);
}

export default App;
