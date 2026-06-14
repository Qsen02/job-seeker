import { NavLink } from "react-router-dom";

interface LinkItemProps {
	href: string;
	label: string;
}

export default function LinkItem({ label, href }: LinkItemProps) {
	return (
		<li>
			<NavLink
				to={href}
				style={({ isActive }) =>
					isActive ? { color: "rgb(26, 168, 228)" } : {}
				}
			>
				{label}
			</NavLink>
		</li>
	);
}
