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
];
