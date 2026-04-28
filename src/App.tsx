import "./App.css";
import words from "./shared/lib/words";
import useTimer from "./features/timer/useTimer";
import useTyping from "./features/typing/useTyping";
import { getLetterClass, getActiveClass } from "./shared/lib";
import useCapsLock from "./features/capsLock/useCapsLock";
import { LockKeyhole } from "lucide-react";
import { useRef } from "react";
import useCursor from "./features/cursor/useCursor";
import useTextScroll from "./features/textScroll/useTextScroll";
import { LINE_HEIGHT } from "./shared/constants";

function App() {
	const { timer, timerStatus, startTimer } = useTimer();
	const isCapsLock = useCapsLock();
	const { currentWordIndex, currentLetterIndex, letterStatuses } = useTyping(
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
						<ul
							className="text"
							style={{ transform: `translateY(-${currentLine * LINE_HEIGHT}px)` }}
						>
							{words.map((word, wordIndex) => {
								const isWordIncorrect =
									wordIndex < currentWordIndex &&
									letterStatuses[wordIndex].some((status) => status !== "correct");

								const isLastletter =
									words[currentWordIndex].length === currentLetterIndex &&
									wordIndex === currentWordIndex;
								return (
									<li key={wordIndex} className={`word ${isWordIncorrect ? "incorrect-word" : ""}`}>
										{word.split("").map((letter, letterIndex) => (
											<span
												key={letterIndex}
												className={`letter ${getLetterClass(letterStatuses, wordIndex, letterIndex)} ${getActiveClass(wordIndex, letterIndex, currentWordIndex, currentLetterIndex)}`}
											>
												{letter}
											</span>
										))}
										{isLastletter && <span className="letter active"></span>}
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</main>
		</>
	);
}

export default App;
