import "./App.css";
import words from "./shared/lib/words";
import useTimer from "./features/timer/useTimer";
import useTyping from "./features/typing/useTyping";
import { getLetterClass, getActiveClass } from "./shared/lib";
import useCapsLock from "./features/capsLock/useCapsLock";
import { LockKeyhole } from "lucide-react";

function App() {
	const { timer, timerStatus, startTimer } = useTimer();
	const isCapsLock = useCapsLock();
	const { currentWordIndex, currentLetterIndex, letterStatuses } = useTyping(
		timer,
		timerStatus,
		startTimer,
	);

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

					<div className="text__wrapper">
						<ul className="text">
							{words.map((word, wordIndex) => {
								const isWordIncorrect =
									wordIndex < currentWordIndex &&
									letterStatuses[wordIndex].some((status) => status !== "correct");
								return (
									<li key={wordIndex} className={`word ${isWordIncorrect ? "incorrect-word" : ""}`}>
										{word.split("").map((letter, letterIndex) => (
											<span
												key={letterIndex}
												className={`${getLetterClass(letterStatuses, wordIndex, letterIndex)} ${getActiveClass(wordIndex, letterIndex, currentWordIndex, currentLetterIndex)} letter`}
											>
												{letter}
											</span>
										))}
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
