import "./Results.scss";
import {
	ComposedChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

import { useEffect, forwardRef } from "react";
import useGameSounds from "../../features/sounds/useSounds";
import confetti from "canvas-confetti";
import type { LetterStatus } from "../../shared/types";
import { getLetterClass } from "../../shared/lib";
import { ClipboardTextIcon, WarningIcon } from "@phosphor-icons/react";
import AppTooltip from "../../shared/ui/Tooltip";
import { toast } from "sonner";

type Props = {
	wpm: number;
	accuracy: number;
	chartData: { wpm: number; accuracy: number; errors: number }[];
	elapsed: number;
	correct: number;
	incorrect: number;
	extra: number;
	words: string[];
	letterStatuses: LetterStatus[][];
	extraChars: string[][];
	showReplay: boolean;
};

const Results = forwardRef<HTMLElement, Props>(
	(
		{
			wpm,
			accuracy,
			chartData,
			elapsed,
			correct,
			incorrect,
			extra,
			words,
			letterStatuses,
			extraChars,
			showReplay,
		},
		ref,
	) => {
		const data = chartData.map((entry, index) => ({
			second: index,
			errors: entry.errors,
			wpm: entry.wpm,
			accuracy: entry.accuracy,
		}));

		const { playResult, playClick } = useGameSounds();

		useEffect(() => {
			playResult();
		}, [playResult]);

		const colors = ["#d65ccc", "#d1d0c5", "#ca4754", "#47ca5d"];

		useEffect(() => {
			confetti({
				particleCount: 50,
				angle: 60,
				spread: 150,
				origin: { x: 0 },
				colors: colors,
			});
			confetti({
				particleCount: 50,
				angle: 120,
				spread: 150,
				origin: { x: 1 },
				colors: colors,
			});
		}, []);

		const handleCopyAll = () => {
			playClick();
			const typed = words.filter((_, i) => letterStatuses[i]?.some((s) => s !== "idle")).join(" ");
			navigator.clipboard.writeText(typed);
			toast.success("Words copied to clipboard");
		};

		const handleCopyErrors = () => {
			playClick();
			const errors = words
				.filter(
					(_, i) => letterStatuses[i]?.some((s) => s === "incorrect") || extraChars[i]?.length > 0,
				)
				.join(" ");
			navigator.clipboard.writeText(errors);
			toast.success("Error words copied to clipboard");
		};

		return (
			<section className="results" ref={ref}>
				<div className="results__stats">
					<div className="results__stat">
						<span className="results__label">wpm</span>
						<span className="results__value">{wpm.toFixed(0)}</span>
					</div>
					<div className="results__stat">
						<span className="results__label">acc</span>
						<span className="results__value">{accuracy.toFixed(0)}%</span>
					</div>
					<div className="results__stat">
						<span className="results__label">time</span>
						<span className="results__value">{elapsed}s</span>
					</div>
					<AppTooltip
						side="top"
						content={
							<div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
								<span>correct: {correct}</span>
								<span>incorrect: {incorrect}</span>
								<span>extra: {extra}</span>
							</div>
						}
					>
						<div className="results__stat" style={{ cursor: "default" }}>
							<span className="results__label">characters</span>
							<span className="results__value">
								{correct}/{incorrect}/{extra}
							</span>
						</div>
					</AppTooltip>
				</div>
				<div className="results__chart">
					<ResponsiveContainer width="100%" height={250}>
						<ComposedChart data={data} margin={{ left: -30 }}>
							<CartesianGrid strokeDasharray="3 3" stroke="var(--color-mode-bg)" />
							<XAxis
								dataKey="second"
								tick={{ fill: "var(--color-text)", fontSize: 12 }}
								axisLine={false}
								tickLine={false}
							/>
							<YAxis
								tick={{ fill: "var(--color-text)", fontSize: 12 }}
								axisLine={false}
								tickLine={false}
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: "var(--color-mode-bg)",
									border: "none",
									borderRadius: "6px",
									color: "var(--color-letter-correct)",
								}}
							/>
							<Line
								type="monotone"
								dataKey="errors"
								dot={false}
								stroke="var(--color-letter-incorrect)"
								strokeWidth={2}
								legendType="rect"
							/>
							<Line
								type="monotone"
								dataKey="wpm"
								dot={false}
								stroke="var(--color-accent)"
								strokeWidth={2}
								legendType="rect"
							/>
							<Line
								type="monotone"
								dataKey="accuracy"
								dot={false}
								stroke="var(--color-letter-correct)"
								strokeWidth={2}
								legendType="rect"
							/>
						</ComposedChart>
					</ResponsiveContainer>
				</div>
				<div
					className={`results__replay-section ${showReplay ? "results__replay-section--visible" : ""}`}
				>
					<div className="results__replay-header">
						<span className="results__label">input history</span>
						<div className="results__replay-actions">
							<AppTooltip content="Copy all words" side="top">
								<button className="results__replay-btn" onClick={handleCopyAll}>
									<ClipboardTextIcon size={16} />
								</button>
							</AppTooltip>
							<AppTooltip content="Copy words with errors" side="top">
								<button className="results__replay-btn" onClick={handleCopyErrors}>
									<WarningIcon size={16} />
								</button>
							</AppTooltip>
						</div>
					</div>
					<ul className="results__replay">
						{words.map((word, wordIndex) => {
							if (!letterStatuses[wordIndex]?.some((s) => s !== "idle")) return null;

							const isIncorrect =
								letterStatuses[wordIndex]?.some((s) => s === "incorrect") ||
								extraChars[wordIndex]?.length > 0;

							return (
								<span key={wordIndex} className={`word${isIncorrect ? " incorrect-word" : ""}`}>
									{word.split("").map((letter, letterIndex) => (
										<span
											key={letterIndex}
											className={`letter ${getLetterClass(letterStatuses, wordIndex, letterIndex)}`}
										>
											{letter}
										</span>
									))}
									{extraChars[wordIndex]?.map((char, charIndex) => (
										<span key={`extra-${charIndex}`} className="letter extra">
											{char}
										</span>
									))}
									<span className="letter"> </span>
								</span>
							);
						})}
					</ul>
				</div>
			</section>
		);
	},
);

export default Results;
