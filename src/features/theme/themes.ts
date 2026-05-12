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
		value: "solarized-dark",
		label: "solarized dark",
		bg: "#002b36",
		text: "#586e75",
		accent: "#b58900",
		textAdd: "#93a1a1",
	},
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
		text: "#616e88",
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
		value: "rose-pine",
		label: "rose pine",
		bg: "#191724",
		text: "#6e6a86",
		accent: "#eb6f92",
		textAdd: "#e0def4",
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
		value: "kanagawa",
		label: "kanagawa",
		bg: "#1f1f28",
		text: "#727169",
		accent: "#7e9cd8",
		textAdd: "#dcd7ba",
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
		value: "one-dark",
		label: "one dark",
		bg: "#282c34",
		text: "#5c6370",
		accent: "#61afef",
		textAdd: "#abb2bf",
	},
	{
		value: "everforest",
		label: "everforest",
		bg: "#2d353b",
		text: "#7a8478",
		accent: "#a7c080",
		textAdd: "#d3c6aa",
	},
	{
		value: "dusk",
		label: "dusk",
		bg: "#3b4252",
		text: "#7b8fa8",
		accent: "#81a1c1",
		textAdd: "#d8dee9",
	},
	{
		value: "steel-blue",
		label: "steel blue",
		bg: "#354a5e",
		text: "#6a8aaa",
		accent: "#5dade2",
		textAdd: "#c8dcea",
	},
	{
		value: "muted-grape",
		label: "muted grape",
		bg: "#3d3650",
		text: "#7a6e90",
		accent: "#b39ddb",
		textAdd: "#d5cfe8",
	},
	{
		value: "sandstone",
		label: "sandstone",
		bg: "#4a4035",
		text: "#8a7a65",
		accent: "#d4a96a",
		textAdd: "#e0d5c4",
	},
	{
		value: "arctic",
		label: "arctic",
		bg: "#3a4a52",
		text: "#7a9aaa",
		accent: "#80deea",
		textAdd: "#cce8ee",
	},
	{
		value: "slate-mist",
		label: "slate mist",
		bg: "#4a5b6e",
		text: "#8aa0b4",
		accent: "#90caf9",
		textAdd: "#dce8f5",
	},
	{
		value: "warm-gray",
		label: "warm gray",
		bg: "#4a4540",
		text: "#8a8078",
		accent: "#c8a882",
		textAdd: "#e0d8ce",
	},
	{
		value: "dusty-rose",
		label: "dusty rose",
		bg: "#4a3d44",
		text: "#9a7a88",
		accent: "#e8a0b0",
		textAdd: "#ecd8dc",
	},
];
