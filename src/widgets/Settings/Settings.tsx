import { AtIcon, ClockIcon, TextAaIcon, QuotesIcon } from "@phosphor-icons/react";
import "./Settings.scss";

const Settings = () => {
	return (
		<div className="settings">
			<div className="settings__group">
				<button className="settings__btn">
					<AtIcon size={16} />
					punctuation
				</button>
			</div>

			<div className="settings__group">
				<button className="settings__btn">
					<ClockIcon size={16} />
					time
				</button>
				<button className="settings__btn">
					<TextAaIcon size={16} />
					words
				</button>
				<button className="settings__btn">
					<QuotesIcon size={16} />
					quote
				</button>
			</div>

			<div className="settings__group">
				<button className="settings__btn">15</button>
				<button className="settings__btn">30</button>
				<button className="settings__btn">60</button>
			</div>
		</div>
	);
};

export default Settings;
