import {
	AtIcon,
	ClockIcon,
	TextAaIcon,
	QuotesIcon,
	GlobeHemisphereWestIcon,
	HashStraightIcon,
} from "@phosphor-icons/react";
import "./Settings.scss";

type Settings = {
	mode: string;
	isPunctuation: boolean;
	isNumbers: boolean;
	count: number;
	language: string;
};

type Props = {
	settings: Settings;
	setSettings: (settings: Settings) => void;
	onReset: (count?: number) => void;
};

const Settings = (props: Props) => {
	const { settings, setSettings, onReset } = props;

	const handleSettingsChange = (newSettings: Settings) => {
		setSettings(newSettings);
		onReset(newSettings.count);
	};

	return (
		<div className="settings" onMouseDown={(e) => e.preventDefault()}>
			<div className="settings__group">
				<button
					className={`settings__btn ${settings.isPunctuation ? "settings__btn--active" : ""}`}
					onClick={() =>
						handleSettingsChange({ ...settings, isPunctuation: !settings.isPunctuation })
					}
				>
					<AtIcon size={16} />
					punctuation
				</button>
				<button
					className={`settings__btn ${settings.isNumbers ? "settings__btn--active" : ""}`}
					onClick={() => handleSettingsChange({ ...settings, isNumbers: !settings.isNumbers })}
				>
					<HashStraightIcon size={16} />
					numbers
				</button>
			</div>

			<div className="settings__group">
				<button
					className={`settings__btn ${settings.mode === "time" ? "settings__btn--active" : ""}`}
					onClick={() => handleSettingsChange({ ...settings, mode: "time" })}
				>
					<ClockIcon size={16} />
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
					<QuotesIcon size={16} />
					quote
				</button>
			</div>

			<div className="settings__group">
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
					onClick={() => handleSettingsChange({ ...settings, language: "english" })}
				>
					<GlobeHemisphereWestIcon size={16} />
				</button>
			</div>
		</div>
	);
};

export default Settings;
