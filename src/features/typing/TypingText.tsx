import { getActiveClass, getLetterClass } from "../../shared/lib";
import type { CursorPosition, LetterStatus } from "../../shared/types";
import { LINE_HEIGHT } from "../../shared/constants";

type Props = {
	words: string[];
	currentWordIndex: number;
	currentLetterIndex: number;
	letterStatuses: LetterStatus[][];
	extraChars: string[][];
	offset: number;
	cursorPos: CursorPosition;
	timerStatus: boolean;
};

const TypingText = (props: Props) => {
	const {
		words,
		currentWordIndex,
		currentLetterIndex,
		letterStatuses,
		extraChars,
		offset,
		cursorPos,
		timerStatus,
	} = props;
	return (
		<ul className="text" style={{ transform: `translateY(-${offset - LINE_HEIGHT}px)` }}>
			<span
				className={`cursor ${!timerStatus ? "cursor--blinking" : ""}`}
				style={{ top: `${cursorPos.top}px`, left: `${cursorPos.left}px` }}
			></span>
			{words.map((word, wordIndex) => {
				const isWordIncorrect =
					wordIndex < currentWordIndex &&
					(letterStatuses[wordIndex]?.some((status: string) => status !== "correct") ||
						extraChars[wordIndex].length > 0);

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
						{extraChars[wordIndex]?.map((letter, letterIndex) => (
							<span key={letterIndex} className="letter extra">
								{letter}
							</span>
						))}
						{(extraChars[wordIndex]?.length > 0 && wordIndex === currentWordIndex) ||
						(currentLetterIndex === word.length &&
							extraChars[wordIndex]?.length === 0 &&
							wordIndex === currentWordIndex) ? (
							<span className="letter active"></span>
						) : null}
					</li>
				);
			})}
		</ul>
	);
};

export default TypingText;
