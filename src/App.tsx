import "./App.css";

function App() {
	return (
		<>
			<header className="header">
				<div className="container">
					<a href="/">speedkeys</a>
				</div>
			</header>

			<main className="main">
				<div className="container">
					<ul className="stats__list">
						<li className="stats__item">
							<span>WPM</span>
						</li>
						<li className="stats__item">
							<span>Accuracy</span>
						</li>
					</ul>

					<div className="text">
						<p>
							the quick brown fox jumps over the lazy dog and keeps
							moving through the silent night
						</p>
					</div>
				</div>
			</main>
		</>
	);
}

export default App;
