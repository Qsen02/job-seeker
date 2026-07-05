import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../store/language";
import styles from "../error_message/ErrorMessage.module.css";
import { useHideScroller } from "../../hooks/useLoadingError";

export default function ErrorBoundaryMessage() {
	const language = useLanguage((state) => state.language);
	useHideScroller();

	return (
		<div className="loader-modal">
			<p className={styles.message}>
				{language === "bg"
					? "Възникна грешка, моля върнете се на началната страница или опитайте пак по късно."
					: "Error occurd, please come back to the home page or try again later."}
			</p>
			<a href="/" className={styles.link}>
				{language === "bg" ? "Начало" : "Home"}
			</a>
		</div>
	);
}
