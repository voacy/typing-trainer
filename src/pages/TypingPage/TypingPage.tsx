import { useRef, useState } from "react";
import useCursor from "../../features/cursor/useCursor";
import useTextScroll from "../../features/textScroll/useTextScroll";
import TypingText from "../../features/typing/TypingText";
import Settings from "../../widgets/Settings/Settings";
import CapsLockWarning from "../../features/capsLock/CapsLockWarning";
import { ArrowClockwiseIcon, TextAlignLeftIcon, ImageIcon } from "@phosphor-icons/react";
import Results from "../../widgets/Results/Results";
import useSession from "./useSession";
import useGameSounds from "../../features/sounds/useSounds";
import html2canvas from "html2canvas";
import Tooltip from "../../shared/ui/Tooltip";
import { toast } from "sonner";

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
		correct,
		incorrect,
		extra,
	} = useSession();

	const wrapperRef = useRef<HTMLDivElement>(null);
	const resultsRef = useRef<HTMLElement>(null);
	const [showReplay, setShowReplay] = useState(false);
	const offset = useTextScroll(currentWordIndex, wrapperRef);
	const cursorPos = useCursor(currentLetterIndex, currentWordIndex, offset, wrapperRef);
	const { playClick } = useGameSounds();

	const handleScreenshot = async () => {
		if (!resultsRef.current) return;
		const bgColor = getComputedStyle(document.documentElement)
			.getPropertyValue("--color-bg")
			.trim();
		const canvas = await html2canvas(resultsRef.current, { backgroundColor: bgColor });
		canvas.toBlob(async (blob) => {
			if (!blob) return;
			await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
			toast.success("Screenshot copied to clipboard");
		}, "image/png");
	};

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
						ref={resultsRef}
						wpm={wpm}
						accuracy={accuracy}
						chartData={chartData}
						elapsed={elapsed}
						correct={correct}
						incorrect={incorrect}
						extra={extra}
						words={words}
						letterStatuses={letterStatuses}
						extraChars={extraChars}
						showReplay={showReplay}
					/>
				)}

				<div className="controls">
					<Tooltip content="Restart" side="top">
						<button
							className="controls__btn"
							onClick={(e) => {
								playClick();
								handleReset();
								setShowReplay(false);
								e.currentTarget.blur();
							}}
						>
							<ArrowClockwiseIcon size={20} />
						</button>
					</Tooltip>

					{isFinished && (
						<>
							<Tooltip content="Input history" side="top">
								<button
									className="controls__btn"
									onClick={(e) => {
										playClick();
										setShowReplay((prev) => !prev);
										e.currentTarget.blur();
									}}
								>
									<TextAlignLeftIcon size={20} />
								</button>
							</Tooltip>

							<Tooltip content="Copy screenshot" side="top">
								<button
									className="controls__btn"
									onClick={(e) => {
										playClick();
										handleScreenshot();
										e.currentTarget.blur();
									}}
								>
									<ImageIcon size={20} />
								</button>
							</Tooltip>
						</>
					)}
				</div>
			</div>
		</main>
	);
};

export default TypingPage;
