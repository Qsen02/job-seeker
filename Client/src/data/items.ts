import { label } from "framer-motion/client";

export const guestNavBG = [
	{ label: "Обяви", href: "/" },
	{ label: "Регистрация", href: "/register" },
];

export const guestNavEN = [
	{ label: "Jobs", href: "/" },
	{ label: "Register", href: "/register" },
];

export const userNavBG = [
	{ label: "Обяви", href: "/" },
	{ label: "Профил", href: "/profile" },
];

export const userNavEN = [
	{ label: "Jobs", href: "/" },
	{ label: "Profile", href: "/profile" },
];

export const adminNavBG = [
    { label: "Обяви", href: "/" },
    { label: "Регистрирай фирма", href: "/company-register" },
    { label: "Профил", href: "/profile" },
];

export const adminNavEN = [
	{ label: "Jobs", href: "/" },
	{ label: "Register company", href: "/company-register" },
	{ label: "Profile", href: "/profile" },
];

export const jobTypes = [
	{
		value: "remote",
		labelBG: "Онлайн",
		labelEN: "Remote",
	},
	{
		value: "on-site",
		labelBG: "На място",
		labelEN: "On site",
	},
	{
		value: "hybrid",
		labelBG: "Хибрид",
		labelEN: "Hybrid",
	},
];

export const jobLevels = [
	{
		value: "junior",
		label: "Junior",
	},
	{
		value: "mid",
		label: "Mid",
	},
	{
		value: "senior",
		label: "Senior",
	},
];