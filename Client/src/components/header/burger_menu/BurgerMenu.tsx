import { Link, useNavigate } from "react-router-dom";
import SlidingAnimation from "../../../commons/sliding_animation/SlidingAnimation";
import type { UserAttributes } from "../../../types/users";
import styles from "./BurgerMenu.module.css";
import { Activity } from "react";
import LinkItem from "../link_item/LinkItem";
import {
	adminNavBG,
	adminNavEN,
	guestNavBG,
	guestNavEN,
	userNavBG,
	userNavEN,
} from "../../../data/items";

interface BurgerMenuProps {
	userState: UserAttributes | null;
	setOpenHandler: React.Dispatch<React.SetStateAction<boolean>>;
	language: "bg" | "en";
}

export default function BurgerMenu({
	userState,
	setOpenHandler,
	language,
}: BurgerMenuProps) {
    const navigate = useNavigate();

	return (
		<div className="modal">
			<SlidingAnimation className={styles.wrapper}>
				<section className={styles.header}>
					<i
                        className="fa-solid fa-xmark"
                        onClick={() => setOpenHandler(false)}
					></i>
                    <Link to="/" id={ styles.logo}>Job Seeker</Link>
				</section>
				<section className={styles.body}>
					<ul>
						<Activity
							mode={userState === null ? "visible" : "hidden"}
						>
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
							mode={
								userState?.role === "user"
									? "visible"
									: "hidden"
							}
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
							mode={
								userState?.role === "admin"
									? "visible"
									: "hidden"
							}
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
							<Activity
								mode={userState === null ? "visible" : "hidden"}
							>
								<button onClick={() => navigate("/login")}>
									{language === "bg" ? "Вход" : "Login"}
								</button>
							</Activity>
							<Activity
								mode={userState !== null ? "visible" : "hidden"}
							>
								<button onClick={() => navigate("/logout")}>
									{language === "bg" ? "Изход" : "Logout"}
								</button>
							</Activity>
						</li>
					</ul>
				</section>
			</SlidingAnimation>
		</div>
	);
}
