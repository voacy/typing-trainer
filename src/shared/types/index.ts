export type LetterStatus = "correct" | "incorrect" | "idle" | "extra";

export type Mode = "words" | "time" | "quote";

export type TypingSettings = {
	mode: Mode;
	isPunctuation: boolean;
	isNumbers: boolean;
	count: number;
	language: string;
};

export type CursorPosition = {
	top: number;
	left: number;
};

export type Theme =
	| "dino"
	| "magic-girl"
	| "milkshake"
	| "sewing-tin-light"
	| "vesper-light"
	| "rose-pine-dawn"
	| "nord-light"
	| "solarized-light"
	| "tangerine"
	| "camping"
	| "paper"
	| "desert-oasis"
	| "iceberg-light"
	| "cheesecake"
	| "9009"
	| "lil-dragon"
	| "blueberry-light"
	| "gruvbox-light"
	| "godspeed"
	| "serika"
	| "shoko"
	| "beach"
	| "breeze"
	| "tiramisu"
	| "pastel"
	| "vaporwave-light"
	// mid
	| "taro"
	| "cafe"
	| "botanical"
	| "diner"
	| "comfy"
	| "trackday"
	| "muted"
	| "dusk"
	| "slate"
	| "copper"
	| "wheat"
	| "sage"
	| "mocha"
	| "serika-dark"
	| "nord"
	| "everforest"
	| "gruvbox"
	| "dracula"
	| "catppuccin"
	| "rose-pine"
	| "rose-pine-moon"
	| "kanagawa"
	| "tokyo-night"
	| "one-dark"
	| "discord"
	| "github"
	| "spotify"
	| "twitter"
	| "solarized"
	| "vscode"
	| "monokai"
	| "blueberry-dark"
	| "8008"
	| "watermelon"
	| "viridescent"
	| "horizon"
	| "moonlight"
	| "iceberg-dark"
	| "amber"
	| "sunset"
	| "volcano"
	| "blood-moon"
	| "cyberpunk"
	| "synthwave"
	| "outrun"
	| "vaporwave"
	| "tron"
	| "neon"
	| "hacker"
	| "gameboy"
	| "deep-purple"
	| "miami-nights"
	| "aurora"
	| "pitch-black"
	| "high-contrast";
