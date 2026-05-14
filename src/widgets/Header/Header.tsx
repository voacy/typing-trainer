import "./Header.scss";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import useTheme from "../../features/theme/useTheme";
import { themes } from "../../features/theme/themes";
import { PaletteIcon, GithubLogoIcon } from "@phosphor-icons/react";
import useGameSounds from "../../features/sounds/useSounds";

const Header = () => {
	const { playClick } = useGameSounds();
	const { theme, changeTheme } = useTheme();
	const current = themes.find((t) => t.value === theme)!;

	return (
		<header className="header">
			<div className="container">
				<a href="/" className="logo" onClick={() => playClick()}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="42"
						height="42"
						viewBox="0 0 16 16"
						fill="var(--color-accent)"
					>
						<path d="M14 5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM2 4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
						<path d="M13 10.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm0-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm-5 0A.25.25 0 0 1 8.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 8 8.75zm2 0a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25zm1 2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm-5-2A.25.25 0 0 1 6.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 6 8.75zm-2 0A.25.25 0 0 1 4.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 4 8.75zm-2 0A.25.25 0 0 1 2.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 2 8.75zm11-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm-2 0a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm-2 0A.25.25 0 0 1 9.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 9 6.75zm-2 0A.25.25 0 0 1 7.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 7 6.75zm-2 0A.25.25 0 0 1 5.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 5 6.75zm-3 0A.25.25 0 0 1 2.25 6h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5A.25.25 0 0 1 2 6.75zm0 4a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm2 0a.25.25 0 0 1 .25-.25h5.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-5.5a.25.25 0 0 1-.25-.25z" />
					</svg>
					typezone
				</a>
				<div className="header__right">
					<a
						className="header__link"
						href="https://github.com/voacy/speed-keys"
						onClick={() => playClick()}
					>
						<GithubLogoIcon size={20} weight="fill" fill={current.accent} />
					</a>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger className="theme-trigger" onPointerDown={() => playClick()}>
							<PaletteIcon size={20} weight="fill" fill={current.accent} />
							{current.label}
						</DropdownMenu.Trigger>
						<DropdownMenu.Portal>
							<DropdownMenu.Content className="theme-dropdown" align="end">
								{themes.map((t) => (
									<DropdownMenu.Item
										key={t.value}
										className={`theme-item ${theme === t.value ? "theme-item--active" : ""}`}
										onClick={() => {
											playClick();
											changeTheme(t.value);
										}}
									>
										<span>{t.label}</span>
										<div className="theme-dots" style={{ backgroundColor: t.bg }}>
											<span className="theme-dot" style={{ backgroundColor: t.text }} />
											<span className="theme-dot" style={{ backgroundColor: t.accent }} />
											<span className="theme-dot" style={{ backgroundColor: t.textAdd }} />
										</div>
									</DropdownMenu.Item>
								))}
							</DropdownMenu.Content>
						</DropdownMenu.Portal>
					</DropdownMenu.Root>
				</div>
			</div>
		</header>
	);
};

export default Header;
