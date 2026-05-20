import "./SettingsPage.scss";
import { themes } from "../../features/theme/themes";
import useTheme from "../../features/theme/useTheme";
import { CaretDownIcon } from "@phosphor-icons/react";
import { useState } from "react";

const SettingsPage = () => {
	const { theme, changeTheme } = useTheme();
	const [openSection, setOpenSections] = useState({
		themes: false,
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
				<section className={`settings__section ${openSection.themes ? "hidden" : ""}`}>
					<p
						className="settings__label"
						onClick={() => setOpenSections({ themes: !openSection.themes })}
					>
						<CaretDownIcon className="settings__icon" size={20} weight="fill" />
						themes
					</p>
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
