import {
	AtIcon,
	HourglassHighIcon,
	TextAaIcon,
	QuotesIcon,
	HashIcon,
	GlobeHemisphereWestIcon,
	SlidersHorizontalIcon,
} from "@phosphor-icons/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import "./Toolbar.scss";

import type { TypingSettings } from "../../shared/types";
import useSound from "../../features/sounds/useSounds";
import { LANGUAGES } from "../../shared/lib/languages";
import { useState, useEffect, useRef } from "react";

type Props = {
	settings: TypingSettings;
	setSettings: (settings: TypingSettings) => void;
	onReset: (newSettings?: TypingSettings) => void;
};

const Toolbar = (props: Props) => {
	const { playClick } = useSound();
	const { settings, setSettings, onReset } = props;
	const [isOpen, setIsOpen] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleSettingsChange = (newSettings: TypingSettings) => {
		playClick();
		setSettings(newSettings);
		onReset(newSettings);
	};

	return (
		<div className="toolbar-wrapper" ref={wrapperRef}>
			<button
				className="toolbar__toggle"
				onClick={() => setIsOpen((v) => !v)}
			>
				<SlidersHorizontalIcon size={18} />
				settings
			</button>

			<div
				className={`toolbar ${isOpen ? "toolbar--open" : ""}`}
				onMouseDown={(e) => e.preventDefault()}
			>
				<div
					className={`toolbar__group ${settings.mode === "quote" ? "toolbar__group--disabled" : ""}`}
					data-label="options"
				>
					<button
						className={`toolbar__btn ${settings.isPunctuation ? "toolbar__btn--active" : ""}`}
						onClick={() => handleSettingsChange({ ...settings, isPunctuation: !settings.isPunctuation })}
					>
						<AtIcon size={16} />
						punctuation
					</button>
					<button
						className={`toolbar__btn ${settings.isNumbers ? "toolbar__btn--active" : ""}`}
						onClick={() => handleSettingsChange({ ...settings, isNumbers: !settings.isNumbers })}
					>
						<HashIcon size={16} />
						numbers
					</button>
				</div>

				<div className="toolbar__group" data-label="mode">
					<button
						className={`toolbar__btn ${settings.mode === "time" ? "toolbar__btn--active" : ""}`}
						onClick={() => handleSettingsChange({ ...settings, mode: "time" })}
					>
						<HourglassHighIcon size={16} weight="fill" />
						time
					</button>
					<button
						className={`toolbar__btn ${settings.mode === "words" ? "toolbar__btn--active" : ""}`}
						onClick={() => handleSettingsChange({ ...settings, mode: "words" })}
					>
						<TextAaIcon size={16} />
						words
					</button>
					<button
						className={`toolbar__btn ${settings.mode === "quote" ? "toolbar__btn--active" : ""}`}
						onClick={() => handleSettingsChange({ ...settings, mode: "quote" })}
					>
						<QuotesIcon size={16} weight="fill" />
						quote
					</button>
				</div>

				<div
					className={`toolbar__group ${settings.mode === "quote" ? "toolbar__group--disabled" : ""}`}
					data-label="count"
				>
					<button
						className={`toolbar__btn ${settings.count === 10 ? "toolbar__btn--active" : ""}`}
						onClick={() => handleSettingsChange({ ...settings, count: 10 })}
					>
						10
					</button>
					<button
						className={`toolbar__btn ${settings.count === 30 ? "toolbar__btn--active" : ""}`}
						onClick={() => handleSettingsChange({ ...settings, count: 30 })}
					>
						30
					</button>
					<button
						className={`toolbar__btn ${settings.count === 60 ? "toolbar__btn--active" : ""}`}
						onClick={() => handleSettingsChange({ ...settings, count: 60 })}
					>
						60
					</button>
					<button
						className={`toolbar__btn ${settings.count === 120 ? "toolbar__btn--active" : ""}`}
						onClick={() => handleSettingsChange({ ...settings, count: 120 })}
					>
						120
					</button>
				</div>

				<div className="toolbar__group" data-label="language">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger
							className={`toolbar__btn toolbar__btn--desktop-only ${settings.language !== "english" ? "toolbar__btn--active" : ""}`}
							onPointerDown={() => playClick()}
						>
							<GlobeHemisphereWestIcon size={16} weight="fill" />
							{settings.language}
						</DropdownMenu.Trigger>
						<DropdownMenu.Portal>
							<DropdownMenu.Content className="language-dropdown" align="center" side="bottom">
								{LANGUAGES.map((lang) => (
									<DropdownMenu.Item
										key={lang.code}
										className={`language-item ${settings.language === lang.code ? "language-item--active" : ""}`}
										onClick={() => handleSettingsChange({ ...settings, language: lang.code })}
									>
										{lang.label}
									</DropdownMenu.Item>
								))}
							</DropdownMenu.Content>
						</DropdownMenu.Portal>
					</DropdownMenu.Root>
					{LANGUAGES.map((lang) => (
						<button
							key={lang.code}
							className={`toolbar__btn toolbar__btn--mobile-only ${settings.language === lang.code ? "toolbar__btn--active" : ""}`}
							onClick={() => handleSettingsChange({ ...settings, language: lang.code })}
						>
							{lang.label}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default Toolbar;
