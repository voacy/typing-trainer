import type { Theme } from "../../shared/types";

export type ThemeOption = {
	value: Theme;
	label: string;
	bg: string;
	text: string;
	accent: string;
	textAdd: string;
};

export const themes: ThemeOption[] = [
	{
		value: "cherry-blossom",
		label: "cherry blossom",
		bg: "#323437",
		text: "#787d82",
		accent: "#d65ccc",
		textAdd: "#d1d0c5",
	},
	{
		value: "midnight-ocean",
		label: "midnight ocean",
		bg: "#1a1e2e",
		text: "#6b7a99",
		accent: "#4fc3f7",
		textAdd: "#c5cfe0",
	},
	{
		value: "forest-ink",
		label: "forest ink",
		bg: "#1a2420",
		text: "#6b8f71",
		accent: "#80cbc4",
		textAdd: "#c5d5c0",
	},
	{
		value: "ember",
		label: "ember",
		bg: "#1e1c1a",
		text: "#8a7a6a",
		accent: "#ff7043",
		textAdd: "#d5c9bc",
	},
	{
		value: "gold-rush",
		label: "gold rush",
		bg: "#1c1a14",
		text: "#8a7e5a",
		accent: "#ffd54f",
		textAdd: "#d5cdb0",
	},

	// new themes

	{
		value: "dracula",
		label: "dracula",
		bg: "#282a36",
		text: "#6272a4",
		accent: "#bd93f9",
		textAdd: "#f8f8f2",
	},
	{
		value: "nord",
		label: "nord",
		bg: "#2e3440",
		text: "#81a1c1",
		accent: "#88c0d0",
		textAdd: "#eceff4",
	},
	{
		value: "tokyo-night",
		label: "tokyo night",
		bg: "#1a1b26",
		text: "#565f89",
		accent: "#7aa2f7",
		textAdd: "#c0caf5",
	},
	{
		value: "catppuccin-mocha",
		label: "catppuccin mocha",
		bg: "#1e1e2e",
		text: "#6c7086",
		accent: "#f5c2e7",
		textAdd: "#cdd6f4",
	},
	{
		value: "gruvbox-dark",
		label: "gruvbox dark",
		bg: "#282828",
		text: "#928374",
		accent: "#fabd2f",
		textAdd: "#ebdbb2",
	},
	{
		value: "solarized-dark",
		label: "solarized dark",
		bg: "#002b36",
		text: "#586e75",
		accent: "#b58900",
		textAdd: "#93a1a1",
	},
	{
		value: "one-dark",
		label: "one dark",
		bg: "#282c34",
		text: "#5c6370",
		accent: "#61afef",
		textAdd: "#abb2bf",
	},
	{
		value: "rose-pine",
		label: "rose pine",
		bg: "#191724",
		text: "#6e6a86",
		accent: "#eb6f92",
		textAdd: "#e0def4",
	},
	{
		value: "matrix",
		label: "matrix",
		bg: "#0d0208",
		text: "#003b00",
		accent: "#00ff41",
		textAdd: "#ccffcc",
	},
	{
		value: "kanagawa",
		label: "kanagawa",
		bg: "#1f1f28",
		text: "#727169",
		accent: "#7e9cd8",
		textAdd: "#dcd7ba",
	},
	{
		value: "neon-city",
		label: "neon city",
		bg: "#0d0d1a",
		text: "#5a5a8a",
		accent: "#00e5ff",
		textAdd: "#b0b0d0",
	},
	{
		value: "coffee",
		label: "coffee",
		bg: "#1a1410",
		text: "#8a6a4a",
		accent: "#d4956a",
		textAdd: "#d0bca0",
	},
	{
		value: "slate",
		label: "slate",
		bg: "#161b22",
		text: "#5a6a7a",
		accent: "#79c0ff",
		textAdd: "#b0bec5",
	},
	{
		value: "crimson",
		label: "crimson",
		bg: "#1a1014",
		text: "#8a5a6a",
		accent: "#f47a7a",
		textAdd: "#d0b8bc",
	},
];
