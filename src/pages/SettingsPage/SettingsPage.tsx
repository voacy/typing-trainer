import "./SettingsPage.scss";
import { themes } from "../../features/theme/themes";
import { sounds } from "../../features/sounds/sounds";
import useTheme from "../../features/theme/useTheme";
import useGameSounds from "../../features/sounds/useSounds";
import {
	CaretDownIcon,
	SpeakerHighIcon,
	// SpeakerLowIcon,
	SpeakerXIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

const SettingsPage = () => {
	const { theme, changeTheme } = useTheme();
	const {
		changeCorrectSound,
		changeIncorrectSound,
		correctSound,
		incorrectSound,
		previewCorrect,
		previewIncorrect,
	} = useGameSounds();
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
						onClick={() => setOpenSections((prev) => ({ ...prev, sounds: !prev.sounds }))}
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
							{sounds.correct.map((e) => {
								return (
									<button
										className={`sounds__btn ${e.value === correctSound ? "sounds__btn--active" : ""}`}
										key={e.value}
										onClick={() => {
											previewCorrect(e.value);
											changeCorrectSound(e.value);
										}}
									>
										{e.value}
									</button>
								);
							})}
						</div>
						<h3 className="settings__subtitle">
							<SpeakerXIcon size={20} weight="fill" />
							play sound on error
						</h3>
						<div className="sounds__list sounds--incorrect">
							{sounds.incorrect.map((e) => {
								return (
									<button
										className={`sounds__btn ${e.value === incorrectSound ? "sounds__btn--active" : ""}`}
										key={e.value}
										onClick={() => {
											previewIncorrect(e.value);
											changeIncorrectSound(e.value);
										}}
									>
										{e.value}
									</button>
								);
							})}
						</div>
					</div>
				</section>
				<section className={`settings__section ${openSection.themes ? "hidden" : ""}`}>
					<h2
						className="settings__label"
						onClick={() => setOpenSections((prev) => ({ ...prev, themes: !prev.themes }))}
					>
						<CaretDownIcon className="settings__icon" size={40} weight="fill" />
						themes
					</h2>
					<div className="theme__list settings__list">
						{themes.map((e) => {
							return (
								<div
									key={e.value}
									onClick={() => changeTheme(e.value)}
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
							);
						})}
					</div>
				</section>
			</div>
		</main>
	);
};

export default SettingsPage;
