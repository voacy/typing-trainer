import "./SettingsPage.scss";
import { useEffect, useState } from "react";
import { themes } from "../../features/theme/themes";
import { sounds } from "../../features/sounds/sounds";
import useTheme from "../../features/theme/useTheme";
import useSound from "../../features/sounds/useSounds";
import {
	CaretDownIcon,
	SpeakerHighIcon,
	SpeakerLowIcon,
	SpeakerXIcon,
} from "@phosphor-icons/react";

const SettingsPage = () => {
	useEffect(() => {
		document.title = "Typezone | Settings";
	}, []);

	const { theme, changeTheme } = useTheme();
	const {
		selectCorrectSound,
		selectIncorrectSound,
		correctSound,
		incorrectSound,
		volume,
		changeVolume,
		playClick,
	} = useSound();
	const [openSection, setOpenSections] = useState({
		themes: false,
		sounds: false,
	});

	return (
		<main className="settings">
			<div className="container">
				<section className="settings__section">
					<h1 className="settings__title">settings</h1>
					<p className="settings__desc">
						Note: All current settings are stored in your browser's local storage and are not
						uploaded to any server. If you clear your browser data or use a different browser or
						device, your saved settings will be lost
					</p>
				</section>
				<section className={`settings__section ${openSection.sounds ? "hidden" : ""}`}>
					<h2
						className="settings__label"
						onClick={() => {
							playClick();
							setOpenSections((prev) => ({ ...prev, sounds: !prev.sounds }));
						}}
					>
						<CaretDownIcon className="settings__icon" size={40} weight="fill" />
						sounds
					</h2>
					<div className="sounds__wrapper">
						<h3 className="settings__subtitle">
							<SpeakerHighIcon size={20} weight="fill" />
							play sound on click
						</h3>
						<div className="sounds__list sounds--correct">
							{sounds.correct.map((e) => (
								<button
									className={`sounds__btn ${e.value === correctSound ? "sounds__btn--active" : ""}`}
									key={e.value}
									onClick={() => selectCorrectSound(e.value)}
								>
									{e.value}
								</button>
							))}
						</div>

						<h3 className="settings__subtitle">
							<SpeakerXIcon size={20} weight="fill" />
							play sound on error
						</h3>
						<div className="sounds__list sounds--incorrect">
							{sounds.incorrect.map((e) => (
								<button
									className={`sounds__btn ${e.value === incorrectSound ? "sounds__btn--active" : ""}`}
									key={e.value}
									onClick={() => selectIncorrectSound(e.value)}
								>
									{e.value}
								</button>
							))}
						</div>
						<h3 className="settings__subtitle">
							<SpeakerLowIcon size={20} weight="fill" />
							volume
						</h3>
						<div className="volume__row">
							<input
								className="volume__slider"
								type="range"
								min={0}
								max={1}
								step={0.01}
								value={volume}
								style={{ "--volume-fill": `${volume * 100}%` } as React.CSSProperties}
								onChange={(e) => changeVolume(parseFloat(e.target.value))}
							/>
							<span className="volume__value">{Math.round(volume * 100)}%</span>
						</div>
					</div>
				</section>
				<section className={`settings__section ${openSection.themes ? "hidden" : ""}`}>
					<h2
						className="settings__label"
						onClick={() => {
							playClick();
							setOpenSections((prev) => ({ ...prev, themes: !prev.themes }));
						}}
					>
						<CaretDownIcon className="settings__icon" size={40} weight="fill" />
						themes
					</h2>
					<div className="theme__list settings__list">
						{themes.map((e) => (
							<div
								key={e.value}
								onClick={() => {
									playClick();
									changeTheme(e.value);
								}}
								className={`theme__btn ${e.value === theme ? "theme__btn--active" : ""}`}
								style={{ backgroundColor: e.bg }}
							>
								<span className="theme__name" style={{ color: e.accent }}>
									{e.value}
								</span>
								<div className="theme__dots">
									<span className="theme__dot" style={{ backgroundColor: e.accent }}></span>
									<span className="theme__dot" style={{ backgroundColor: e.text }}></span>
									<span className="theme__dot" style={{ backgroundColor: e.textAdd }}></span>
								</div>
							</div>
						))}
					</div>
				</section>
			</div>
		</main>
	);
};

export default SettingsPage;
