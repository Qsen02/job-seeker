import { NavLink } from "react-router-dom";

interface LinkItemProps {
	href: string;
	label: string;
	openHandler?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LinkItem({ label, href, openHandler }: LinkItemProps) {
	function close() { 
		if (openHandler) { 
			openHandler(false);
		}
	}

	return (
		<li>
			<NavLink
				to={href}
				style={({ isActive }) =>
					isActive ? { color: "rgb(26, 168, 228)" } : {}
				}
				onClick={close}
			>
				{label}
			</NavLink>
		</li>
	);
}
