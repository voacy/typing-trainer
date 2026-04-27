import "./App.css";
import words from "./shared/lib/words";
import useTimer from "./features/timer/useTimer";
import useTyping from "./features/typing/useTyping";
import { getLetterClass, getActiveClass } from "./shared/lib";

function App() {
	const { timer, timerStatus, startTimer } = useTimer();
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
					<div className="text__wrapper">
						<ul className="text">
							{words.map((word, wordIndex) => {
								const isWordIncorrect =
									wordIndex < currentWordIndex &&
									letterStatuses[wordIndex].some(
										(status) => status === "idle" || status === "incorrect",
									);
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
