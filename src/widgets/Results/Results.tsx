import "./Results.scss";

type Props = {
	finalWpm: number;
	acc: number;
};

const Results = ({ finalWpm, acc }: Props) => {
	return (
		<section className="results">
			<h2 className="results__title">Results</h2>
			<div className="results__stats">
				<div className="results__stat">
					<span className="results__label">wpm</span>
					<span className="results__value">{finalWpm.toFixed(0)}</span>
				</div>
				<div className="results__stat">
					<span className="results__label">cpm</span>
					<span className="results__value">{(finalWpm * 5).toFixed(0)}</span>
				</div>
				<div className="results__stat">
					<span className="results__label">cps</span>
					<span className="results__value">{((finalWpm * 5) / 60).toFixed(1)}</span>
				</div>
				<div className="results__stat">
					<span className="results__label">acc</span>
					<span className="results__value">{acc.toFixed(0)}%</span>
				</div>
			</div>
		</section>
	);
};

export default Results;
