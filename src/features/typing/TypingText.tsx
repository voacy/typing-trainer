import words from "../../shared/lib/words";
import { LINE_HEIGHT } from "../../shared/constants";
import { getActiveClass, getLetterClass } from "../../shared/lib";
import type { LetterStatus } from "../../shared/types";

type Props = {
	currentLine: number;
	currentWordIndex: number;
	currentLetterIndex: number;
	letterStatuses: LetterStatus[][];
	extraChars: string[][];
};

const TypingText = (props: Props) => {
	const { currentWordIndex, currentLetterIndex, letterStatuses, currentLine, extraChars } = props;
	return (
		<ul className="text" style={{ transform: `translateY(-${currentLine * LINE_HEIGHT}px)` }}>
			{words.map((word, wordIndex) => {
				const isWordIncorrect =
					wordIndex < currentWordIndex &&
					(letterStatuses[wordIndex].some((status: string) => status !== "correct") ||
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
						{extraChars[wordIndex].map((letter, letterIndex) => (
							<span key={letterIndex} className="letter extra">
								{letter}
							</span>
						))}
						{(extraChars[wordIndex].length > 0 && wordIndex === currentWordIndex) ||
						(currentLetterIndex === word.length &&
							extraChars[wordIndex].length === 0 &&
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
