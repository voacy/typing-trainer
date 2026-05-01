import {
	AtIcon,
	ClockIcon,
	TextAaIcon,
	QuotesIcon,
	GlobeHemisphereWestIcon,
} from "@phosphor-icons/react";
import "./Settings.scss";

import type { TypingSettings } from "../../shared/types";
import useGameSounds from "../../features/sounds/useSounds";

type Props = {
	settings: TypingSettings;
	setSettings: (settings: TypingSettings) => void;
	onReset: (newSettings?: TypingSettings) => void;
};

const Settings = (props: Props) => {
	const { playClick } = useGameSounds();
	const { settings, setSettings, onReset } = props;

	const handleSettingsChange = (newSettings: TypingSettings) => {
		playClick();
		setSettings(newSettings);
		onReset(newSettings);
	};

	return (
		<div className="settings" onMouseDown={(e) => e.preventDefault()}>
			<div
				className={`settings__group ${settings.mode === "quote" ? "settings__group--disabled" : ""}`}
			>
				<button
					className={`settings__btn ${settings.isPunctuation ? "settings__btn--active" : ""}`}
					onClick={() =>
						handleSettingsChange({
							...settings,
							isPunctuation: !settings.isPunctuation,
						})
					}
				>
					<AtIcon size={16} />
					punctuation
				</button>
			</div>

			<div className="settings__group">
				<button
					className={`settings__btn ${settings.mode === "time" ? "settings__btn--active" : ""}`}
					onClick={() => handleSettingsChange({ ...settings, mode: "time" })}
				>
					<ClockIcon size={16} weight="fill" />
					time
				</button>

				<button
					className={`settings__btn ${settings.mode === "words" ? "settings__btn--active" : ""}`}
					onClick={() => handleSettingsChange({ ...settings, mode: "words" })}
				>
					<TextAaIcon size={16} />
					words
				</button>

				<button
					className={`settings__btn ${settings.mode === "quote" ? "settings__btn--active" : ""}`}
					onClick={() => handleSettingsChange({ ...settings, mode: "quote" })}
				>
					<QuotesIcon size={16} weight="fill" />
					quote
				</button>
			</div>

			<div
				className={`settings__group ${settings.mode === "quote" ? "settings__group--disabled" : ""}`}
			>
				<button
					className={`settings__btn ${settings.count === 10 ? "settings__btn--active" : ""}`}
					onClick={() => handleSettingsChange({ ...settings, count: 10 })}
				>
					10
				</button>

				<button
					className={`settings__btn ${settings.count === 30 ? "settings__btn--active" : ""}`}
					onClick={() => handleSettingsChange({ ...settings, count: 30 })}
				>
					30
				</button>

				<button
					className={`settings__btn ${settings.count === 60 ? "settings__btn--active" : ""}`}
					onClick={() => handleSettingsChange({ ...settings, count: 60 })}
				>
					60
				</button>
			</div>

			<div className="settings__group">
				<button
					className={`settings__btn ${settings.language === "english" ? "settings__btn--active" : ""}`}
					onClick={() =>
						handleSettingsChange({
							...settings,
							language: "english",
						})
					}
				>
					<GlobeHemisphereWestIcon size={16} weight="fill" />
				</button>
			</div>
		</div>
	);
};

export default Settings;
