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

import useGameSounds from "../../features/sounds/useSounds";

import { useEffect } from "react";

import confetti from "canvas-confetti";

type Props = {
	wpm: number;
	accuracy: number;
	chartData: { wpm: number; accuracy: number; errors: number }[];
	elapsed: number;
	correct: number;
	incorrect: number;
	extra: number;
};

const Results = ({ wpm, accuracy, chartData, elapsed, correct, incorrect, extra }: Props) => {
	const data = chartData.map((entry, index) => ({
		second: index,
		errors: entry.errors,
		wpm: entry.wpm,
		accuracy: entry.accuracy,
	}));

	const { playResult } = useGameSounds();

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

	return (
		<section className="results">
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
				<div className="results__stat">
					<span className="results__label">characters</span>
					<span className="results__value">
						{correct}/{incorrect}/{extra}
					</span>
				</div>
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
		</section>
	);
};

export default Results;
