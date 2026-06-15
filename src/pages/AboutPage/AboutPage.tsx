import "./AboutPage.scss";
import { useEffect, useState } from "react";
import {
	GithubLogoIcon,
	KeyboardIcon,
	TimerIcon,
	QuotesIcon,
	ChartLineIcon,
	TargetIcon,
	CaretDownIcon,
} from "@phosphor-icons/react";
import useSound from "../../features/sounds/useSounds";

const stack = [
	"React 19",
	"TypeScript",
	"Vite",
	"SCSS",
	"Recharts",
	"Radix UI",
	"Howler",
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
	useEffect(() => {
		document.title = "Typezone | About";
	}, []);

	const { playClick } = useSound();

	const [openSection, setOpenSection] = useState({
		modes: true,
		stats: true,
		stack: true,
		source: true,
	});

	const toggle = (key: keyof typeof openSection) => {
		playClick();
		setOpenSection((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	return (
		<main className="about">
			<div className="container">
				<section className="about__section">
					<h1 className="about__title">about</h1>
					<p className="about__desc">
						A minimalistic typing speed trainer inspired by Monkeytype. Test yourself in words,
						time, or quote mode — track your wpm and accuracy in real time.
					</p>
				</section>

				<section className={`about__section ${!openSection.modes ? "hidden" : ""}`}>
					<h2 className="about__label" onClick={() => toggle("modes")}>
						<CaretDownIcon className="about__icon" size={40} weight="fill" />
						modes
					</h2>
					<div className="about__rows about__collapsible">
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

				<section className={`about__section ${!openSection.stats ? "hidden" : ""}`}>
					<h2 className="about__label" onClick={() => toggle("stats")}>
						<CaretDownIcon className="about__icon" size={40} weight="fill" />
						stats
					</h2>
					<div className="about__rows about__collapsible">
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

				<section className={`about__section ${!openSection.stack ? "hidden" : ""}`}>
					<h2 className="about__label" onClick={() => toggle("stack")}>
						<CaretDownIcon className="about__icon" size={40} weight="fill" />
						stack
					</h2>
					<div className="about__tags about__collapsible">
						{stack.map((tag) => (
							<span key={tag} className="about__tag">
								{tag}
							</span>
						))}
					</div>
				</section>

				<section
					className={`about__section about__section--last ${!openSection.source ? "hidden" : ""}`}
				>
					<h2 className="about__label" onClick={() => toggle("source")}>
						<CaretDownIcon className="about__icon" size={40} weight="fill" />
						source
					</h2>
					<a
						className="about__github about__collapsible"
						href="https://github.com/voacy/typing-trainer"
						onClick={() => playClick()}
					>
						<GithubLogoIcon size={16} weight="fill" />
						github.com/voacy/typing-trainer
					</a>
				</section>
			</div>
		</main>
	);
};

export default AboutPage;
