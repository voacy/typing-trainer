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
					speed<span>keys</span>
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
