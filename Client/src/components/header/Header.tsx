import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../store/user";
import { useLanguage } from "../../store/language";
import { Activity } from "react";
import {
	adminNavBG,
	adminNavEN,
	guestNavBG,
	guestNavEN,
	userNavBG,
	userNavEN,
} from "../../data/items";
import LinkItem from "./link_item/LinkItem";
import styles from "./Header.module.css"

export default function Header() {
	const user = useUser((state) => state.user);
	const language = useLanguage((state) => state.language);
    const changeLanguage = useLanguage((state) => state.toggleLanguage);
    const navigate = useNavigate();

	return (
		<header className={styles.wrapper}>
			<nav className={styles.navigation}>
                <Link to="/" id={ styles.logo}>Job Seeker</Link>
				<ul>
					<Activity mode={user === null ? "visible" : "hidden"}>
						{language === "bg"
							? guestNavBG.map((el) => (
									<LinkItem
										key={el.label}
										label={el.label}
										href={el.href}
									/>
								))
							: guestNavEN.map((el) => (
									<LinkItem
										key={el.label}
										label={el.label}
										href={el.href}
									/>
								))}
					</Activity>
					<Activity
						mode={user?.role === "user" ? "visible" : "hidden"}
					>
						{language === "bg"
							? userNavBG.map((el) => (
									<LinkItem
										key={el.label}
										label={el.label}
										href={el.href}
									/>
								))
							: userNavEN.map((el) => (
									<LinkItem
										key={el.label}
										label={el.label}
										href={el.href}
									/>
								))}
					</Activity>
					<Activity
						mode={user?.role === "admin" ? "visible" : "hidden"}
					>
						{language === "bg"
							? adminNavBG.map((el) => (
									<LinkItem
										key={el.label}
										label={el.label}
										href={el.href}
									/>
								))
							: adminNavEN.map((el) => (
									<LinkItem
										key={el.label}
										label={el.label}
										href={el.href}
									/>
								))}
					</Activity>
					<li>
						<Activity mode={user === null ? "visible" : "hidden"}>
							<button onClick={() => navigate("/login")}>
								{language === "bg" ? "Вход" : "Login"}
							</button>
						</Activity>
						<Activity mode={user !== null ? "visible" : "hidden"}>
							<button onClick={() => navigate("/logout")}>
								{language === "bg" ? "Изход" : "Logout"}
							</button>
						</Activity>
					</li>
					<li>
						<button onClick={() => changeLanguage({ language })}>
							{language === "bg" ? "BG" : "EN"}
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
}
