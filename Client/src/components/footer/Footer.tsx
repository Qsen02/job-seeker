import { useLanguage } from "../../store/language";
import styles from "./Footer.module.css"

export default function Footer() {
	const language = useLanguage((state) => state.language);

	return (
        <footer className={ styles.wrapper}>
			<p>
				&copy;{" "}
				{language === "bg"
					? "Всички права запазени 2026"
					: "All rights reserved 2026"}
			</p>
		</footer>
	);
}
