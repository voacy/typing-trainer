import { useRef } from "react";
import useCursor from "../../features/cursor/useCursor";
import useTextScroll from "../../features/textScroll/useTextScroll";
import TypingText from "../../features/typing/TypingText";
import Settings from "../../widgets/Settings/Settings";
import CapsLockWarning from "../../features/capsLock/CapsLockWarning";
import { ArrowsCounterClockwiseIcon } from "@phosphor-icons/react";
import Results from "../../widgets/Results/Results";
import useSession from "./useSession";

const TypingPage = () => {
	const {
		settings,
		setSettings,
		isFinished,
		words,
		timer,
		timerStatus,
		currentWordIndex,
		currentLetterIndex,
		letterStatuses,
		extraChars,
		wpm,
		accuracy,
		handleReset,
		chartData,
		elapsed,
	} = useSession();

	const wrapperRef = useRef<HTMLDivElement>(null);
	const offset = useTextScroll(currentWordIndex, wrapperRef);
	const cursorPos = useCursor(currentLetterIndex, currentWordIndex, offset, wrapperRef);

	return (
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
				{!isFinished && (
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
				{isFinished && (
					<Results
						wpm={wpm}
						accuracy={accuracy}
						chartData={chartData}
						elapsed={elapsed}
						letterStatuses={letterStatuses}
						extraChars={extraChars}
					/>
				)}
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
	);
};

export default TypingPage;
