import "./AboutPage.scss";
import {
	GithubLogoIcon,
	KeyboardIcon,
	TimerIcon,
	QuotesIcon,
	ChartLineIcon,
	TargetIcon,
} from "@phosphor-icons/react";

const stack = [
	"React 19",
	"TypeScript",
	"Vite",
	"SCSS",
	"Recharts",
	"Radix UI",
	"use-sound",
	"Phosphor Icons",
];

const modes = [
	{
		icon: <KeyboardIcon size={16} weight="fill" />,
		key: "words",
		desc: "type a set number of words as fast as you can",
	},
	{
		icon: <TimerIcon size={16} weight="fill" />,
		key: "time",
		desc: "type as many words as possible within a time limit",
	},
	{
		icon: <QuotesIcon size={16} weight="fill" />,
		key: "quote",
		desc: "type a random quote from start to finish",
	},
];

const stats = [
	{
		icon: <ChartLineIcon size={16} weight="fill" />,
		key: "wpm",
		desc: "correctly typed characters divided by 5, normalised to 60 seconds",
	},
	{
		icon: <TargetIcon size={16} weight="fill" />,
		key: "accuracy",
		desc: "percentage of correctly pressed keys out of all keystrokes",
	},
];

const AboutPage = () => {
	return (
		<main className="about">
			<div className="container">
				<section className="about__section">
					<p className="about__label">// about</p>
					<h1 className="about__title">typezone</h1>
					<p className="about__desc">
						A minimalistic typing speed trainer inspired by Monkeytype. Test yourself in words, time,
						or quote mode — track your <span className="about__accent">wpm</span> and{" "}
						<span className="about__accent">accuracy</span> in real time.
					</p>
				</section>

				<section className="about__section">
					<p className="about__label">// modes</p>
					<div className="about__rows">
						{modes.map(({ icon, key, desc }) => (
							<div className="about__row" key={key}>
								<span className="about__key">
									{icon}
									{key}
								</span>
								<span className="about__row-desc">{desc}</span>
							</div>
						))}
					</div>
				</section>

				<section className="about__section">
					<p className="about__label">// stats</p>
					<div className="about__rows">
						{stats.map(({ icon, key, desc }) => (
							<div className="about__row" key={key}>
								<span className="about__key">
									{icon}
									{key}
								</span>
								<span className="about__row-desc">{desc}</span>
							</div>
						))}
					</div>
				</section>

				<section className="about__section">
					<p className="about__label">// stack</p>
					<div className="about__tags">
						{stack.map((tag) => (
							<span key={tag} className="about__tag">
								{tag}
							</span>
						))}
					</div>
				</section>

				<section className="about__section about__section--last">
					<p className="about__label">// source</p>
					<a
						className="about__github"
						href="https://github.com/voacy/speed-keys"
						target="_blank"
						rel="noreferrer"
					>
						<GithubLogoIcon size={16} weight="fill" />
						github.com/voacy/speed-keys
					</a>
				</section>
			</div>
		</main>
	);
};

export default AboutPage;
